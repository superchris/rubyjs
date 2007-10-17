class TestString
  def test
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

  def self.main
    new.test
  end
end
