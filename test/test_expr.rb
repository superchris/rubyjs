class TestExpr
  def test
    i = if true then 1 else 2 end
    p i
    i = true or return
    p i
  end

  def self.main
    new.test
  end
end
