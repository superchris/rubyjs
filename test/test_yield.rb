class TestYield
  def three_times_yield
    yield 1
    yield 2
    yield 3
  end

  def test_three_times_yield
    puts "three_times_yield"
    three_times_yield {|i| p i }
    puts "--"
  end

  def three_times_block(&block)
    block.call(1)
    block.call(2)
    block.call(3)
  end

  def test_three_times_block
    puts "three_times_block"
    three_times_block {|i| p i }
    puts "--"
  end

  def three_times_indirect(&block)
    three_times_yield(&block) 
    three_times_block(&block) 
  end

  def test_three_times_indirect
    puts "three_times_indirect"
    three_times_indirect {|i| p i}
    puts "--"
  end

=begin
  def loop
    while true
      yield
    end
  end
=end

=begin
  def test_loop
    puts "loop"
    i = 0 
    loop do
      i += 1
      next if i % 2 == 1 
      p i
      break if i > 8
    end
    puts "--"
  end

=end

  def test_while_loop
    puts "while-loop"
    i = 0 
    while true
      i += 1
      next if i % 2 == 1 
      p i
      break if i > 8
    end
    puts "----"
    while i > 0
      p i
      i -= 1
    end
    puts "--"
  end

  def test
    test_three_times_yield
    test_three_times_block
    test_three_times_indirect
    #test_loop
    test_while_loop
  end

  def self.main
    new.test
  end
end
