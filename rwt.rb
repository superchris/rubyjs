#
# RWT - Ruby Web Toolkit
#
# Copyright (c) 2007 by Michael Neumann (mneumann@ntecs.de).
# All rights reserved.
#

#
# An Element is associated with the Element() class in Javascript.
# This works perfectly in Mozilla, Opera and Konqueror but not in
# Safari and IE6/IE7. For Safari a hack is possible by including
# the methods into "Object" instead of "Element". For IE the solution
# is to either append the methods at runtime or to wrap the objects.
#
class Element
  OBJECT_CONSTRUCTOR__ = "Element"

  def appendChild(child)
    `#<self>.appendChild(#<child>); return #<self>`
  end

  def removeChild(child)
    `#<self>.removeChild(#<child>); return #<self>`
  end

  def insertBefore(child, before)
    `#<self>.insertBefore(#<child>, #<before>); return #<self>`
  end

  def getAttribute(attr)
    `var e = #<self>.getAttribute(#<attr>);
     return (e == null) ? #<nil> : e`
  end

  def setAttribute(attr, value)
    `#<self>.setAttribute(#<attr>, #<value>); return #<self>`
  end

  def removeAttribute(attr)
    `#<self>.removeAttribute(#<attr>); return #<self>`
  end

  def getProperty(prop)
    `var e = #<self>[#<prop>];
     return (e == null) ? #<nil> : e`
  end

  def setProperty(prop, value)
    `#<self>[#<prop>] = #<value>; return #<self>`
  end

  def setStyleAttribute(attr, value)
    `#<self>.style[#<attr>] = #<value>; return #<self>`
  end

  def setInnerHTML(html) 
    `#<self>.innerHTML = #<html> || '';
     return #<self>`
  end

  def setInnerText(text)
    `// remove all children
     while (#<self>.firstChild) #<self>.removeChild(#<self>.firstChild);
     // add new text node
     if (#<text> != #<nil>) #<self>.appendChild(document.createTextNode(#<text>));
     return #<self>`
  end

  def sinkEvents(mask)
    `#<self>.#<attr:eventMask> = #<mask> = #<mask> || 0;
     #<self>.onclick       = (#<mask> & 0x00001) ? window.#<attr:dispatchEvent> : null;
     #<self>.ondblclick    = (#<mask> & 0x00002) ? window.#<attr:dispatchEvent> : null;
     #<self>.onmousedown   = (#<mask> & 0x00004) ? window.#<attr:dispatchEvent> : null;
     #<self>.onmouseup     = (#<mask> & 0x00008) ? window.#<attr:dispatchEvent> : null;
     #<self>.onmouseover   = (#<mask> & 0x00010) ? window.#<attr:dispatchEvent> : null;
     #<self>.onmouseout    = (#<mask> & 0x00020) ? window.#<attr:dispatchEvent> : null;
     #<self>.onmousemove   = (#<mask> & 0x00040) ? window.#<attr:dispatchEvent> : null;
     #<self>.onkeydown     = (#<mask> & 0x00080) ? window.#<attr:dispatchEvent> : null;
     #<self>.onkeypress    = (#<mask> & 0x00100) ? window.#<attr:dispatchEvent> : null;
     #<self>.onkeyup       = (#<mask> & 0x00200) ? window.#<attr:dispatchEvent> : null;
     #<self>.onchange      = (#<mask> & 0x00400) ? window.#<attr:dispatchEvent> : null;
     #<self>.onfocus       = (#<mask> & 0x00800) ? window.#<attr:dispatchEvent> : null;
     #<self>.onblur        = (#<mask> & 0x01000) ? window.#<attr:dispatchEvent> : null;
     #<self>.onlosecapture = (#<mask> & 0x02000) ? window.#<attr:dispatchEvent> : null;
     #<self>.onscroll      = (#<mask> & 0x04000) ? window.#<attr:dispatchEvent> : null;
     #<self>.onload        = (#<mask> & 0x08000) ? window.#<attr:dispatchEvent> : null;
     #<self>.onerror       = (#<mask> & 0x10000) ? window.#<attr:dispatchEvent> : null;
     #<self>.onmousewheel  = (#<mask> & 0x20000) ? window.#<attr:dispatchEvent> : null;`
  end

  def self.__init
    `// assign event dispatcher
     window.#<attr:dispatchEvent> = function(evt) {
       // NOTE: _this_ in this context is a DOM element.
       if (this.#<attr:listener>)
         this.#<attr:listener>.#<m:onBrowserEvent>(#<nil>, evt)
     };`
  end

  def setEventListener(listener)
    `#<self>.#<attr:listener> = #<listener>; return #<self>`
  end

  def self.create(tag)
    `return document.createElement(#<tag>)`
  end

  def self.createInput(type)
    `var e = document.createElement("INPUT");
     e.type = #<type>;
     return e`
  end

  def self.createInputRadio(group)
    `var e = document.createElement("INPUT");
     e.type = 'radio';
     e.name = #<group>;
     return e`
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
     return (e == null) ? #<nil> : e`
  end

  class << self
    alias [] getById
  end

end

