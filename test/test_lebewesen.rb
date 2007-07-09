class TestLebewesen
  def self.main
    leni = Katze.new("AA-BB", "Leni")
    flocki = Katze.new("AC-DC", "Flocki") 
    bello = Hund.new("AA-ZZ")
    leni.miau
    bello.wau
    bello.jage(leni)
  end
end

class Lebewesen
  def initialize(dns)
    @dns = dns
  end
end

class Katze < Lebewesen
  attr_reader :name

  def initialize(dns, name)
    super(dns)
    @name = name
  end

  def miau
    puts "miau, ich bin " + @name
  end
end

class Hund < Lebewesen
  def wau
    puts "wau wau"
  end

  def jage(katze)
    puts "ich jage " + katze.name
  end
end
