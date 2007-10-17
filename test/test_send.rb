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
    p A.new.respond_to?(:a_method)
    p A.new.respond_to?(:to_s)
    p A.new.respond_to?(:inspect)
    p A.new.respond_to?(:b_method)
  end
end
