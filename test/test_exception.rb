class TestException
  def self.main

    p "before block"
    begin
      p "in block"
    end
    p "after block"

    ###
    begin
      p "block"
    rescue
      p "rescue"
    rescue Exception => a
      p "another rescue"
      p a
    else
      p "else"
    end

    p RuntimeError.new("test")

    puts "before begin"
    begin
      puts "before raise"
      raise Exception, "blah" 
      puts "after raise"
    rescue
      puts "noooo"
    rescue Exception => a
      p a
      puts "yes"
    ensure
      puts "ensure"
    end
    puts "after begin"

    puts "--"

    begin
      puts "abc"
      raise "r"
    rescue
      p $!
      puts "b"
    ensure
      puts "e"
    end

    #
    # Test arity checks
    #

    begin
      p("hallo".to_s(2))
    rescue ArgumentError => a
      p a
    end
  end
end
