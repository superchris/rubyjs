#
# RWT - Ruby Web Toolkit
#
# Copyright (c) 2007 by Michael Neumann (mneumann@ntecs.de).
# All rights reserved.
#

class Element
  attr_accessor :domElement

  def initialize(domElement)
    @domElement = domElement
  end

  def appendChild(child)
    `#<self>.#<@domElement>.appendChild(#<child>.#<@domElement>); return #<self>`
  end

  def removeChild(child)
    `#<self>.#<@domElement>.removeChild(#<child>.#<@domElement>); return #<self>`
  end

  def insertBefore(child, before)
    `#<self>.#<@domElement>.insertBefore(#<child>.#<@domElement>, #<before>.#<@domElement>); return #<self>`
  end

  def getAttribute(attr)
    `var e = #<self>.#<@domElement>.getAttribute(#<attr>);
     return (e == null) ? #<nil> : e;`
  end

  def setAttribute(attr, value)
    `#<self>.#<@domElement>.setAttribute(#<attr>, #<value>); return #<self>`
  end

  def removeAttribute(attr)
    `#<self>.#<@domElement>.removeAttribute(#<attr>); return #<self>`
  end

  def getProperty(prop)
    `var e = #<self>.#<@domElement>[#<prop>];
     return (e == null) ? #<nil> : e;`
  end

  def setProperty(prop, value)
    `#<self>.#<@domElement>[#<prop>] = #<value>; return #<self>`
  end

  def setStyleAttribute(attr, value)
    `#<self>.#<@domElement>.style[#<attr>] = #<value>; return #<self>`
  end

  def setInnerHTML(html) `
    #<self>.#<@domElement>.innerHTML = #<html> || '';
    return #<self>
 `end

  def setInnerText(text) `
    var e = #<self>.#<@domElement>;
    // remove all children
    while (e.firstChild) e.removeChild(e.firstChild);
    // add new text node
    if (#<text> != #<nil>) e.appendChild(document.createTextNode(#<text>));
    return #<self>; 
 `end

  def observeEvents(mask)
    `#<self>.#<@domElement>.#<attr:eventMask> = #<mask> = #<mask> || 0;`
    elem = @domElement
    `
    #<elem>.onclick       = (#<mask> & 0x00001) ? window.#<attr:dispatchEvent> : null;
    #<elem>.ondblclick    = (#<mask> & 0x00002) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onmousedown   = (#<mask> & 0x00004) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onmouseup     = (#<mask> & 0x00008) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onmouseover   = (#<mask> & 0x00010) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onmouseout    = (#<mask> & 0x00020) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onmousemove   = (#<mask> & 0x00040) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onkeydown     = (#<mask> & 0x00080) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onkeypress    = (#<mask> & 0x00100) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onkeyup       = (#<mask> & 0x00200) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onchange      = (#<mask> & 0x00400) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onfocus       = (#<mask> & 0x00800) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onblur        = (#<mask> & 0x01000) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onlosecapture = (#<mask> & 0x02000) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onscroll      = (#<mask> & 0x04000) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onload        = (#<mask> & 0x08000) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onerror       = (#<mask> & 0x10000) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onmousewheel  = (#<mask> & 0x20000) ? window.#<attr:dispatchEvent> : null;
    `
  end

  INIT__ = `
    // assign event dispatcher
    window.#<attr:dispatchEvent> = function(evt) {
      // NOTE: "this" in this context is a DOM element.
      if (this.#<attr:listener>)
        this.#<attr:listener>.#<m:onBrowserEvent>(#<nil>, evt) 
    }
  `

  def self.create(tag)
    new(`document.createElement(#<tag>)`)
  end

  def self.createInput(type)
    `var e = document.createElement("INPUT");
     e.type = #<type>;`
    new(`e`)
  end

  def self.createInputRadio(group)
    `var e = document.createElement("INPUT");
     e.type = 'radio';
     e.name = #<group>;`
    new(`e`)
  end

  def self.createSelect(multiple)
    select = create("select")
    select.setProperty("multiple", true) if multiple
    return select
  end

  def self.createAnchor() create("A") end
  def self.createButton() create("button") end
  def self.createCaption() create("caption") end
  def self.createCol() create("col") end
  def self.createColGroup() create("colgroup") end
  def self.createDiv() create("div") end
  def self.createFieldSet() create("fieldset") end
  def self.createForm() create("form") end
  def self.createIFrame() create("iframe") end
  def self.createImg() create("img") end

  def self.createInputCheck() createInput("checkbox") end
  def self.createInputPassword() createInput("password") end
  def self.createInputRadio(group) createInputRadio(group) end
  def self.createInputText() createInput("text") end

  def self.createLabel() create("label") end
  def self.createLegend() create("legend") end

  def self.createOptions() create("options") end

  def self.createSelect(multiple=false)
    createSelect(multiple)
  end

  def self.createSpan() create("span") end
  def self.createTable() create("table") end
  def self.createTBody() create("tbody") end
  def self.createTD() create("td") end
  def self.createTextArea() create("textarea") end
  def self.createTFoot() create("tfoot") end
  def self.createTH() create("th") end
  def self.createTHead() create("thead") end
  def self.createTR() create("tr") end

  def self.getById(id)
    `var e = document.getElementById(#<id>);
     return (e ? #<Element>.#<m:new>(#<nil>, e) : #<nil>);`
  end

  class << self
    alias [] getById
  end

end

class UIObject
  
  # ----------------------------------------------------------
  # Element related methods
  # ----------------------------------------------------------

  def setElement(element)
    @element = element
  end

  def getElement
    @element
  end

  # ----------------------------------------------------------
  # Style related methods
  # ----------------------------------------------------------

  def getStyleName
  end

  def setStyleName(style)
  end

  def addStyleName(style)
  end

  def removeStyleName(style)
  end

  # ----------------------------------------------------------
  # Position related methods
  # ----------------------------------------------------------

  def getAbsoluteLeft
  end

  def getAbsoluteTop
  end

  def getOffsetHeight
  end

  def getOffsetWidth
  end

  def setWidth(width)
  end

  # height does not include margin, borders, decorations
  def setHeight(height)
  end

  def setSize(width, height)
    setWidth(width)
    setHeight(height)
  end

  def setPixelSize(width, height)
  end

  # ----------------------------------------------------------
  # Misc methods
  # ----------------------------------------------------------

  def isVisible?(elem=@element)
    `return #<elem>.#<@domElement>.style.display != 'none'`
  end

  def setVisible(visible=true, elem=@element)
    `#<elem>.#<@domElememt>.style.display = #<visible> ? '' : 'none'; return #<nil>`
  end

  def getTitle
  end

  def setTitle(title)
  end

  def registerEvents(eventBitsToAdd)
  end

  def unregisterEvents(eventBitsToRemove)
  end
end

class Main
  def self.main
    Element['root'].appendChild(Element.createDiv.setInnerText('hallo leute').setAttribute('title', 'heyja'))
  end
end
