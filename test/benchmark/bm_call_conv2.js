function called(x)
{
}

function run(n)
{
  var i = 0;
  while (i<n) // while loop 1
  {
    i += 1;
    called([1,2,3,4,5]);
  }
  return i;
}
