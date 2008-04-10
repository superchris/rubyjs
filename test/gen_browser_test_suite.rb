require 'tempfile'
require 'test/gen_test_suite'

if ARGV.empty?
  tests = Dir['test/test_*.rb']
else
  tests = Dir["test/test_{" + ARGV.join(',') + "}.rb"] 
end

rubycode = Tempfile.new('rubyjs')
script = gen_test_suite(tests)
rubycode.write(script)
rubycode.close(false)

#
# Generate Javascript code
#

RED = '#ff8888' 
GREEN = '#aaffaa'

expected = `ruby -I./test < #{rubycode.path}`.chomp.  # remove last newline
  gsub("&", "&amp;").
  gsub("<", "&lt;").
  gsub(">", "&gt;").split("\n")

jscode = `./bin/rubyjs -I./test --opt PrettyPrint -P Browser -m TestSuite #{rubycode.path}`
jscode << <<END_JS
var STDOUT_LINE_NO = 0;
var FAILURES = 0; 
var TOTAL = #{expected.size};

function STDOUT_puts(str)
{
  var out = document.getElementById('out_' + STDOUT_LINE_NO);
  var expected = document.getElementById('exp_' + STDOUT_LINE_NO);

  out.innerHTML = str.replace(/[&]/g, "&amp;").replace(/[<]/g, "&lt;").replace(/[>]/g, "&gt;");

  if (out.innerHTML === expected.innerHTML)
  {
    document.getElementById('line_' + STDOUT_LINE_NO).style.background = '#{GREEN}';
  }
  else
  {
    FAILURES += 1;
  }

  STDOUT_LINE_NO += 1;

  document.getElementById('status').innerHTML = 
  "<b>" + STDOUT_LINE_NO + "</b> / " + TOTAL + " (" + FAILURES + " failures)";
}

function start()
{
  main();
}
END_JS

File.open('test/browser.test.js', 'w+') {|f| f << jscode}

html_script = script.gsub("&", "&amp;").
  gsub("<", "&lt;").
  gsub(">", "&gt;").gsub("\n", "<br/>")

File.open('test/browser.test.html', 'w+') do |f|
f.puts %{<html><head><script language="javascript" src="browser.test.js"></script>
<style>
  #expected { background: #ccc; }
</style>
<body onload="start();">
  <h1>RubyJS Test Suite Runner</h1>

  <a href="#source">View Ruby source code</a>&nbsp;|&nbsp;
  <a href="browser.test.js">View Javascript source code</a><br/>

  <p>
  Test status (tests run / total # of tests): <div id="status"></div>
  </p>

  <table cellspacing="5" cellpadding="5">
  <thead>
    <tr>
      <td width="50%"><b>Output</b></td>
      <td width="50%"><b>Expected</b></td>
    </tr>
  </thead>
  <tbody>
}

expected.each_with_index do |line, i|
  f.puts %{
  <tr id="line_#{i}" style="background: #{RED}">
    <td>
      <pre id="out_#{i}"></pre>
    </td>
    <td>
      <pre id="exp_#{i}">#{line}</pre>
    </td>
  </tr>
  }
end

f.puts %{
<tr><td colspan="2" style="background: grey">&nbsp;</td></tr>
}

# Add some "overflow" rows, in case the RubyJS test output
# is longer as expected.
10.times do |i|
  f.puts %{
  <tr id="line_#{i+expected.size}">
    <td>
      <pre id="out_#{i+expected.size}"></pre>
    </td>
    <td>
      <pre id="exp_#{i+expected.size}"></pre>
    </td>
  </tr>
  }
end

f.puts %{
  </tbody>
  </table>
  <pre id="source">#{html_script}</pre>
</body></html>}
end
