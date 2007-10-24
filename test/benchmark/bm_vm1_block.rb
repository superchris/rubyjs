class BmVm1Block < Bench
  def m
    yield
  end

  def run(n)
    i=0
    while i<n # while loop 1
      i+=1
      m{
      }
    end
    return i
  end
end
