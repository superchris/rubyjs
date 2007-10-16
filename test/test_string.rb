class TestString
  def test
    # index
    p "hello".index('e')
    p "hello".index('lo')
    p "hello".index('a')
    p "hello hello".index('ll')
    p "hello hello".index('ll', 3)

    # []
    p "hallo"[0,1]
    p "hallo"[0,2]
    p "hallo"[0,5]

    # string interpolation
    p "abc #{ 1 + 2 } def"
  end

  def self.main
    new.test
  end
end
