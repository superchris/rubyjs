class TestSplat
  def m(*args)
    p args
  end

  def self.main
    obj = new()

    obj.m
    obj.m(*[])

    obj.m(1)
    obj.m(*[1])
    obj.m(1,*[])

    obj.m(1,2)
    obj.m(*[1,2])
    obj.m(1,*[2])
    obj.m(1,*[1,2])
  end
end
