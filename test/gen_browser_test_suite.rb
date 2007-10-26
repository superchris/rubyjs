require 'tempfile'
require 'test/gen_test_suite'

def ruby2js(rubycode_path)
  jscode = `./rubyjs_gen -I./test --opt PrettyPrint -P Browser -m TestSuite #{rubycode_path}`
  jscode << %{
var STDOUT = [];

function flush()
{
  document.getElementById('out').innerHTML = 
    STDOUT.join('\\n').replace(/[&]/g, "&amp;").replace(/[<]/g, "&lt;").replace(/[>]/g, "&gt;").replace(/\\n/g, "<br/>");
}

function start()
{
  main(); flush();
  compare();
}

function compare()
{
  var out = document.getElementById('out');
  var expected = document.getElementById('expected');
  if (out.innerHTML == expected.innerHTML)
  {
    out.style.background = "green";
  }
  else
  {
    out.style.background = "red";
  }
}
}

  return jscode
end

if ARGV.empty?
  tests = Dir['test/test_*.rb']
else
  tests = Dir["test/test_{" + ARGV.join(',') + "}.rb"] 
end

rubycode = Tempfile.new('rubyjs')
script = gen_test_suite(tests)
rubycode.write(script)
rubycode.close(false)

jscode = ruby2js(rubycode.path)
File.open('test/browser.test.js', 'w+') {|f| f << jscode}

html_script = script.gsub("&", "&amp;").
  gsub("<", "&lt;").
  gsub(">", "&gt;").gsub("\n", "<br/>")

expected = `ruby -I./test < #{rubycode.path}`.chomp.  # remove last newline
  gsub("&", "&amp;").
  gsub("<", "&lt;").
  gsub(">", "&gt;").gsub("\n", "<br/>")

File.open('test/browser.test.html', 'w+') do |f|
f.puts %{<html><head><script language="javascript" src="browser.test.js"></script>
<style>
  #expected { background: #ccc; }
</style>
<body onload="start();">
  <a href="#source">View Ruby source code</a>&nbsp;|&nbsp;
  <a href="browser.test.js">View Javascript source code</a><br/>
  <table cellspacing="5" cellpadding="5">
  <thead>
    <tr>
      <td width="50%"><b>Output</b></td>
      <td width="50%"><b>Expected</b></td>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td valign="top" width="50%">
      <pre id="out"></pre>
    </td>
    <td valign="top" width="50%">
      <pre id="expected">#{expected}</pre>
    </td>
  </tr>
  </tbody>
  </table>
  <pre id="source">#{html_script}</pre>
</body></html>}
end
