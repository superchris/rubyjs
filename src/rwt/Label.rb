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
# Map Event types to methods.
#
# We use a hack in that we assign the keys directly to
# the object. As long as the keys (== event types) are
# integers (and they are) there is no problem with that
# approach. This saves us an extra object!
#
module EventDispatchMap

  def onBrowserEvent(event)
    eventType = Event.getType(event)
    `
    var cb = #<self>[#<eventType>];
    if (cb) cb.apply(#<self>, [#<nil>, #<event>]);
    return #<nil>
    `
  end

  protected

  def mapEvent(eventType, method)
    `#<self>[#<eventType>] = #<method>`
  end

end


#
# A widget that contains arbitrary text, <i>not</i> interpreted as HTML.
#
class Label < Widget

  #include EventDispatchMap

  #
  # Creates a label, either empty or with the specified text.
  #
  # text::     the new label's text. if +nil+, label is empty.
  # wordWrap:: +false+ to disable wordwrapping, +true+ to enable,
  #            +nil+ to don't care.
  #
  def initialize(text=nil, wordWrap=nil)
    setElement(DOM.createDiv)
    sinkEvents(Event::ONCLICK | Event::MOUSEEVENTS | Event::ONMOUSEWHEEL)
    setStyleName("rwt-Label")
    setText(text) if text
    setWordWrap(wordWrap) unless wordWrap.nil?

    #
    # setup event map
    #
=begin
    mapEvent(Event::ONCLICK, `this.#<m:onClick>`)
    mapEvent(Event::ONMOUSEDOWN, `this.#<m:onMouse>`)
    mapEvent(Event::ONMOUSEUP, `this.#<m:onMouse>`)
    mapEvent(Event::ONMOUSEMOVE, `this.#<m:onMouse>`)
    mapEvent(Event::ONMOUSEOVER, `this.#<m:onMouse>`)
    mapEvent(Event::ONMOUSEOUT, `this.#<m:onMouse>`)
    mapEvent(Event::ONMOUSEWHEEL, `this.#<m:onMouseWheel>`)
=end
  end

  def addClickListener(listener)
    @clickListeners ||= []
    @clickListeners << listener
  end

  def addMouseListener(listener)
    @mouseListeners ||= []
    @mouseListeners << listener
  end

  def addMouseWheelListener(listener)
    @mouseWheelListeners ||= []
    @mouseWheelListeners << listener
  end

  def removeClickListener(listener)
    @clickListeners.delete(listener) if @clickListeners
  end

  def removeMouseListener(listener)
    @mouseListeners.delete(listener) if @mouseListeners
  end

  def removeMouseWheelListener(listener)
    @mouseListeners.delete(listener) if @mouseWheelListeners
  end

=begin
  def getHorizontalAlignment
    @horzAlign
  end

  def setHorizontalAlignment(align)
    @horzAlign = align
    Element.setStyleAttribute(getElement(), "textAlign", align.getTextAlignString())
  end
=end

  def getText
    DOM.getInnerText(getElement())
  end

  def getWordWrap
    DOM.getStyleAttribute(getElement(), "whiteSpace") != 'nowrap'
  end

  def setText(text)
    DOM.setInnerText(getElement(), text)
  end

  def setWordWrap(wrap)
    DOM.setStyleAttribute(getElement(), "whiteSpace", wrap ? "normal" : "nowrap")
  end

  def onBrowserEvent(event)
    eventType = Event.getType(event)

    if eventType == Event::ONCLICK
      if @clickListeners
        @clickListeners.each {|l| l.onClick(self) } 
      end
    end
  end
 
=begin
  def onClick(event)
    if @clickListeners
      @clickListeners.each {|l| l.onClick(self) } 
    end
  end

  def onMouse(event)
    if @mouseListeners
      #@mouseListeners.each {|l| l.onClick(self) } 
    end
  end

  def onMouseWheel(event)
  end
=end

end
