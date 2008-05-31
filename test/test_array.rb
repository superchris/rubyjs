require 'microunit'
class TestArray < TestCase

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
  

end
