module Kernel
=begin
  def puts(obj="")
    obj = obj.to_s.gsub("&", "&amp;").gsub("<", "&lt;").gsub(">", "&gt;") + "<br/>"
    `document.getElementById('out').innerHTML += #<obj>`
  end
=end

  def puts(obj="")
    obj = obj.to_s
    `STDOUT_puts(#<obj>)`
  end
end
