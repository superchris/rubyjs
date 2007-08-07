#--
# Copyright (c) 2007 by Michael Neumann (mneumann@ntecs.de)
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License"); you may not
# use this file except in compliance with the License. You may obtain a copy of
# the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations under
# the License.
#++

#
# Differences towards the GWT Java version.
#
# Missing methods:
#
#   * addEventPreview
#   * compare
#   * eventCancelBubble(evt, cancel)
#   * insertListItem
#   * releaseCapture
#   * removeEventPreview
#   * scrollIntoView
#   * setCapture
#   * previewEvent
#   * dispatchEventAndCatch
#   * dispatchEventImpl
#
# Removed methods (because they are depreciated):
#
#   * getAttribute
#   * getBooleanAttribute
#   * getIntAttribute
#   * setAttribute
#   * setBooleanAttribute
#   * setIntAttribute
#
# Modified/Renamed methods:
#
#   * setIntStyleAttribute removed. use setStyleAttribute instead
#   * toString -> elementToString
#
# Added/New methods:
#
#   * createInput
#
# Strange methods:
#
#   * eventGetToElement vs. eventGetFromElement
#


#
# This class provides a set of static methods that allow you to manipulate the
# browser's Document Object Model (DOM). It contains methods for manipulating
# both +Element+ elements and +Event+ events.
#
class DOM

  #
  # Appends one element to another's list of children.
  # 
  # parent:: the parent element
  # child::  its new child
  #
  def self.appendChild(parent, child)
    `#<parent>.appendChild(#<child>); return #<nil>`
  end

  #
  # Creates an HTML A element.
  # 
  # return:: the newly-created element
  # 
  def self.createAnchor
    createElement("A")
  end

  #
  # Creates an HTML BUTTON element.
  # 
  # return:: the newly-created element
  #
  def self.createButton()
    createElement("button")
  end

  #
  # Creates an HTML CAPTION element.
  # 
  # return:: the newly-created element
  # 
  def self.createCaption
    createElement("caption")
  end 

  #
  # Creates an HTML COL element.
  # 
  # return:: the newly-created element
  #
  def self.createCol
    createElement("col")
  end

  #
  # Creates an HTML COLGROUP element.
  #
  # return:: the newly-created element
  #
  def self.createColGroup
    createElement("colgroup")
  end

  #
  # Creates an HTML DIV element.
  #
  # return:: the newly-created element
  #
  def self.createDiv
    createElement("div")
  end

  #
  # Creates an HTML element.
  #
  # tagName:: the HTML tag of the element to be created
  # return::  the newly-created element
  #
  def self.createElement(tagName)
    `return document.createElement(#<tagName>)`
  end

  #
  # Creates an HTML INPUT element.
  #
  # type::    the value of the type attribute
  # return::  the newly-created element
  #
  def self.createInput(type) `
    var e = document.createElement("INPUT");
    e.type = #<type>;
    return e`
  end

  #
  # Creates an HTML FIELDSET element.
  #
  # return:: the newly-created element
  #
  def self.createFieldSet
    createElement("fieldset")
  end

  #
  # Creates an HTML FORM element.
  #
  # return:: the newly-created element
  #
  def self.createForm
    createElement("form")
  end

  #
  # Creates an HTML IFRAME element.
  #
  # return:: the newly-created element
  #
  def self.createIFrame
    createElement("iframe")
  end

  #
  # Creates an HTML IMG element.
  #
  # return:: the newly-created element
  #
  def self.createImg
    createElement("img")
  end

  #
  # Creates an HTML INPUT type='CHECK' element.
  #
  # return:: the newly-created element
  #
  def self.createInputCheck
    createInput("checkbox")
  end

  #
  # Creates an HTML INPUT type='PASSWORD' element.
  #
  # return:: the newly-created element
  #
  def self.createInputPassword
    createInput("password")
  end

  #
  # Creates an HTML INPUT type='RADIO' element.
  #
  # group::  the name of the group with which this radio button will be
  #          associated
  # return:: the newly-created element
  #
  def self.createInputRadio(group) `
    var e = document.createElement("INPUT");
    e.type = 'radio';
    e.name = #<group>;
    return e`
  end

  #
  # Creates an HTML INPUT type='TEXT' element.
  #
  # return:: the newly-created element
  #
  def self.createInputText
    createInput("text")
  end

  #
  # Creates an HTML LABEL element.
  #
  # return:: the newly-created element
  #
  def self.createLabel
    createElement("label")
  end

  #
  # Creates an HTML LEGEND element.
  #
  # return:: the newly-created element
  #
  def self.createLegend
    createElement("legend")
  end

  #
  # Creates an HTML OPTIONS element.
  #
  # return:: the newly-created element
  #
  def self.createOptions
    createElement("options")
  end

  #
  # Creates an HTML SELECT element.
  #
  # multiple:: single-selction (+false+) or multi-select (+true+)
  #            element
  # return::   the newly-created element
  #
  def self.createSelect(multiple=false)
    select = createElement("select")
    setElementPropertyBoolean(select, "multiple", true) if multiple
    return select
  end

  #
  # Creates an HTML SPAN element.
  #
  # return:: the newly-created element
  #
  def self.createSpan
    createElement("span")
  end

  #
  # Creates an HTML TABLE element.
  #
  # return:: the newly-created element
  #
  def self.createTable
    createElement("table")
  end

  #
  # Creates an HTML TBODY element.
  #
  # return:: the newly-created element
  #
  def self.createTBody
    createElement("tbody")
  end

  #
  # Creates an HTML TD element.
  #
  # return:: the newly-created element
  #
  def self.createTD
    createElement("td")
  end

  #
  # Creates an HTML TEXTAREA element.
  #
  # return:: the newly-created element
  #
  def self.createTextArea
    createElement("textarea")
  end

  #
  # Creates an HTML TFOOT element.
  #
  # return:: the newly-created element
  #
  def self.createTFoot
    createElement("tfoot")
  end

  #
  # Creates an HTML TH element.
  #
  # return:: the newly-created element
  #
  def self.createTH
    createElement("th")
  end

  #
  # Creates an HTML THEAD element.
  #
  # return:: the newly-created element
  #
  def self.createTHead
    createElement("thead")
  end

  #
  # Creates an HTML TR element.
  #
  # return:: the newly-created element
  #
  def self.createTR
    createElement("tr")
  end

  #
  # Gets whether the ALT key was depressed when the given event occurred.
  #
  # evt::    the event to be tested
  # return:: +true+ if ALT was depressed when the event occurred
  #
  def self.eventGetAltKey(evt)
    `return #<evt>.altKey`
  end

  #
  # Gets the mouse buttons that were depressed when the given event occurred.
  #
  # evt::    the event to be tested
  # return:: a bit-field, defined by +Event::BUTTON_LEFT+,
  #          +Event::BUTTON_MIDDLE+ and +Event::BUTTON_RIGHT+
  #
  def self.eventGetButton(evt)
    `return #<evt>.button`
  end

  #
  # Gets the mouse x-position within the browser window's client area.
  #
  # evt::    the event to be tested
  # return:: the mouse x-position
  #
  def self.eventGetClientX(evt)
    `return #<evt>.clientX`
  end

  #
  # Gets the mouse y-position within the browser window's client area.
  #
  # evt::    the event to be tested
  # return:: the mouse y-position
  #
  def self.eventGetClientY(evt)
    `return #<evt>.clientY`
  end

  #
  # Gets whether the CTRL key was depressed when the given event occurred.
  #
  # evt::    the event to be tested
  # return:: +true+ if CTRL was depressed when the event occurred
  #
  def self.eventGetCtrlKey(evt)
    `return #<evt>.ctrlKey`
  end

  #
  # Gets the element from which the mouse pointer was moved (only valid for
  # +Event::ONMOUSEOVER+).
  #
  # evt::    the event to be tested
  # return:: the element from which the mouse pointer was moved
  #
  def self.eventGetFromElement(evt)
    # Standard browsers use relatedTarget rather than fromElement.
    `return #<evt>.relatedTarget || #<nil>`
  end

  #
  # Gets the key code associated with this event.
  #
  # For +Event::ONKEYPRESS+, this method returns the Unicode value of the
  # character generated. For +Event::ONKEYDOWN+ and +Event::ONKEYUP+,
  # it returns the code associated with the physical key.
  #
  # evt::    the event to be tested
  # return:: the Unicode character or key code.
  #
  def self.eventGetKeyCode(evt) `
    // +which+ gives the right key value, except when it doesnt -- in which
    // case, +keyCode+ gives the right value on all browsers.
    return #<evt>.which || #<evt>.keyCode`
  end

  #
  # Gets whether the META key was depressed when the given event occurred.
  #
  # evt::    the event to be tested
  # return:: +true+ if META was depressed when the event occurred
  #
  def self.eventGetMetaKey(evt)
    `return !!#<evt>.getMetaKey`
  end

  #
  # Gets the velocity of the mouse wheel associated with the event along the
  # Y axis.
  #
  # The velocity of the event is an artifical measurement for relative
  # comparisons of wheel activity.  It is affected by some non-browser
  # factors, including choice of input hardware and mouse acceleration
  # settings.  The sign of the velocity measurement agrees with the screen
  # coordinate system; negative values are towards the origin and positive
  # values are away from the origin.  Standard scrolling speed is approximately
  # ten units per event.
  #
  # evt::    the event to be examined.
  # return:: The velocity of the mouse wheel.
  #
  def self.eventGetMouseWheelVelocityY(evt)
    # FIXME
  end

  #
  # Gets the key-repeat state of this event.
  #
  # evt::    the event to be tested
  # return:: +true+ if this key event was an auto-repeat
  #
  def self.eventGetRepeat(evt)
    `return #<evt>.repeat`
  end

  #
  # Gets the mouse x-position on the user's display.
  #
  # evt::    the event to be tested
  # return:: the mouse x-position
  #
  def self.eventGetScreenX(evt)
    `return #<evt>.screenX`
  end

  #
  # Gets the mouse y-position on the user's display.
  #
  # evt::    the event to be tested
  # return:: the mouse y-position
  #
  def self.eventGetScreenY(evt)
    `return #<evt>.screenY`
  end

  #
  # Gets whether the shift key was depressed when the given event occurred.
  #
  # evt::    the event to be tested
  # return:: +true+ if shift was depressed when the event occurred
  #
  def self.eventGetShiftKey(evt)
    `return #<evt>.shiftKey`
  end

  #
  # Returns the element that was the actual target of the given event.
  #
  # evt::    the event to be tested
  # return:: the target element
  #
  def self.eventGetTarget(evt)
    `return #<evt>.target || #<nil>`
  end

  #
  # Gets the element to which the mouse pointer was moved (only valid for
  # +Event::ONMOUSEOUT+).
  #
  # evt::    the event to be tested
  # return:: the element to which the mouse pointer was moved
  #
  def self.eventGetToElement(evt)
    # Standard browsers use relatedTarget rather than toElement.
    `return #<evt>.relatedTarget || #<nil>`
  end

  #
  # Gets the enumerated type of this event (as defined in +Event+).
  #
  # evt::    the event to be tested
  # return:: the event's enumerated type
  #
  def self.eventGetType(evt) `
    switch (#<evt>.type) {
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

  #
  # Gets the type of the given event as a string.
  #
  # evt::    the event to be tested
  # return:: the event's type name
  #
  def self.eventGetTypeString(evt)
    `return #<evt>.type`
  end

  #
  # Prevents the browser from taking its default action for the given event.
  #
  # evt:: the event whose default action is to be prevented
  #
  def self.eventPreventDefault(evt)
    `#<evt>.preventDefault(); return #<nil>`
  end

  #
  # Sets the key code associated with the given keyboard event.
  #
  # evt:: the event whose key code is to be set
  # key:: the new key code
  #
  def self.eventSetKeyCode(evt, key)
    `#<evt>.keyCode = #<key>; return #<nil>`
  end

  #
  # Returns a stringized version of the event. This string is for debugging
  # purposes and will NOT be consistent on different browsers.
  #
  # evt::    the event to stringize
  # return:: a string form of the event
  #
  def self.eventToString(evt)
    `return #<evt>.toString()`
  end

  #
  # Gets an element's absolute left coordinate in the document's coordinate
  # system.
  #
  # elem::   the element to be measured
  # return:: the element's absolute left coordinate
  #
  def self.getAbsoluteLeft(elem) `
    var left = 0;
    var curr = #<elem>;
    // This intentionally excludes body which has a null offsetParent.    
    while (curr.offsetParent) {
      left -= curr.scrollLeft;
      curr = curr.parentNode;
    }
    while (#<elem>) {
      left += #<elem>.offsetLeft;
      #<elem> = #<elem>.offsetParent;
    }
    return left`
  end

  #
  # Gets an element's absolute top coordinate in the document's coordinate
  # system.
  #
  # elem::   the element to be measured
  # return:: the element's absolute top coordinate
  #
  def self.getAbsoluteTop(elem) `
    var top = 0;
    var curr = #<elem>;
    // This intentionally excludes body which has a null offsetParent.    
    while (curr.offsetParent) {
      top -= curr.scrollTop;
      curr = curr.parentNode;
    }
    while (#<elem>) {
      top += #<elem>.offsetTop;
      #<elem> = #<elem>.offsetParent;
    }
    return top`
  end

  #
  # Gets the element that currently has mouse capture.
  #
  # return:: a handle to the capture element, or +nil+ if none exists
  #
  def self.getCaptureElement
    #return sCaptureElem;
    #FIXME
  end

  #
  # Gets an element's n-th child element.
  #
  # parent:: the element whose child is to be retrieved
  # index::  the index of the child element
  # return:: the n-th child element
  #
  def self.getChild(parent, index) `
    var count = 0, child = #<parent>.firstChild;
    while (child) {
      var next = child.nextSibling;
      if (child.nodeType == 1) {
        if (#<index> == count)
          return child;
        ++count;
      }
      child = next;
    }

    return #<nil>`
  end

  #
  # Gets the number of child elements present in a given parent element.
  #
  # parent:: the element whose children are to be counted
  # return:: the number of children
  #
  def self.getChildCount(parent) `
    var count = 0, child = #<parent>.firstChild;
    while (child) {
      if (child.nodeType == 1)
        ++count;
      child = child.nextSibling;
    }
    return count`
  end

  #
  # Gets the index of a given child element within its parent.
  #
  # parent:: the parent element
  # child::  the child element
  # return:: the child's index within its parent, or <tt>-1</tt> if it is
  #          not a child of the given parent
  #
  def self.getChildIndex(parent, child) `
    var count = 0, child = #<parent>.firstChild;
    while (child) {
      if (child == #<child>)
        return count;
      if (child.nodeType == 1)
        ++count;
      child = child.nextSibling;
    }

    return -1`
  end

  #
  # Gets the named attribute from the element.
  #
  # elem::   the element whose property is to be retrieved
  # attr::   the name of the attribute
  # return:: the value of the attribute
  #
  def self.getElementAttribute(elem, attr) `
    var ret = #<elem>.getAttribute(#<attr>);
    return (ret == null) ? #<nil> : ret`
  end

  #
  # Gets the element associated with the given unique id within the entire
  # document.
  #
  # id::     the id whose associated element is to be retrieved
  # return:: the associated element, or +nil+ if none is found
  #
  def self.getElementById(id)
    `return document.getElementById(#<id>) || #<nil>`
  end

  #
  # Gets any named property from an element, as a string.
  #
  # elem::   the element whose property is to be retrieved
  # prop::   the name of the property
  # return:: the property's value
  #
  def self.getElementProperty(elem, prop) `
    var ret = #<elem>[#<prop>];
    return (ret == null) ? #<nil> : String(ret)`
  end

  #
  # Gets any named property from an element, as a boolean.
  #
  # param::  elem the element whose property is to be retrieved
  # param::  prop the name of the property
  # return:: the property's value as a boolean
  #
  def self.getElementPropertyBoolean(elem, prop)
    `return !!#<elem>[#<prop>]`
  end

  #
  # Gets any named property from an element, as an int.
  #
  # elem::   the element whose property is to be retrieved
  # prop::   the name of the property
  # return:: the property's value as an int
  #
  def self.getElementPropertyInt(elem, prop) `
    var i = parseInt(#<elem>[#<prop>]);
    return ((!i) ? 0 : i)`
  end

  #
  # Gets the current set of events sunk by a given element.
  #
  # elem::   the element whose events are to be retrieved
  # return:: a bitfield describing the events sunk on this element (its possible
  #          values are described in +Event+)
  #
  def self.getEventsSunk(elem)
    `return #<elem>.#<attr:eventBits> || 0`
  end

  #
  # Gets the first child element of the given element.
  #
  # elem::   the element whose child is to be retrieved
  # return:: the child element
  #
  def self.getFirstChild(elem) `
    var child = #<elem>.firstChild;
    while (child && child.nodeType != 1)
      child = child.nextSibling;
    return child || #<nil>`
  end

  #
  # Gets the src attribute of an img element. This method is paired with
  # #setImgSrc so that it always returns the correct url.
  #
  # img::    a non-nil img whose src attribute is to be read.
  # return:: the src url of the img
  #
  def self.getImgSrc(img)
    `return #<img>.src`
  end

  #
  # Gets an HTML representation (as String) of an element's children.
  #
  # elem::   the element whose HTML is to be retrieved
  # return:: the HTML representation of the element's children
  #
  def self.getInnerHTML(elem) `
    var ret = #<elem>.innerHTML;
    return (ret == null) ? #<nil> : ret`
  end

  #
  # Gets the text contained within an element. If the element has child
  # elements, only the text between them will be retrieved.
  #
  # elem::   the element whose inner text is to be retrieved
  # return:: the text inside this element
  #
  def self.getInnerText(elem) `
    // To mimic IEs +innerText+ property in the W3C DOM, we need to recursively
    // concatenate all child text nodes (depth first).
    var text = '', child = #<elem>.firstChild;
    while (child) {
      // 1 == Element node
      if (child.nodeType == 1) {
        text += this.#<m:getInnerText>(#<nil>, child);
      } else if (child.nodeValue) {
        text += child.nodeValue;
      }
      child = child.nextSibling;
    }
    return text`
  end

  #
  # Gets an integer attribute on a given element's style.
  #
  # elem::   the element whose style attribute is to be retrieved
  # attr::   the name of the attribute to be retrieved
  # return:: the style attribute's value as an integer
  #
  def self.getIntStyleAttribute(elem, attr) `
    var i = parseInt(#<elem>.style[#<attr>]);
    return ((!i) ? 0 : i)`
  end

  #
  # Gets an element's next sibling element.
  #
  # elem::   the element whose sibling is to be retrieved
  # return:: the sibling element
  #
  def self.getNextSibling(elem) `
    var sib = #<elem>.nextSibling;
    while (sib && sib.nodeType != 1)
      sib = sib.nextSibling;
    return sib || #<nil>`
  end

  #
  # Gets an element's parent element.
  #
  # elem::   the element whose parent is to be retrieved
  # return:: the parent element
  #
  def self.getParent(elem) `
    var parent = #<elem>.parentNode;
    if(parent == null) {
      return #<nil>;
    }
    if (parent.nodeType != 1)
      parent = null;
    return parent || #<nil>`
  end

  #
  # Gets an attribute of the given element's style.
  #
  # elem::   the element whose style attribute is to be retrieved
  # attr::   the name of the style attribute to be retrieved
  # return:: the style attribute's value
  #
  def self.getStyleAttribute(elem, attr) `
    var ret = #<elem>.style[#<attr>];
    return (ret == null) ? #<nil> : ret`
  end

  #
  # Inserts an element as a child of the given parent element, before another
  # child of that parent.
  # 
  # parent:: the parent element
  # child::  the child element to add to +parent+
  # before:: an existing child element of +parent+ before
  #          which +child+ will be inserted
  #
  def self.insertBefore(parent, child, before)
    `#<parent>.insertBefore(#<child>, #<before>); return #<nil>`
  end

  #
  # Inserts an element as a child of the given parent element.
  #
  # parent:: the parent element
  # child::  the child element to add to +parent+
  # index::  the index before which the child will be inserted (any value
  #          greater than the number of existing children will cause the child
  #          to be appended)
  #
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

    #<parent>.insertBefore(#<child>, before);
    return #<nil>`
  end

  #
  # Determine whether one element is equal to, or the child of, another.
  # 
  # parent:: the potential parent element
  # child::  the potential child element
  # return:: +true+ if the relationship holds
  #
  # See #compare.
  #
  def self.isOrHasChild(parent, child) `
    while (#<child>) {
      if (#<parent> == #<child>) {
        return true;
      }
      #<child> = #<child>.parentNode;
      if (#<child> && (#<child>.nodeType != 1)) {
        #<child> = null;
      }
    }
    return false`
  end

  #
  # Removes a child element from the given parent element.
  #
  # parent:: the parent element
  # child::  the child element to be removed
  #
  def self.removeChild(parent, child)
    `#<parent>.removeChild(#<child>); return #<nil>`
  end

  #
  # Removes the named attribute from the given element.
  #
  # elem:: the element whose attribute is to be removed
  # attr:: the name of the element to remove
  #
  def self.removeElementAttribute(elem, attr)
    `#<elem>.removeAttribute(#<attr>); return #<nil>`
  end

  #
  # Sets an attribute on a given element.
  #
  # elem::  element whose attribute is to be set
  # attr::  the name of the attribute
  # value:: the value to which the attribute should be set
  #
  def self.setElementAttribute(elem, attr, value)
    `#<elem>.setAttribute(#<attr>, #<value>); return #<nil>`
  end

  #
  # Sets a property on the given element.
  #
  # elem::  the element whose property is to be set
  # prop::  the name of the property to be set
  # value:: the new property value
  #
  def self.setElementProperty(elem, prop, value)
    `#<elem>[#<prop>] = #<value>; return #<nil>`
  end

  #
  # Sets a boolean property on the given element.
  #
  # elem::  the element whose property is to be set
  # prop::  the name of the property to be set
  # value:: the new property value as a boolean
  #
  def self.setElementPropertyBoolean(elem, prop, value)
    `#<elem>[#<prop>] = #<value>; return #<nil>`
  end

  #
  # Sets an int property on the given element.
  #
  # elem::  the element whose property is to be set
  # prop::  the name of the property to be set
  # value:: the new property value as an int
  #
  def self.setElementPropertyInt(elem, prop, value)
    `#<elem>[#<prop>] = #<value>; return #<nil>`
  end

  #
  # Sets the +EventListener+ to receive events for the given element.
  # Only one such listener may exist for a single element.
  #
  # elem::     the element whose listener is to be set
  # listener:: the listener to receive events
  #
  def self.setEventListener(elem, listener)
    `#<elem>.#<attr:listener> = (#<listener> == #<nil>) ? null : #<listener>; return #<nil>`
  end

  #
  # Sets the src attribute of an img element. This method ensures that imgs
  # only ever have their contents requested one single time from the server.
  #
  # img:: a non-nil img whose src attribute will be set.
  # src:: a non-nil url for the img
  #
  def self.setImgSrc(img, src)
    `#<img>.src = #<src>; return #<nil>`
  end

  #
  # Sets the HTML contained within an element.
  #
  # elem:: the element whose inner HTML is to be set
  # html:: the new html
  #
  def self.setInnerHTML(elem, html)
    html ||= ''
    `#<elem>.innerHTML = #<html>; return #<nil>` # TODO: "return" needed?
  end

  #
  # Sets the text contained within an element. If the element already has
  # children, they will be destroyed.
  #
  # elem:: the element whose inner text is to be set
  # text:: the new text
  #
  def self.setInnerText(elem, text) `
    // Remove all children first.
    while (#<elem>.firstChild) {
      #<elem>.removeChild(#<elem>.firstChild);
    }
    // Add a new text node.
    if (#<text> != #<nil>) {
      #<elem>.appendChild(document.createTextNode(#<text>));
    }
    return #<nil>`
  end

  #
  # Sets the option text of the given select object.
  #
  # select:: the select object whose option text is being set
  # text::   the text to set
  # index::  the index of the option whose text should be set
  #
  def self.setOptionText(select, text, index) `
    // IE doesnt properly update the screen when you use
    // setAttribute(+option+, text), so we instead directly assign to the
    // +option+ property, which works correctly on all browsers.
    var option = #<select>.options[#<index>];
    option.text = #<text>;
    return #<nil>`
  end

  #
  # Sets an attribute on the given element's style.
  #
  # elem::  the element whose style attribute is to be set
  # attr::  the name of the style attribute to be set
  # value:: the style attribute's new value
  #
  def self.setStyleAttribute(elem, attr, value)
    `#<elem>.style[#<attr>] = #<value>; return #<nil>`
  end

  #
  # Sets the current set of events sunk by a given element. These events will
  # be fired to the nearest +EventListener+ specified on any of the
  # element's parents.
  #
  # elem::      the element whose events are to be retrieved
  # eventBits:: a bitfield describing the events sunk on this element (its
  #             possible values are described in +Event+)
  #
  def self.sinkEvents(elem, eventBits) `
    #<elem>.#<attr:eventBits> = #<eventBits>;

    #<elem>.onclick       = (#<eventBits> & 0x00001) ? window.#<attr:dispatchEvent> : null;
    #<elem>.ondblclick    = (#<eventBits> & 0x00002) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onmousedown   = (#<eventBits> & 0x00004) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onmouseup     = (#<eventBits> & 0x00008) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onmouseover   = (#<eventBits> & 0x00010) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onmouseout    = (#<eventBits> & 0x00020) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onmousemove   = (#<eventBits> & 0x00040) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onkeydown     = (#<eventBits> & 0x00080) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onkeypress    = (#<eventBits> & 0x00100) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onkeyup       = (#<eventBits> & 0x00200) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onchange      = (#<eventBits> & 0x00400) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onfocus       = (#<eventBits> & 0x00800) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onblur        = (#<eventBits> & 0x01000) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onlosecapture = (#<eventBits> & 0x02000) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onscroll      = (#<eventBits> & 0x04000) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onload        = (#<eventBits> & 0x08000) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onerror       = (#<eventBits> & 0x10000) ? window.#<attr:dispatchEvent> : null;
    #<elem>.onmousewheel  = (#<eventBits> & 0x20000) ? window.#<attr:dispatchEvent> : null;
    
    return #<nil>`
  end

  # 
  # Returns a stringized version of the element. This string is for debugging
  # purposes and will NOT be consistent on different browsers.
  # 
  # elem::   the element to stringize
  # return:: a string form of the element
  #
  def self.elementToString(elem)
    `return #<elem>.outerHTML`
  end

  #
  # This method is called directly by native code when any event is fired.
  #
  # evt::      the handle to the event being fired.
  # elem::     the handle to the element that received the event.
  # listener:: the listener associated with the element that received the
  #            event.
  #
  def self.dispatchEvent(evt, elem, listener)
    listener.onBrowserEvent(evt) if listener
    # FIXME
    #UncaughtExceptionHandler handler = GWT.getUncaughtExceptionHandler();
    #if (handler != null) {
    #  dispatchEventAndCatch(evt, elem, listener, handler);
    #} else {
    #  dispatchEventImpl(evt, elem, listener);
    #}
  end

  def self.__init() `
    // assign event dispatcher
    window.#<attr:dispatchEvent> = function(evt) {
      #<self>.#<m:dispatchEvent>(#<nil>, evt, this, this.#<attr:listener> || #<nil>);
   };`
  end

end # class DOM
