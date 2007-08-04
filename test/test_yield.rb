class TestYield
  def three_times
    yield 1
    yield 2
    yield 3
  end

  def three_times_block(&block)
    block.call(1)
    block.call(2)
    block.call(3)
  end

  def three_times_indirect_yield(&block)
    three_times(&block) 
  end

  def three_times_indirect_block(&block)
    three_times_block(&block) 
  end

  def loop
    while true
      yield
    end
  end

  def test_three_times
    puts "three_times"
    three_times {|i| p i }
    puts "--"
    three_times_block {|i| p i }
    puts "--"
    three_times_indirect_yield {|i| p i }
    puts "--"
    three_times_indirect_block {|i| p i }
    puts "--"
  end

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

  def test_while_loop
    puts "while-loop"
    i = 0 
    while true
      i += 1
      next if i % 2 == 1 
      p i
      break if i > 8
    end
    puts "--"
  end

  def test
    test_three_times
    test_loop
    test_while_loop
  end

  def self.main
    new.test
  end
end
