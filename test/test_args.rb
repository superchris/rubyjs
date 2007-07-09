class TestArgs
  def m(a, b=1, c="hallo", *args) 
    p a
    p b
    p c
    p args
  end

  def self.main
    obj = new()

    obj.m(0)
    puts "--"
    obj.m(1,2)
    puts "--"
    obj.m(1,2,9)
    puts "--"
    obj.m(1,2,9,5)
    puts "--"
    obj.m(1,2,9,5,6)
    puts "--"
    obj.m(1,2,9,5,6,7,8,9,10,11,12)
  end
end
