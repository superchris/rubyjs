class TestCase
  def test
    case 1+1
    when 1, 3
      puts "NOT OKAY"
    when 2
      puts "OKAY"
    else
      puts "NOT OKAY"
    end
  end

  def self.main
    new.test
  end
end
