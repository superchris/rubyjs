require 'rwt/DOM'
class HelloWorld
  def self.main
    out = DOM.getElementById('out')
    DOM.setInnerText(out, 'hello world')
  end
end
