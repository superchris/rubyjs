#--
# Copyright (c) 2007 by Michael Neumann (mneumann@ntecs.de)
#
# Copyright 2006 Google Inc.
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
# Abstract base class for all panels, which are widgets that can contain other
# widgets.
#
class Panel < Widget

  def add(w)
    raise "This panel does not support no-arg add()"
  end

  def clear
    raise
  end

  def each
    raise
  end

  #
  # This method must be called as part of the add method of any panel. It
  # ensures that the Widget's parent is set properly, and that it is removed
  # from any existing parent widget. It also attaches the child widget's
  # DOM element to its new container, ensuring that this process occurs in the
  # right order. 
  # 
  # w::         the widget to be adopted
  # container:: the element within which it will be contained
  #
  def adopt(w, container)
    # Remove the widget from its current parent, if any.
    w.removeFromParent

    # Attach it at the DOM and GWT levels.
    if container
      Element.appendChild(container, w.getElement)
    end

    w.setParent(self)
  end

  #
  # This method must be called whenever a Widget is removed. It ensures that
  # the Widget's parent is cleared.
  # 
  # w:: the widget to be disowned
  #
  def disown(w)
    # Only disown it if it's actually contained in this panel.
    raise "w is not a child of this panel" if w.getParent != self

    # Remove it at the DOM and GWT levels.
    elem = w.getElement
    w.setParent(nil)
    Element.removeChild(Element.getParent(elem), elem)
  end

  def onAttach
    super()

    # Ensure that all child widgets are attached.
    #FIXME
    each {|child| child.onAttach}
  end

  def onDetach
    super()

    # Ensure that all child widgets are detached.
    each {|child| child.onDetach}
  end

end
