class A
  def a_method(a,b)
    p a, b
  end
end

class B < A
  def a_method(b, a)
    p "in B"
    super
  end
end

class TestSend
  def self.main
    p A.new.send("a_method", 1, 2)
    p B.new.send("a_method", 1, 2)
  end
end
