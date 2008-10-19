require 'microunit'
require 'inflector'

#module IncludeInflector
#  def underscore(string)
#    Inflector.underscore(string)
#  end
#end

class TestInflector < MicroUnit::TestCase
  include Inflector

  def test_underscore
    assert_equal "foo_bar", self.underscore("FooBar")
  end
  
end
