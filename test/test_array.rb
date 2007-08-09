class TestArray
  def test
    # delete
    a = [ "a", "b", "b", "b", "c" ]
    p a.delete("b")                   #=> "b"
    p a                               #=> ["a", "c"]
    p a.delete("z")                   #=> nil
  end

  def self.main
    new.test
  end
end
