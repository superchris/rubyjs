require 'microunit'

class TestArray < MicroUnit::TestCase

  def test_array
    a = [1, 2, `null`, [`null`, `null`, 4]]
    assert_equal a, [1, 2, nil, [nil, nil, 4]]
    assert a.eql? [1, 2, nil, [nil, nil, 4]] 
  end
  
  def test_delete
    a = [ "a", "b", "b", "b", "c" ]
    a.delete "b"
    assert_equal a, ["a", "c"]
  end
  
  def test_include
    assert [1, 2, 3].include? 2
    assert ! [1, 3].include?(2)
  end
  
end
