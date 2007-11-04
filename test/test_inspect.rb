class TestInspect
  def test
    o = [{"Hello"=>'Rubyconf'}]
    puts o.inspect
  end

  def self.main
    new.test
  end
end
