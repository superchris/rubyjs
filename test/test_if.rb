class TestIf
  def test
    puts "OK" if true
    puts "NOT OK" if false
    puts "OK" unless false
    puts "NOT OK" unless true
    puts "OK" if true and true and (true or false) and (!false)

    puts "OK" if 5 < 6 and 6 < 7

    # test the "||" operator
    p(false || "a") # => "a"
    p(nil || "a")   # => "a"
    p(true || "a")  # => true
    p("b" || "a")   # => "b"

    # test the "&&" operator

    p(false && "a") # => false
    p(nil && "a")   # => nil
    p(true && "a")  # => "a"
    p("b" && "a")   # => "a"
  end

  def self.main
    new.test
  end
end
