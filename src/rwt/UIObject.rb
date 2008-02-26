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
# The superclass for all user-interface objects. It simply wraps a DOM element,
# and cannot receive events. Most interesting user-interface classes derive
# from +Widget+.
# 
# == Styling With CSS
#
# All +UIObject+ objects can be styled using CSS. Style names that
# are specified programmatically in Ruby source are implicitly associated with
# CSS style rules. In terms of HTML and CSS, a RWT style name is the element's
# CSS "class". By convention, RWT style names are of the form
# <tt>[project]-[widget]</tt>.
# 
# For example, the +Button+ widget has the style name
# <tt>rwt-Button</tt>, meaning that within the +Button+
# constructor, the following call occurs:
#
#   setStyleName("rwt-Button")
# 
# A corresponding CSS style rule can then be written as follows:
# 
#   // Example of how you might choose to style a Button widget 
#   .rwt-Button {
#     background-color: yellow;
#     color: black;
#     font-size: 24pt;
#   }
# 
# Note the dot prefix in the CSS style rule. This syntax is called a CSS
# class selector.
# 
# == Style Name Specifics
#
# Every +UIObject+ has a <i>primary style name</i> that
# identifies the key CSS style rule that should always be applied to it. Use
# #setStyleName to specify an object's primary style name. In
# most cases, the primary style name is set in a widget's constructor and never
# changes again during execution. In the case that no primary style name is
# specified, it defaults to <tt>rwt-nostyle</tt>.
# 
# More complex styling behavior can be achieved by manipulating an object's
# <i>secondary style names</i>. Secondary style names can be added and removed
# using #addStyleName and #removeStyleName.
# The purpose of secondary style names is to associate a variety of CSS style
# rules over time as an object progresses through different visual states.
# 
# There is an important special formulation of secondary style names called
# <i>dependent style names</i>. A dependent style name is a secondary style
# name prefixed with the primary style name of the widget itself. See
# #addStyleName for details.
#
class UIObject
  
  STYLE_EMPTY = "rwt-nostyle"

  #-------------------------------------------------------------------
  # Style-name related
  #-------------------------------------------------------------------
 
  #
  # Gets the primary style name associated with the object.
  # 
  # return:: the object's primary style name
  #
  # See #setStyleName, #addStyleName, #removeStyleName.
  #
  def getStyleName
    styleNameHelper(MODE_GET)
  end

  #
  # Sets the object's primary style name and updates all dependent style names.
  # 
  # style:: the new primary style name
  #
  # See #addStyleName, #removeStyleName
  #
  def setStyleName(style)
    styleNameHelper(MODE_SET, style)
  end

  # 
  # Adds a secondary or dependent style name to this object. A secondary style
  # name is an additional style name that is, in HTML/CSS terms, included as a
  # space-separated token in the value of the CSS +class+ attribute for this 
  # object's root element.
  # 
  # The most important use for this method is to add a special kind of
  # secondary style name called a <i>dependent style name</i>. To add a
  # dependent style name, prefix the 'style' argument with the result of
  # +getStyleName+. For example, suppose the primary style name is
  # <tt>rwt-TextBox</tt>. If the following method is called as
  # <tt>obj.setReadOnly(true)</tt>:
  # 
  #   def setReadOnly(readOnly=true)
  #     # Create a dependent style name.
  #     readOnlyStyle = getStyleName() + "-readonly"
  #      
  #     @isReadOnlyMode = readOnly
  #     if readOnly
  #       addStyleName(readOnlyStyle)
  #     else
  #       removeStyleName(readOnlyStyle)
  #     end
  #   end
  # 
  # then both of the CSS style rules below will be applied:
  # 
  #   // This rule is based on the primary style name and is always active.
  #   .rwt-TextBox {
  #     font-size: 12pt;
  #   }
  #    
  #   // This rule is based on a dependent style name that is only active
  #   // when the widget has called addStyleName(getStyleName() + "-readonly"). 
  #   .gwt-TextBox-readonly {
  #     background-color: lightgrey;
  #     border: none;
  #   }
  # 
  # Dependent style names are powerful because they are automatically updated
  # whenever the primary style name changes. Continuing with the example above,
  # if the primary style name changed due to the following call:
  #
  #   setStyleName("my-TextThingy")
  # 
  # then the object would be re-associated with style rules below rather than
  # those above:
  # 
  #   .my-TextThingy {
  #     font-size: 12pt;
  #   }
  #    
  #   .my-TextThingy-readonly {
  #     background-color: lightgrey;
  #     border: none;
  #   }
  # 
  # Secondary style names that are not dependent style names are not
  # automatically updated when the primary style name changes.
  # 
  # style:: the secondary style name to be added
  #
  # See UIObject, #removeStyleName
  #
  def addStyleName(style)
    styleNameHelper(MODE_ADD, style)
  end
  
  #
  # Removes a secondary style name.
  # 
  # style:: the secondary style name to be removed
  #
  # See #addStyleName.
  #
  def removeStyleName(style)
    styleNameHelper(MODE_REM, style)
  end

  #
  # Template method that returns the element to which style names will be
  # applied. By default it returns the root element, but this method may be
  # overridden to apply styles to a child element.
  # 
  # return:: the element to which style names will be applied
  #
  def getStyleElement
    return @element
  end

  protected :getStyleElement

  #
  # Constants used in +mode+ parameter of +styleNameHelper+ method.
  #
  MODE_GET = 0 
  MODE_SET = 1
  MODE_ADD = 2
  MODE_REM = 3
  
  #
  # Implement set/get/add/remove of style names.
  #
  def styleNameHelper(mode, style=nil) 
    unless elem = getStyleElement()
      raise "Null widget handle!"
    end

    className = DOM.getProperty(elem, "className").strip

    # Ensure a primary style name
    if className.empty?
      className = STYLE_EMPTY
      DOM.setProperty(elem, "className", className)
    end

    if mode != MODE_GET
      # Style names cannot contain leading or trailing whitespace, and cannot
      # legally be empty.
      style = style.strip  
      raise "Style names cannot be empty" if style.empty?
    end

    arr = className.split(" ")

    # The primary style name is always the first token of the full CSS class name.
    primary = arr.first

    return primary if mode == MODE_GET
    raise "Cannot remove primary style name" if mode == MODE_REM and primary == style 

    newClassName = [] 

    `var e, s;
    for (var i=0; i<#<arr>.length; i++)
    {
      e = #<arr>[i];
      if (e == '') continue;
      
      if (#<mode> == #<MODE_SET>)
      {
        // set primary name -> update all dependent style names
        if (e.indexOf(#<primary>) != 0)
        {
          // +e+ doesnt start with the old primary style name 
          // -> we dont touch it and keep it!
          s = e;
        }
        else 
        {
          // replace +primary+ with +style+ 
          s = #<style> + e.substring(#<primary>.length);
        }
      }
      else /* MODE_ADD or MODE_REM */
      {
        // remove the style. in case of MODE_ADD, we add it back later!
        s = (e == #<style>) ? null : e; 
      }
      
      if (s) #<newClassName>.push(s);
    }

    if (#<mode> == #<MODE_ADD>)
    {
      #<newClassName>.push(#<style>);
    }

    #<newClassName> = #<newClassName>.join(" ");`

    DOM.setProperty(elem, "className", newClassName)
  end

  private :styleNameHelper
  
  #-------------------------------------------------------------------
  # Position/Size related
  #-------------------------------------------------------------------
  
  #
  # Gets the object's absolute left position in pixels, as measured from the
  # browser window's client area.
  # 
  # return:: the object's absolute left position
  #
  def getAbsoluteLeft
    DOM.getAbsoluteLeft(@element)
  end

  #
  # Gets the object's absolute top position in pixels, as measured from the
  # browser window's client area.
  # 
  # return:: the object's absolute top position
  #
  def getAbsoluteTop
    DOM.getAbsoluteTop(@element)
  end
  
  #
  # Gets the object's offset height in pixels. This is the total height of the
  # object, including decorations such as border, margin, and padding.
  # 
  # return:: the object's offset height
  #
  def getOffsetHeight
    DOM.getPropertyInt(@element, "offsetHeight")
  end

  #
  # Gets the object's offset width in pixels. This is the total width of the
  # object, including decorations such as border, margin, and padding.
  # 
  # return:: the object's offset width
  #
  def getOffsetWidth
    DOM.getPropertyInt(@element, "offsetWidth")
  end

  #
  # Sets the object's height. This height does not include decorations such as
  # border, margin, and padding.
  # 
  # height:: the object's new height, in CSS units (e.g. "10px", "1em")
  #
  def setHeight(height)
    # This exists to deal with an inconsistency in IE's implementation where
    # it won't accept negative numbers in length measurements
    # FIXME: assert extractLengthValue(height.trim().toLowerCase()) >= 0 : "CSS heights should not be negative";

    DOM.setStyleAttribute(@element, "height", height)
  end

  #
  # Sets the object's width. This width does not include decorations such as
  # border, margin, and padding.
  # 
  # width:: the object's new width, in CSS units (e.g. "10px", "1em")
  #
  def setWidth(width)
    # This exists to deal with an inconsistency in IE's implementation where
    # it won't accept negative numbers in length measurements
    # FIXME: assert extractLengthValue(width.trim().toLowerCase()) >= 0 : "CSS widths should not be negative";
    
    DOM.setStyleAttribute(@element, "width", width)
  end

  #
  # Sets the object's size, in pixels, not including decorations such as
  # border, margin, and padding.
  # 
  # width::  the object's new width, in pixels
  # height:: the object's new height, in pixels
  #
  def setPixelSize(width, height)
    setWidth(width + "px")   # if width >= 0
    setHeight(height + "px") # if height >= 0
  end

  #
  # Sets the object's size. This size does not include decorations such as
  # border, margin, and padding.
  # 
  # width::  the object's new width, in CSS units (e.g. "10px", "1em")
  # height:: the object's new height, in CSS units (e.g. "10px", "1em")
  #
  def setSize(width, height)
    setWidth(width)
    setHeight(height)
  end

  #-------------------------------------------------------------------
  # Event related
  #-------------------------------------------------------------------

  #
  # Adds a set of events to be sunk by this object. Note that only
  # widgets (+Widget+) may actually receive events, but can receive events
  # from all objects contained within them.
  # 
  # eventBitsToAdd:: a bitfield representing the set of events to be added
  #                  to this element's event set
  #
  # See +Event+.
  #
  def sinkEvents(eventBitsToAdd)
    DOM.sinkEvents(@element, eventBitsToAdd | DOM.getEventsSunk(@element))
  end

  #
  # Removes a set of events from this object's event list.
  # 
  # eventBitsToRemove:: a bitfield representing the set of events to be
  #                     removed from this element's event set
  #
  # See #sinkEvents and +Event+.
  #
  def unsinkEvents(eventBitsToRemove)
    DOM.sinkEvents(@element, DOM.getEventsSunk(@element) & (~eventBitsToRemove))
  end

  #-------------------------------------------------------------------
  # Element access
  #-------------------------------------------------------------------

  #
  # Gets a handle to the object's underlying DOM element.
  # 
  # return:: the object's browser element
  #
  def getElement
    @element
  end

  #
  # Sets this object's browser element. UIObject subclasses must call this
  # method before attempting to call any other methods.
  # 
  # If the browser element has already been set, then the current element's
  # position is located in the DOM and removed. The new element is added into
  # the previous element's position.
  # 
  # elem:: the object's new element
  #
  def setElement(elem)
    if @element
      # replace element in its parent with elem.
      DOM.replace(@element, elem)
    end

    @element = elem

    # We do not actually force the creation of a primary style name here.
    # Instead, we do it lazily -- when it is aboslutely required -- 
    # in getStyleName(), addStyleName(), and removeStyleName().
  end
  
  #-------------------------------------------------------------------
  # Misc
  #-------------------------------------------------------------------

  #
  # Gets the title associated with this object. The title is the 'tool-tip'
  # displayed to users when they hover over the object.
  # 
  # return:: the object's title
  #
  def getTitle
    DOM.getProperty(@element, "title")
  end

  #
  # Sets the title associated with this object. The title is the 'tool-tip'
  # displayed to users when they hover over the object.
  #
  # To remove a title, pass +nil+ as argument.
  # 
  # title:: the object's new title
  #
  def setTitle(title)
    if title
      DOM.setAttribute(@element, "title", title)
    else
      DOM.removeAttribute(@element, "title")
    end
  end

  #
  # Determines whether or not this object is visible.
  # 
  # return:: +true+ if the object is visible
  #
  def isVisible
    DOM.isVisible(@element)
  end

  #
  # Sets whether this object is visible.
  # 
  # visible:: +true+ to show the object, +false+ to hide it
  #
  def setVisible(visible=true)
    DOM.setVisible(@element, visible)
  end

  #
  # This method is overridden so that any object can be viewed in the debugger
  # as an HTML snippet.
  # 
  # return:: a string representation of the object
  #
  def to_s
    @element ? DOM.to_s(@element) : "(null handle)"
  end

end # class UIObject
