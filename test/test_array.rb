class TestArray
  if $RUBYJS
    def array
      [1, 2, `null`, [`null`, `null`, 4]]
    end
  else
    def array
      [1, 2, nil, [nil, nil, 4]]
    end
  end

  def test
    # delete
    a = [ "a", "b", "b", "b", "c" ]
    p a.delete("b")                   #=> "b"
    p a                               #=> ["a", "c"]
    p a.delete("z")                   #=> nil

    puts "test native JS array mapping"
    p array()
  end

  def self.main
    new.test
  end
end
