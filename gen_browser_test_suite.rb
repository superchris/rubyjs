tests = ARGV.join(" ")

expected = `ruby gen_test_suite.rb #{tests} | ruby -I./test`.gsub("\n", "<br/>")

puts '<html><head><script>'
puts `ruby gen_test_suite.rb #{tests} | ./rubyjs_gen -I./test -P Browser -m TestSuite -`
puts %{
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
<body onload="main(); compare();">
  <table cellspacing="5" cellpadding="5">
  <thead>
    <tr>
      <td width="50%"><b>Output</b></td>
      <td width="50%"><b>Expected</b></td>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td width="50%">
      <div id="out"></div>
    </td>
    <td width="50%">
      <div id="expected">#{expected}</div>
    </td>
  </tr>
  </tbody>
  </table>
</body></html>}