class Event
  OBJECT_CONSTRUCTOR__ = "Event"

  #
  # The left mouse button
  #
  BUTTON_LEFT = 1

  # 
  # The middle mouse button
  #
  BUTTON_MIDDLE = 4

  # 
  # The right mouse button
  #
  BUTTON_RIGHT = 2

  #
  # Fired when an element loses keyboard focus.
  #
  ONBLUR = 0x01000

  #
  # Fired when the value of an input element changes.
  #
  ONCHANGE = 0x00400

  #
  # Fired when the user clicks on an element.
  #
  ONCLICK = 0x00001

  #
  # Fired when the user double-clicks on an element.
  #
  ONDBLCLICK = 0x00002

  #
  # Fired when an image encounters an error.
  #
  ONERROR = 0x10000

  #
  # Fired when an element receives keyboard focus.
  #
  ONFOCUS = 0x00800

  #
  # Fired when the user depresses a key.
  #
  ONKEYDOWN = 0x00080

  #
  # Fired when the a character is generated from a keypress (either directly or
  # through auto-repeat).
  #
  ONKEYPRESS = 0x00100

  #
  # Fired when the user releases a key.
  #
  ONKEYUP = 0x00200

  #
  # Fired when an element (normally an IMG) finishes loading.
  #
  ONLOAD = 0x08000

  #
  # Fired when an element that has mouse capture loses it.
  #
  ONLOSECAPTURE = 0x02000

  #
  # Fired when the user depresses a mouse button over an element.
  #
  ONMOUSEDOWN = 0x00004

  #
  # Fired when the mouse is moved within an element's area.
  # 
  ONMOUSEMOVE = 0x00040

  #
  # Fired when the mouse is moved out of an element's area.
  #
  ONMOUSEOUT = 0x00020

  #
  # Fired when the mouse is moved into an element's area.
  #
  ONMOUSEOVER = 0x00010

  #
  # Fired when the user releases a mouse button over an element.
  #
  ONMOUSEUP = 0x00008

  #
  # Fired when the user scrolls the mouse wheel over an element.
  #
  ONMOUSEWHEEL = 0x20000

  #
  # Fired when a scrollable element's scroll offset changes.
  #
  ONSCROLL = 0x04000

  #
  # A bit-mask covering both focus events (focus and blur).
  #
  FOCUSEVENTS = ONFOCUS | ONBLUR

  #
  # A bit-mask covering all keyboard events (down, up, and press).
  #
  KEYEVENTS = ONKEYDOWN | ONKEYPRESS | ONKEYUP

  #
  # A bit-mask covering all mouse events (down, up, move, over, and out), but
  # not click, dblclick, or wheel events.
  #
  MOUSEEVENTS = ONMOUSEDOWN | ONMOUSEUP | ONMOUSEMOVE | ONMOUSEOVER | ONMOUSEOUT

  def cancelBubble(cancel)
    `#<self>.cancelBubble = #<cancel>; return #<self>`
  end

  def getAltKey
    `return #<self>.altKey`
  end

  def getButton
    `return #<self>.button`
  end

  def getClientX
    `return #<self>.clientX`
  end

  def getClientY
    `return #<self>.clientY`
  end

  def getCtrlKey
    `return #<self>.ctrlKey`
  end

  def getKeyCode
    `return #<self>.which || #<self>.keyCode`
  end

  def getMetaKey
    `return !!#<self>.getMetaKey`
  end

  def getRepeat
    `return #<self>.repeat`
  end

  def getScreenX
    `return #<self>.screenX`
  end

  def getScreenY
    `return #<self>.screenY`
  end

  def getShiftKey
    `return #<self>.shiftKey`
  end

  def getType
    `return #<self>.type`
  end

  def getTypeInt
    `switch (#<self>.type) {
      case "blur": return 0x01000;
      case "change": return 0x00400;
      case "click": return 0x00001;
      case "dblclick": return 0x00002;
      case "focus": return 0x00800;
      case "keydown": return 0x00080;
      case "keypress": return 0x00100;
      case "keyup": return 0x00200;
      case "load": return 0x08000;
      case "losecapture": return 0x02000;
      case "mousedown": return 0x00004;
      case "mousemove": return 0x00040;
      case "mouseout": return 0x00020;
      case "mouseover": return 0x00010;
      case "mouseup": return 0x00008;
      case "scroll": return 0x04000;
      case "error": return 0x10000;
      case "mousewheel": return 0x20000;
      case "DOMMouseScroll": return 0x20000;
    }`
  end

  def setKeyCode(key)
    `#<self>.keyCode = #<key>; return #<self>`
  end
end

class Listener
  def onBrowserEvent(ev)
    Element['root'].appendChild(Element.createDiv.setInnerText(ev.getType))
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
    `return #<elem>.style.display != 'none'`
  end

  def setVisible(visible=true, elem=@element)
    `#<elem>.style.display = #<visible> ? '' : 'none'; return #<self>`
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
    Element.__init

    div = Element.createDiv
    div.setInnerText('click')
    div.sinkEvents(Event::MOUSEEVENTS)
    div.setEventListener(Listener.new)
    div.setAttribute('title', 'heyja')

    Element['root'].appendChild(div)
  end
end
