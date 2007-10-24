class BmVm1Ensure < Bench
  def run(n)
    i=0
    while i<n # benchmark loop 1
      i+=1
      begin
        begin
        ensure
        end
      ensure
      end
    end
    return i
  end
end
