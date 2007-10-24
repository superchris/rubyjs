function m(block)
{
  block();
}

function run(n)
{
  var i=0;
  while (i<n) // while loop 1
  {
    i += 1;
    m(function() {});
  }
  return i;
}
