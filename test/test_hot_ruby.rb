#
# Examples taken from: http://hotruby.accelart.jp/
#
class TestHotRuby
  def sort ary
    puts "Before insertion sort:"
    p ary

    for i in 1..(ary.length-1) do
      n = i
      while n >= 1 && ary[n] < ary[n - 1] do
        if ary[n] < ary[n - 1]
          tmp = ary[n]
          ary[n] = ary[n - 1]
          ary[n - 1] = tmp
        end
        n -= 1
      end
    end

    puts "After insertion sort:"
    p ary
  end

  def addPrint a, b, c
    puts a + b + c
  end

  def self.main
    t = new()

    puts "InsertionSort"
    t.sort [3, 6, 2, 5, 3, 7, 1, 8]

    puts "Array args"
    ary = [' World ', '!']
    t.addPrint 'Hello', *ary

    puts "Block"
    Foo.new.main

    puts "Class"
    puts Pi::PI
    # different precision on Ruby vs. Javascript
    puts Pi.new.calc.to_s[0,13] 


    puts "Const"
    # FIXME
=begin
    Bar_::Baz_.new.run 
    Bar2.new.run
    Object::Bar2.new.run
    Bar3.new.run
=end
  end
end

#
# Block
#
class Hoge
  def add_msg &block
    block.call "is"  # s/yield/call/
  end
end
  
class Foo
  NAME = ' - William Shakespeare'
  def main
    pre = "Action"
    @space = " "
    Hoge.new.add_msg do |msg|
      fuga = "eloquence"
      puts pre + @space + msg + @space + fuga + NAME
    end
  end
end

#
# Class
#
class Pi
  def initialize
    @a = 355.0
  end
  
  def calc
    b = 113.0
    return @a / b
  end
  
  PI = 'PI is about'
end
  
#
# Const
# 
class Foo_
  CONST = 'Foo'
end

class Bar_
  CONST = 'Bar'

  class Baz_ < Foo_
    def run
      puts CONST             # => "Bar"      Outer class const
      # In this case, you have to specify if you want to see parent class const.
      puts Foo_::CONST        # => "Foo"
    end
  end
end
  
class Foo2
  CONST = 'Foo'
end
  
CONST = 'Object'
  
class Bar2 < Foo2
  def run
    puts CONST               # => "Foo"
  end
end

# If you specify "Object", then const in Object is searched before.
class Object
  class Bar2 < Foo2
    def run
      puts CONST             # => "Object"
    end
  end
end
  
class Foo3
  CONST = 'Foo'
end
class Bar3 < Foo3
  def run
    puts CONST               # => "Foo"
    #CONST = 'Bar'            # Define Bar's const "CONST"
    puts CONST               # => "Bar"  (Foo::CONST is hidden)
    puts Foo3::CONST         # => "Foo"  (You can see by "::")
  end
end
