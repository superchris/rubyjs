class TestMassign
  def self.main
    a, b = 1, 2
    p a
    p b
    puts "--"

    a, b = 1, 2, 3
    p a
    p b
    puts "--"

    c = 5
    a, b, c = 1, 2 
    p a
    p b
    p c
    puts "--"

    @a, b, @c = 1, 2, 3
    p @a
    p b
    p @c
    puts "--"

    puts "swap"
    # swap
    a, b = 1, 2
    p a
    p b
    a, b = b, a
    p a
    p b
    puts "--"

    puts "splat1"
    a, b, c, *d = 1, 2  
    p a
    p b
    p c
    p d
    puts "--"

    puts "splat2"
    a, *b = 1, 2
    p a
    p b
    puts "--"

    puts "splat3"
    a, *b = 1, 2, 3, 4, 5
    p a
    p b
    puts "--"

    puts "splat with globals"
    p $a
    p $b
    $a, $b = 1, 2 
    p $a
    p $b
    puts "--"
    
    #TODO: a, b = 1 (to_ary)
  end
end
