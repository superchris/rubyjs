class TestHash
  def self.main
    h = {"a" => 6, "b" => 7, "1" => 1, 1 => 2, "1,2" => "hello", [1,2] => "good"} 
    p h["a"]
    p h["b"] 
    p h["1"]
    p h[1]
    p h["1,2"]
    p h[[1,2]] 
  end
end
