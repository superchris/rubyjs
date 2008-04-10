class TestRange
  def test
    a = Range.new(0,2)
    p a.first
    p a.last
    p a

    i = 1
    p ((i..i+5).to_s)
    p ((i...i+i).to_s)

    p ((0..2).to_s)
    p ((0...2).to_s)

    (0..4).each do |i| p i end
    (0...4).each do |i| p i end
    (-1..-4).each do |i| p i end

    p ((0..4).include?(4))
    p ((0..4).include?(5))
    p ((0...4).include?(5))
    p ((0...4).include?(4))
    p ((0...4).include?(3))
    p ((0...4).include?(0))
    p ((0...4).include?(-1))

    p ((-1..-5).to_a)
    p ((-5..-1).to_a)

    r = Range.new(0, 4)
    p r.first
    p r.begin
    p r.last
    p r.end
    p r.exclude_end?

    r = 1...5
    p r.first
    p r.begin
    p r.last
    p r.end
    p r.exclude_end?

    p (false == false)
    p (false == true)
    p (true == false)
    p (true == true)

    p ((0..2) == (0..2))
    p ((0..2) == Range.new(0,2))
    p ((0..2) == (0...2))

    j = 55
    p j
    for i in 1..100
      j = i
    end
    p j

    j = 54
    p j
    for j in 1..100
    end
    p j
  end

  def self.main
    new.test
  end
end
