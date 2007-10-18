require 'tempfile'

def gen_test_suite(tests)
  script = ""
  body = ""

  script << "require 'common'\n\n"
  tests.each_with_index do |file, i|
    basename = File.basename(file)[0..-4]
    klassname = basename.gsub(/(^|_)./) {|m| m[-1,1].upcase}
    humanname = basename.gsub('_', ' ').capitalize

    script << "#\n"
    script << "# file: #{file}\n"
    script << "#\n\n"
    script << File.read(file)
    script << "\n\n"
    body << %{
      puts '~~~~~~~~~~~~~~~~~~~~'
      puts '#{humanname}'
      puts '~~~~~~~~~~~~~~~~~~~~'
      #{klassname}.main
    }
  end

  script << %{
    class TestSuite
      def self.main
        begin
          #{body}
        rescue Exception => a
          p "unhandled exception"
          p a
        end
      end
    end
    TestSuite.main unless $RUBYJS
  }

  return script
end

def ruby2js(rubycode_path)
  jscode = `./rubyjs_gen -I./test -P Browser -m TestSuite #{rubycode_path}`
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
File.open('browser.test.js', 'w+') {|f| f << jscode}

html_script = script.gsub("&", "&amp;").
  gsub("<", "&lt;").
  gsub(">", "&gt;").gsub("\n", "<br/>")

expected = `ruby -I./test < #{rubycode.path}`.chomp.  # remove last newline
  gsub("&", "&amp;").
  gsub("<", "&lt;").
  gsub(">", "&gt;").gsub("\n", "<br/>")

puts %{<html><head><script language="javascript" src="browser.test.js"></script>
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
