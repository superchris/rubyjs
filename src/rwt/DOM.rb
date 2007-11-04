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

class DOM

  #-------------------------------------------------------------------
  # Element creation
  #-------------------------------------------------------------------
  
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
  # multiple:: +true+ if multiple selection of options is allowed
  #            (default +false+)
  # return::   the newly-created element
  #
  def self.createSelect(multiple=false)
    select = createElement("select")
    setProperty(select, "multiple", true) if multiple
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
  # Creates an HTML INPUT type='TEXT' element.
  #
  # return:: the newly-created element
  #
  def self.createInputText
    createInput("text")
  end

  #
  # Creates an HTML INPUT type='RADIO' element.
  #
  # name::   the name of the group with which this radio button will be
  #          associated
  # return:: the newly-created element
  #
  def self.createInputRadio(name) `
    var e = document.createElement("INPUT");
    e.type = 'radio';
    e.name = #<name>;
    return e`
  end

  #-------------------------------------------------------------------
  # DOM manipulation
  #-------------------------------------------------------------------

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
  # Removes a child element from the given parent element.
  #
  # parent:: the parent element
  # child::  the child element to be removed
  #
  def self.removeChild(parent, child)
    `#<parent>.removeChild(#<child>); return #<nil>`
  end

  #
  # Replaces +elem+ in the DOM tree with element +newElem+. 
  #
  # elem::    the element to be replaced
  # newElem:: the element that is used to replace +elem+ with.
  #
  def self.replace(elem, newElem) `
    var p = #<elem>.parentNode;
    if (!p) return;
    p.insertBefore(#<newElem>, #<elem>);
    p.removeChild(#<elem>);
    return #<nil>`
  end

  #-------------------------------------------------------------------
  # DOM navigation
  #-------------------------------------------------------------------
  
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
  # return:: the child's index within its parent, or +nil+ if it is
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

    return #<nil>`
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

  #-------------------------------------------------------------------
  # Event related
  #-------------------------------------------------------------------

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

    #<elem>.onclick       = (#<eventBits> & 0x00001) ? window.#<attr:dispatch> : null;
    #<elem>.ondblclick    = (#<eventBits> & 0x00002) ? window.#<attr:dispatch> : null;
    #<elem>.onmousedown   = (#<eventBits> & 0x00004) ? window.#<attr:dispatch> : null;
    #<elem>.onmouseup     = (#<eventBits> & 0x00008) ? window.#<attr:dispatch> : null;
    #<elem>.onmouseover   = (#<eventBits> & 0x00010) ? window.#<attr:dispatch> : null;
    #<elem>.onmouseout    = (#<eventBits> & 0x00020) ? window.#<attr:dispatch> : null;
    #<elem>.onmousemove   = (#<eventBits> & 0x00040) ? window.#<attr:dispatch> : null;
    #<elem>.onkeydown     = (#<eventBits> & 0x00080) ? window.#<attr:dispatch> : null;
    #<elem>.onkeypress    = (#<eventBits> & 0x00100) ? window.#<attr:dispatch> : null;
    #<elem>.onkeyup       = (#<eventBits> & 0x00200) ? window.#<attr:dispatch> : null;
    #<elem>.onchange      = (#<eventBits> & 0x00400) ? window.#<attr:dispatch> : null;
    #<elem>.onfocus       = (#<eventBits> & 0x00800) ? window.#<attr:dispatch> : null;
    #<elem>.onblur        = (#<eventBits> & 0x01000) ? window.#<attr:dispatch> : null;
    #<elem>.onlosecapture = (#<eventBits> & 0x02000) ? window.#<attr:dispatch> : null;
    #<elem>.onscroll      = (#<eventBits> & 0x04000) ? window.#<attr:dispatch> : null;
    #<elem>.onload        = (#<eventBits> & 0x08000) ? window.#<attr:dispatch> : null;
    #<elem>.onerror       = (#<eventBits> & 0x10000) ? window.#<attr:dispatch> : null;
    #<elem>.onmousewheel  = (#<eventBits> & 0x20000) ? window.#<attr:dispatch> : null;
    
    return #<nil>`
  end
  
  #-------------------------------------------------------------------
  # Attribute related
  #-------------------------------------------------------------------
  
  #
  # Gets the named attribute from the element.
  #
  # elem::   the element whose property is to be retrieved
  # attr::   the name of the attribute
  # return:: the value of the attribute
  #
  def self.getAttribute(elem, attr) `
    var ret = #<elem>.getAttribute(#<attr>);
    return (ret == null) ? #<nil> : ret`
  end

  #
  # Sets an attribute on a given element.
  #
  # elem::  element whose attribute is to be set
  # attr::  the name of the attribute
  # value:: the value to which the attribute should be set
  #
  def self.setAttribute(elem, attr, value)
    `#<elem>.setAttribute(#<attr>, #<value>); return #<nil>`
  end

  #
  # Removes the named attribute from the given element.
  #
  # elem:: the element whose attribute is to be removed
  # attr:: the name of the element to remove
  #
  def self.removeAttribute(elem, attr)
    `#<elem>.removeAttribute(#<attr>); return #<nil>`
  end

  #-------------------------------------------------------------------
  # Style Attribute related
  #-------------------------------------------------------------------
 
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
  # Gets an integer attribute on a given element's style.
  #
  # elem::   the element whose style attribute is to be retrieved
  # attr::   the name of the attribute to be retrieved
  # return:: the style attribute's value as an integer
  #
  def self.getStyleAttributeInt(elem, attr) `
    var i = parseInt(#<elem>.style[#<attr>]);
    return ((!i) ? 0 : i)`
  end
  
  #
  # Gets a boolean attribute on a given element's style.
  #
  # elem::   the element whose style attribute is to be retrieved
  # attr::   the name of the attribute to be retrieved
  # return:: the style attribute's value as a boolean
  #
  def self.getStyleAttributeBoolean(elem, attr)
    `return !!#<elem>.style[#<attr>]`
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

  #-------------------------------------------------------------------
  # Property related
  #-------------------------------------------------------------------
 
  #
  # Gets any named property from an element, as a string.
  #
  # elem::   the element whose property is to be retrieved
  # prop::   the name of the property
  # return:: the property's value
  #
  def self.getProperty(elem, prop) `
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
  def self.getPropertyBoolean(elem, prop)
    `return !!#<elem>[#<prop>]`
  end

  #
  # Gets any named property from an element, as an int.
  #
  # elem::   the element whose property is to be retrieved
  # prop::   the name of the property
  # return:: the property's value as an int
  #
  def self.getPropertyInt(elem, prop) `
    var i = parseInt(#<elem>[#<prop>]);
    return ((!i) ? 0 : i)`
  end

  #
  # Sets a property on the given element.
  #
  # elem::  the element whose property is to be set
  # prop::  the name of the property to be set
  # value:: the new property value
  #
  def self.setProperty(elem, prop, value)
    `#<elem>[#<prop>] = #<value>; return #<nil>`
  end

  #-------------------------------------------------------------------
  # Misc
  #-------------------------------------------------------------------

  # 
  # Compares two elements for equality (note that reference equality is not
  # sufficient to determine equality among elements on most browsers).
  # 
  # elem1::  the first element to be compared
  # elem2::  the second element to be compared
  # return:: +true+ if they are in fact the same element
  #
  # See #isOrHasChild.
  # 
  def self.compare(elem1, elem2) 
    `return (#<elem1> == #<elem2>)`
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
  def self.getCapture
    return @sCaptureElem
  end

  # 
  # Releases mouse capture on the given element. Calling this method has no
  # effect if the element does not currently have mouse capture.
  # 
  # elem:: the element to release capture
  #
  # See #setCapture.
  #
  def self.releaseCapture(elem)
    @sCaptureElem = nil if @sCaptureElem and compare(elem, @sCaptureElem)
   `if (#<elem> == window.#<attr:captureElem>) window.#<attr:captureElem> = null;`
   return nil
  end

  # 
  # Sets mouse-capture on the given element. This element will directly receive
  # all mouse events until {@link #releaseCapture(Element)} is called on it.
  # 
  # elem:: the element on which to set mouse capture
  #
  def self.setCapture(elem)
    @sCaptureElem = elem
    `window.#<attr:captureElem> = #<elem>;`
    return nil
  end

  #
  # Gets the src attribute of an img element. This method is paired with
  # #setImgSrc so that it always returns the correct url.
  #
  # img::    a non-nil img whose src attribute is to be read.
  # return:: the src url of the img
  #
  def self.getImgSrc(img) `
    var ret = #<img>.src;
    return (ret == null) ? #<nil> : ret`
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
  # Sets the HTML contained within an element.
  #
  # elem:: the element whose inner HTML is to be set
  # html:: the new html
  #
  def self.setInnerHTML(elem, html)
    html ||= ''
    `#<elem>.innerHTML = #<html>; return #<nil>`
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
    if (#<text> !== #<nil>) {
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
  def self.setOptionText(select, text, index) 
    # IE doesnt properly update the screen when you use
    # setAttribute('option', text), so we instead directly assign to the
    # 'option' property, which works correctly on all browsers.
    `var option = #<select>.options[#<index>];
    option.text = #<text>;
    return #<nil>`
  end

  # 
  # Returns a stringized version of the element. This string is for debugging
  # purposes and will NOT be consistent on different browsers.
  # 
  # elem::   the element to stringize
  # return:: a string form of the element
  #
  def self.toString(elem)
    `return #<elem>.outerHTML`
  end

  #
  # Checks whether the element is visible or not.
  #
  # elem::   the element to check for visibility
  # return:: +true+ if element is visible, +false+ otherwise
  #
  def self.isVisible(elem)
    `return (#<elem>.style.display != 'none')`
  end

  #
  # Shows or hides an element.
  #
  # elem::    the element to show/hide
  # visible:: if +true+ (default), show element, otherwise hide it
  #

  def self.setVisible(elem, visible=true)
    if visible
      `#<elem>.style.display = ''`
    else
      `#<elem>.style.display = 'none'`
    end
    return nil
  end

  #
  # Changes a DOM element's positioning to static.
  # 
  # elem:: the DOM element 
  #
  def self.changeToStaticPositioning(elem)
    setStyleAttribute(elem, "left", "");
    setStyleAttribute(elem, "top", "");
    setStyleAttribute(elem, "position", "static");
  end

  #
  # TODO: write documentation 
  #
  def self.setAbsolutePixelPosition(elem, left, top)
    setStyleAttribute(elem, "position", "absolute");
    setStyleAttribute(elem, "left", left + "px");
    setStyleAttribute(elem, "top", top + "px");
  end

  # 
  # Gets the height of the browser window's client area excluding the
  # scroll bar.
  # 
  # return:: the window's client height
  #
  def self.windowGetClientHeight
    `return document.body.clientHeight` 
  end

  #
  # Gets the width of the browser window's client area excluding the
  # vertical scroll bar.
  # 
  # return:: the window's client width
  # 
  def self.windowGetClientWidth
    `return document.body.clientWidth`
  end

  # 
  # Scrolls the given element into view.
  #
  # This method crawls up the DOM hierarchy, adjusting the scrollLeft and
  # scrollTop properties of each scrollable element to ensure that the
  # specified element is completely in view. It adjusts each scroll position by
  # the minimum amount necessary.
  # 
  # elem:: the element to be made visible
  #
  def self.scrollIntoView(elem) `
    var left = #<elem>.offsetLeft, top = #<elem>.offsetTop;
    var width = #<elem>.offsetWidth, height = #<elem>.offsetHeight;

    if (#<elem>.parentNode != #<elem>.offsetParent) {
      left -= #<elem>.parentNode.offsetLeft;
      top -= #<elem>.parentNode.offsetTop;
    }

    var cur = #<elem>.parentNode;
    while (cur && (cur.nodeType == 1)) {
      // body tags are implicitly scrollable
      if ((cur.style.overflow == 'auto') || (cur.style.overflow == 'scroll') ||
          (cur.tagName == 'BODY')) {
      
        if (left < cur.scrollLeft) {
          cur.scrollLeft = left;
        }
        if (left + width > cur.scrollLeft + cur.clientWidth) {
          cur.scrollLeft = (left + width) - cur.clientWidth;
        }
        if (top < cur.scrollTop) {
          cur.scrollTop = top;
        }
        if (top + height > cur.scrollTop + cur.clientHeight) {
          cur.scrollTop = (top + height) - cur.clientHeight;
        }
      }

      var offsetLeft = cur.offsetLeft, offsetTop = cur.offsetTop;
      if (cur.parentNode != cur.offsetParent) {
        offsetLeft -= cur.parentNode.offsetLeft;
        offsetTop -= cur.parentNode.offsetTop;
      }

      left += offsetLeft - cur.scrollLeft;
      top += offsetTop - cur.scrollTop;
      cur = cur.parentNode;
    }
    return #<nil>`
  end

end
