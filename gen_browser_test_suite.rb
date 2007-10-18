expected = `ruby gen_test_suite.rb | ruby -I./test`.chomp.  # remove last newline
  gsub("&", "&amp;").
  gsub("<", "&lt;").
  gsub(">", "&gt;").gsub("\n", "<br>")

puts '<html><head><script>'
puts `ruby gen_test_suite.rb | ./rubyjs_gen -I./test -P Browser -m TestSuite -`
puts %{

var STDOUT = [];

function flush()
{
  document.getElementById('out').innerHTML = 
    STDOUT.join('\\n').replace(/[&]/g, "&amp;").replace(/[<]/g, "&lt;").replace(/[>]/g, "&gt;").replace(/\\n/g, "<br>");
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
</script>
<style>
  #expected { background: #ccc; }
</style>
<body onload="start();">
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
</body></html>}
