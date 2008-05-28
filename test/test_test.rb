require 'microunit'

class TestTest < TestCase
  
  def test_good
    assert true
  end
  
  def test_four
    assert(2+2==4, "2 + 2 is four")
  end
  
  def self.main
    #puts TestTest.instance_methods.join(",")
    TestRunner.run(TestTest)
    "foo"
  rescue StandardError => error
    puts error
  end
end
