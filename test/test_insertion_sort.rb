class TestInsertionSort
  def sort ary
    puts "Before insertion sort:"
    p ary

    for i in 1..(ary.length-1) do
      n = i
      while n >= 1 && ary[n] < ary[n - 1] do
        if ary[n] < ary[n - 1]
          tmp = ary[n]
          ary[n] = ary[n - 1]
          ary[n - 1] = tmp
        end
        n -= 1
      end
    end

    puts "After insertion sort:"
    p ary
  end

  def self.main
    new.sort [3, 6, 2, 5, 3, 7, 1, 8]
  end
end
