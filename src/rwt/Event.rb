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

class Event

  #-------------------------------------------------------------------
  # Constants
  #-------------------------------------------------------------------
 
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

  #-------------------------------------------------------------------
  # Keyboard related
  #-------------------------------------------------------------------
 
  #
  # Gets whether the ALT key was depressed when the given event occurred.
  #
  # evt::    the event to be tested
  # return:: +true+ if ALT was depressed when the event occurred
  #
  def self.getAltKey(evt)
    `return #<evt>.altKey`
  end

  #
  # Gets whether the CTRL key was depressed when the given event occurred.
  #
  # evt::    the event to be tested
  # return:: +true+ if CTRL was depressed when the event occurred
  #
  def self.getCtrlKey(evt)
    `return #<evt>.ctrlKey`
  end

  #
  # Gets whether the META key was depressed when the given event occurred.
  #
  # evt::    the event to be tested
  # return:: +true+ if META was depressed when the event occurred
  #
  def self.getMetaKey(evt)
    `return !!#<evt>.getMetaKey`
  end

  #
  # Gets whether the shift key was depressed when the given event occurred.
  #
  # evt::    the event to be tested
  # return:: +true+ if shift was depressed when the event occurred
  #
  def self.getShiftKey(evt)
    `return #<evt>.shiftKey`
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
  def self.getKeyCode(evt) 
    # 'which' gives the right key value, except when it doesnt -- in which
    # case, keyCode gives the right value on all browsers.
    `return #<evt>.which || #<evt>.keyCode`
  end

  #
  # Gets the key-repeat state of this event.
  #
  # evt::    the event to be tested
  # return:: +true+ if this key event was an auto-repeat
  #
  def self.getRepeat(evt)
    `return #<evt>.repeat`
  end

  #
  # Sets the key code associated with the given keyboard event.
  #
  # evt:: the event whose key code is to be set
  # key:: the new key code
  #
  def self.setKeyCode(evt, key)
    `#<evt>.keyCode = #<key>; return #<nil>`
  end

  #-------------------------------------------------------------------
  # Mouse related
  #-------------------------------------------------------------------
  
  #
  # Gets the mouse buttons that were depressed when the given event occurred.
  #
  # evt::    the event to be tested
  # return:: a bit-field, defined by +Event::BUTTON_LEFT+,
  #          +Event::BUTTON_MIDDLE+ and +Event::BUTTON_RIGHT+
  #
  def self.getButton(evt)
    `return #<evt>.button`
  end

  #
  # Gets the mouse x-position within the browser window's client area.
  #
  # evt::    the event to be tested
  # return:: the mouse x-position
  #
  def self.getClientX(evt)
    `return #<evt>.clientX`
  end

  #
  # Gets the mouse y-position within the browser window's client area.
  #
  # evt::    the event to be tested
  # return:: the mouse y-position
  #
  def self.getClientY(evt)
    `return #<evt>.clientY`
  end

  #
  # Gets the mouse x-position on the user's display.
  #
  # evt::    the event to be tested
  # return:: the mouse x-position
  #
  def self.getScreenX(evt)
    `return #<evt>.screenX`
  end

  #
  # Gets the mouse y-position on the user's display.
  #
  # evt::    the event to be tested
  # return:: the mouse y-position
  #
  def self.getScreenY(evt)
    `return #<evt>.screenY`
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
  def self.getMouseWheelVelocityY(evt)
    raise # FIXME
  end

  #-------------------------------------------------------------------
  # Misc
  #-------------------------------------------------------------------

  #
  # Returns the element that was the actual target of the given event.
  #
  # evt::    the event to be tested
  # return:: the target element
  #
  def self.getTarget(evt)
    `return #<evt>.target || #<nil>`
  end

  #
  # Gets the element from which the mouse pointer was moved (only valid for
  # +Event::ONMOUSEOVER+).
  #
  # evt::    the event to be tested
  # return:: the element from which the mouse pointer was moved
  #
  def self.getFromElement(evt)
    # Standard browsers use relatedTarget rather than fromElement.
    `return #<evt>.relatedTarget || #<nil>`
  end

  #
  # Gets the element to which the mouse pointer was moved (only valid for
  # +Event::ONMOUSEOUT+).
  #
  # evt::    the event to be tested
  # return:: the element to which the mouse pointer was moved
  #
  def self.getToElement(evt)
    # Standard browsers use relatedTarget rather than toElement.
    `return #<evt>.relatedTarget || #<nil>`
  end

  #
  # Gets the enumerated type of this event (as defined in +Event+).
  #
  # evt::    the event to be tested
  # return:: the event's enumerated type
  #
  def self.getType(evt) `
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
  def self.getTypeString(evt)
    `return #<evt>.type`
  end

  #
  # Prevents the browser from taking its default action for the given event.
  #
  # evt:: the event whose default action is to be prevented
  #
  def self.preventDefault(evt)
    `#<evt>.preventDefault(); return #<nil>`
  end

  #
  # Returns a stringized version of the event. This string is for debugging
  # purposes and will NOT be consistent on different browsers.
  #
  # evt::    the event to stringize
  # return:: a string form of the event
  #
  def self.toString(evt)
    `return #<evt>.toString()`
  end

  #-------------------------------------------------------------------
  # Setup
  #-------------------------------------------------------------------

  #
  # This method is called directly by native code when any event is fired.
  #
  # evt::      the handle to the event being fired.
  # elem::     the handle to the element that received the event.
  # listener:: the listener associated with the element that received the
  #            event.
  #
  def self.dispatch(evt, elem, listener)
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
    window.#<attr:dispatch> = function(evt) {
      #<self>.#<m:dispatch>(#<nil>, evt, this, this.#<attr:listener> || #<nil>);
   };`
  end

end
