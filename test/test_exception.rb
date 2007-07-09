class TestException
  def self.main

    puts "before begin"
    begin
      puts "before raise"
      raise Exception, "blah" 
      puts "after raise"
    rescue
      puts "noooo"
    rescue Exception
      puts "yes"
    ensure
      puts "ensure"
    end
    puts "after begin"

    puts "--"

    begin
      puts "a"
      raise "r"
    rescue
      puts "b"
    ensure
      puts "e"
    end
  end
end
