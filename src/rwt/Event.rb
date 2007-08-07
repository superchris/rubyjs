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
end
