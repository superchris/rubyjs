module X
end

class A
  include X
end

class B < A
end

class C < B
end

class D
end

class TestClass
  def self.main
    p A.new.instance_of?(A) # => true
    p A.new.instance_of?(B) # => false
    p B.new.instance_of?(A) # => false
    p A.new.instance_of?(X) # => false
    p B.new.instance_of?(X) # => false

    p A.new.kind_of?(A) # => true
    p A.new.kind_of?(B) # => false
    p B.new.kind_of?(A) # => true
    p A.new.kind_of?(X) # => true
    p B.new.kind_of?(X) # => true

    p C.new.kind_of?(X) # => true
    p C.new.kind_of?(A) # => true
    p C.new.kind_of?(B) # => true
    p C.new.kind_of?(C) # => true
    p C.new.kind_of?(D) # => false
    p C.new.kind_of?(Object) # => true
    p C.new.kind_of?(Kernel) # => true
    p C.new.kind_of?(Class) # => false

    p ("hallo".class.name)
    p (nil.class.name)
    p (nil.instance_of?(NilClass))
    p ("hallo".instance_of?(String))
    p ("hallo".class)
    p A
    p B
    p C
    p D
    p X

    p X.name
    p A.name
    p B.name
  end
end
