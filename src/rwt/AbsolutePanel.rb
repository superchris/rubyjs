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
# An absolute panel positions all of its children absolutely, allowing them to
# overlap.
# 
# Note that this panel will not automatically resize itself to allow enough
# room for its absolutely-positioned children. It must be explicitly sized in
# order to make room for them.
#
# Once a widget has been added to an absolute panel, the panel effectively
# "owns" the positioning of the widget. Any existing positioning attributes
# on the widget may be modified by the panel.
#
class AbsolutePanel < Panel

  #
  # Creates an empty absolute panel.
  #
  def initialize
    @children = []

    setElement(DOM.createDiv)

    # Setting the panel's position style to 'relative' causes it to be treated
    # as a new positioning context for its children.
    DOM.setStyleAttribute(getElement(), "position", "relative");
    DOM.setStyleAttribute(getElement(), "overflow", "hidden");
  end

  #
  # Adds a child widget to this panel.
  # 
  # w:: the child widget to be added
  #
  def add(w)
    adopt(w, getElement())
    @children << w if @children
  end

  def each(&block)
    @children.each(&block)
  end

  #
  # Adds a widget to the panel at the specified position. 
  # 
  # w::    the widget to be added
  # left:: the widget's left pixel position
  # top::  the widget's top pixel position
  #
  def addPositioned(w, left, top)
    # In order to avoid the potential for a flicker effect, it is necessary
    # to set the position of the widget before adding it to the AbsolutePanel.
    # The Widget should be removed from its parent before any positional
    # changes are made to prevent flickering.
    w.removeFromParent
    DOM.setAbsolutePixelPosition(w.getElement, left, top)
    add(w)
  end
  
  #
  # Adds a widget to the panel using a static position.
  #
  # w:: the widget to be added
  #
  def addStatic(w)
    # In order to avoid the potential for a flicker effect, it is necessary
    # to set the position of the widget before adding it to the AbsolutePanel.
    # The Widget should be removed from its parent before any positional
    # changes are made to prevent flickering.
    w.removeFromParent
    DOM.changeToStaticPositioning(w.getElement)
    add(w)
  end

  #
  # Gets the position of the left outer border edge of the widget relative to
  # the left outer border edge of the panel.
  # 
  # w::      the widget whose position is to be retrieved
  # return:: the widget's left position
  #
  def getWidgetLeft(w)
    checkWidgetParent(w)
    return DOM.getAbsoluteLeft(w.getElement) - DOM.getAbsoluteLeft(getElement())
  end

  #
  # Gets the position of the top outer border edge of the widget relative to
  # the top outer border edge of the panel.
  # 
  # w::      the widget whose position is to be retrieved
  # return:: the widget's top position
  #
  def getWidgetTop(w)
    checkWidgetParent(w)
    return DOM.getAbsoluteTop(w.getElement) - DOM.getAbsoluteTop(getElement())
  end

  #
  # Sets the position of the specified child widget. 
  # 
  # w::    the child widget to be positioned
  # left:: the widget's left pixel position
  # top::  the widget's top pixel position
  #
  def setWidgetPosition(w, left, top)
    checkWidgetParent(w)
    DOM.setAbsolutePixelPosition(w.getElement, left, top)
  end
  
  #
  # Changes the positioning of the specified child widget to static
  # positioning. 
  # 
  # w::    the child widget to be statically positioned
  #
  def setWidgetPositionToStatic(w)
    checkWidgetParent(w)
    DOM.changeToStaticPositioning(w.getElement)
  end

  protected

  #
  # Calls the superclass' +disown+ method, and sets the positioning of the 
  # widget to static. This is done so that any positioning changes to the 
  # widget that were done by the panel are undone when the widget is disowned 
  # from the panel.
  # 
  # w:: the widget to be disowned
  #
  def disown(w)
    super(w)
    DOM.changeToStaticPositioning(w.getElement)
  end

  private

  def checkWidgetParent(w)
    raise "Widget must be a child of this panel" if w.getParent != self
  end

end # class AbsolutePanel
