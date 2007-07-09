module X
end

class A
  include X
end

class B < A
end

class TestKindOf
  def self.main
    p A.new.kind_of?(A) # => true
    p A.new.kind_of?(B) # => false
    p B.new.kind_of?(A) # => true
    p A.new.kind_of?(X) # => true
    p B.new.kind_of?(X) # => true
  end
end
