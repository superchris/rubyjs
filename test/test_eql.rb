class TestEql
  def self.main
    p "a".eql?("a")      # => true
    p "a".eql?(1)        # => false
    p "1".eql?(1)        # => false
    p [1,2].eql?([1,2])  # => true
    p 1.eql?("1")        # => false
  end
end
