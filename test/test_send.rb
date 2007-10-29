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

  def c_method(b)
  end
end

class C
  def method_missing(id, *args, &block)
    p "mm: #{id}, #{args}"
  end
end

class TestSend
  def self.main
    puts "send"
    p A.new.send("a_method", 1, 2)
    p B.new.send("a_method", 1, 2)

    puts "respond_to?"
    p A.new.respond_to?(:a_method)
    p A.new.respond_to?(:to_s)
    p A.new.respond_to?(:inspect)
    p A.new.respond_to?(:b_method)
    p A.new.respond_to?(:c_method)

    puts "method_missing"
    p C.new.respond_to?(:blah_blah)
    C.new.blah_blah(1,2,3)

    begin
      A.new.blah_blah
      puts "FAILURE?"
    rescue NoMethodError
      puts "catched!!!"
    end

    begin
      A.not_a_method
    rescue NoMethodError
      p "goood"
    end

    puts "class Method"
    m = "hallo".method(:to_s)
    p m
    p m.call

    a = [1,2,3]
    m = a.method(:+)
    p m
    p m.call([2,3])
    p m
    p a
  end
end
