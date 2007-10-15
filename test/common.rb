if $RUBYJS
module Kernel
  def puts(obj="")
    obj = obj.to_s
    `println(#<obj>)`
  end
end
end
