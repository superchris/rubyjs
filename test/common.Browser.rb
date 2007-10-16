module Kernel
  def puts(obj="")
    obj = obj.to_s + "<br/>"
    `document.getElementById('out').innerHTML += #<obj>`
  end
end
