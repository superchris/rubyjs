#--
# Copyright (c) 2007 by Michael Neumann (mneumann@ntecs.de)
#++

class DOM

  def self.appendChild(parent, child) `
    if (#<child>.nodeType == 3) 
    {
      #<parent>.appendChild(#<child>); 
      #<parent>.removeChild(#<child>); 
    }
    #<parent>.appendChild(#<child>); 
    return #<nil>`
  end

  def self.insertChild(parent, child, index) `
    var count = 0, child = #<parent>.firstChild, before = null;
    while (child) {
      if (child.nodeType == 1) {
        if (count == #<index>) {
          before = child;
          break;
        }
        ++count;
      }
      child = child.nextSibling;
    }

    if (#<child>.nodeType == 3) 
    {
      #<parent>.appendChild(#<child>); 
      #<parent>.removeChild(#<child>); 
    }
    #<parent>.insertBefore(#<child>, before);
    return #<nil>`
  end

  def self.insertBefore(parent, child, before) `
    if (#<child>.nodeType == 3) 
    {
      #<parent>.appendChild(#<child>); 
      #<parent>.removeChild(#<child>); 
    }
    #<parent>.insertBefore(#<child>, #<before>);
    return #<nil>`
  end

  def self.replace(elem, newElem) `
    var p = #<elem>.parentNode;
    if (!p) return;

    if (#<newElem>.nodeType == 3) 
    {
      p.appendChild(#<newElem>); 
      p.removeChild(#<newElem>); 
    }
    
    p.insertBefore(#<newElem>, #<elem>);
    p.removeChild(#<elem>);
    return #<nil>`
  end

  def self.setInnerHTML(elem, html='') `
    #<elem>.innerHTML = #<html>;
    if (#<html>.search("<") == -1)
    {
      // contains no HTML, so we have to assign it twice
      #<elem>.innerHTML = #<html>; 
    }
    return #<nil>`
  end

  def self.setInnerText(elem, text) `
    // Remove all children first.
    while (#<elem>.firstChild) {
      #<elem>.removeChild(#<elem>.firstChild);
    }
    // Add a new text node.
    if (#<text> !== #<nil>) {
      var n = document.createTextNode(#<text>);
      #<elem>.appendChild(n);
      #<elem>.removeChild(n);
      #<elem>.appendChild(n);
    }
    return #<nil>`
  end

end
