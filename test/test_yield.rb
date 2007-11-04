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

  def three_times_yield2
    p yield(1)
    p yield(2)
    p yield(3)
  end

  def test_three_times_yield2
    puts "three_times_yield2"
    three_times_yield2 {|i|
      if i == 1
        i
      else
        next i+1
      end
    }
  end

  def loop
    while true
      yield
    end
    p "not reached"
  end

  def loop2(&block)
    while true
      block.call
    end
    p "not reached"
  end

  def test_loop
    puts "loop"
    i = 0 
    res = loop do 
      i += 1
      next if i % 2 == 1 
      p i
      break "out", i if i > 8
    end 
    p res
    puts "--"
  end

  def test_loop2
    puts "loop2"
    i = 0 
    res = loop2 do 
      i += 1
      next if i % 2 == 1 
      p i
      break "out", i if i > 8
    end 
    p res
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
    puts "----"
    while i > 0
      p i
      i -= 1
    end
    puts "--"
  end

  def return_in_block(&block)
    p "return_in_block before"
    block.call
    p "return_in_block after"
  end

  def test_return_in_block
    p "before"
    return_in_block { return 4 }
    p "after (NOT)"
  end

  def test_proc
    p "test_proc"
    a = proc { return 0 }
    p a.call
    a = Proc.new { break 3 }
    p a.call
  end

  def test
    test_three_times_yield
    test_three_times_block
    test_three_times_indirect
    test_three_times_yield2
    test_loop
    test_loop2
    test_while_loop

    begin
      test_proc
    rescue LocalJumpError => e
      p e
    end

    p test_return_in_block()
  end

  def self.main
    new.test
  end
end
