class DOMElement
  def initialize(element)
    @dom_element = element
  end
  
  def observe(event, &block)
    element = @dom_element
    `
      if (#<element>.addEventListener) {
        #<element>.addEventListener(#<event>, #<block>, false);
      } else {
        #<element>.attachEvent("on" + #<event>, #<block>);
      }
    `
    nil
  end  
  
  def [](attribute)
    element = @dom_element
    `return #<element>[#<attribute>]`
  end
  
  def []=(attr, value)
    attr_name = attr.to_s
    element = @dom_element
    `#<element>[#<attr_name>] = #<value>;`
    nil
  end
  
  def self.find_js_element(element)
    `return document.getElementById(#<element>);`
  end
  

  def self.find(element)
    dom_element = self.find_js_element(element)
    DOMElement.new(dom_element)
  end
  
  #
  # Gets an HTML representation (as String) of an element's children.
  #
  # elem::   the element whose HTML is to be retrieved
  # return:: the HTML representation of the element's children
  #
  def inner_html 
    elem = @dom_element
    `
    var ret = #<elem>.innerHTML;
    return (ret == null) ? #<nil> : ret;`
  end

  #
  # Sets the HTML contained within an element.
  #
  # elem:: the element whose inner HTML is to be set
  # html:: the new html
  #
  def inner_html=(html) 
    elem = @dom_element
    `
    #<elem>.innerHTML = #<html>;
    return #<nil>;`
  end
  
end
