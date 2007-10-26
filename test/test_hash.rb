class TestHash
  if $RUBYJS
    def hash
      `var el = {}; el["1"] = null; return el`
    end
  else
    def hash
      {"1" => nil}
    end
  end

  def test
    h = {"a" => 6, "b" => 7, "1" => 1, 1 => 2, "1,2" => "hello", [1,2] => "good"} 
    p h["a"]
    p h["b"] 
    p h["1"]
    p h[1]
    p h["1,2"]
    p h[[1,2]] 

    puts "test native JS hash"
    a = hash()
    #p a
  end

  def self.main
    new.test
  end
end
