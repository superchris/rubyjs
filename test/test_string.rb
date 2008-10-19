require 'microunit'

class TestString < MicroUnit::TestCase
  
  def xtest
    # inspect
    p "hello"
    p "hallo\b\t\n"
    p "hallo\\leute"
    p '"super"'
    
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

    p ("10".rjust(10, "0"))
    p ("10".rjust(1, "blah"))
    p ("x".rjust(4, "()"))

    p ("10".ljust(10, "0"))
    p ("10".ljust(1, "blah"))
    p ("x".ljust(4, "()"))


    # string interpolation
    p "abc #{ 1 + 2 } def"
    @a = "hallo".inspect
    @b = 4.5
    p "#{@a},#{@b}"

    
    # gsub
    s = "hallo".gsub("l", "r")
    p s
    s = "hallo".gsub(/ll/, "rr")
    p s
    s = "hallo".gsub(/l/) { "r" }
    p s
    s = "hallo".gsub(/ll/) { "blah blah" }
    p s
    "hallllllo".gsub(/(l)l/) {|i| p i }
  end
  
  def test_gsub
    assert_equal "harro", "hallo".gsub("l", "r")
  end
  
  def test_sub
    assert_equal "otfo", "foot".sub(/(fo)(ot)/, '$2fo')
    assert_equal "Foo_Bar", "FooBar".sub(/([a-z\d])([A-Z])/, '$1_$2')
  end

  def test_tr
    # from the standard lib docs
    assert_equal "h*ll*", "hello".tr('aeiou', '*')
    #assert_equal "*e**o", "hello".tr('^aeiou', '*')   #=> 
    assert_equal "hippo", "hello".tr('el', 'ip')      #=> 
    #assert_equal "ifmmp", "hello".tr('a-y', 'b-z')    #=>    
  end
  
  def test_downcase
    assert_equal "foo", "Foo".downcase
    assert_equal "foo", "fOO".downcase
  end
  
end
