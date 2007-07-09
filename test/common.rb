if $RUBYJS
module Kernel
  def puts(obj="")
    obj = obj.to_s
    `out.println(#<obj>)`
  end
end
end
