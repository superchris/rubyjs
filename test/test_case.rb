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

    p (Array === [])
    p (RuntimeError === RuntimeError.new)

    case 1
    when Fixnum 
      puts "OK"
    when 1
      puts "OK"
    end

    case 4
    when 0..3
      puts "NOT OKAY"
    when 1...4
      puts "NOT OKAY"
    when 2..4
      puts "OKAY"
    end
  end

  def self.main
    new.test
  end
end
