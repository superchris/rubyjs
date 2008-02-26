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
# The base class for the majority of user-interface objects. Widget adds
# support for receiving events from the browser and being added directly to
# panels (class +Panel+).
#
class Widget < UIObject

  #
  # Gets this widget's parent panel.
  # 
  # return:: the widget's parent panel
  #
  def getParent
    @parent
  end

  #
  # Sets this widget's parent. This method should only be called by
  # +Panel+ and +Composite+.
  # 
  # parent:: the widget's new parent
  #
  def setParent(parent)
    oldParent = @parent
    @parent = parent

    if parent.nil?
      # Remove from parent
      onDetach() if oldParent and oldParent.isAttached
    elsif parent.isAttached
      onAttach()
    end
  end

  #
  # Determines whether this widget is currently attached to the browser's
  # document (i.e., there is an unbroken chain of widgets between this widget
  # and the underlying browser document).
  # 
  # return:: +true+ if the widget is attached
  #
  def isAttached
    @attached
  end

  #
  # Sets this object's browser element. Widget subclasses must call this method
  # before attempting to call any other methods.
  # 
  # If a browser element has already been attached, then it is replaced with
  # the new element. The old event listeners are removed from the old browser
  # element, and the event listeners are set up on the new browser element.
  # 
  # elem:: the object's new element
  #
  def setElement(elem)
    if @attached
      # Remove old event listener to avoid leaking. onDetach will not do this
      # for us, because it is only called when the widget itself is detached from
      # the document.
      DOM.removeEventListener(getElement())
    end

    super(elem)

    if @attached
      # Hook the event listener back up on the new element. onAttach will not
      # do this for us, because it is only called when the widget itself is
      # attached to the document.
      DOM.setEventListener(elem, self)
    end
  end

  #
  # Removes this widget from its parent widget. If it has no parent, this
  # method does nothing.
  # 
  def removeFromParent
    @parent.remove(self) if @parent
  end

  #-------------------------------------------------------------------
  # Event handlers
  #-------------------------------------------------------------------
 
  def onBrowserEvent(event)
  end
  
  #
  # This method is called when a widget is attached to the browser's document.
  # To receive notification after a Widget has been added to the
  # document, override the +onLoad+ method.
  # 
  # Subclasses that override this method must call <tt>super()</tt> to ensure
  # that the Widget has been attached to the underlying Element.
  # 
  def onAttach
    raise "already attached" if @attached

    @attached = true

    # Set the main element's event listener. This should only be set
    # while the widget is attached, because it creates a circular
    # reference between JavaScript and the DOM.
    DOM.setEventListener(getElement(), self)

    # Now that the widget is attached, call onLoad().
    onLoad()
  end

  #
  # This method is called when a widget is detached from the browser's
  # document. To receive notification before a Widget is removed from the
  # document, override the +onUnload+ method.
  # 
  # Subclasses that override this method must call <tt>super()</tt> 
  # to ensure that the Widget has been detached from the underlying Element.  
  # Failure to do so will result in application memory leaks due to circular
  # references between DOM Elements and JavaScript objects.
  # 
  def onDetach
    raise "cannot detached unattached widget" unless @attached
    
    # Give the user a chance to clean up, but don't trust the code to not throw
    # TODO: begin onUnload ensure xxx end
    onUnload()
    @attached = false
  
    # Clear out the element's event listener (breaking the circular
    # reference between it and the widget).
    DOM.removeEventListener(getElement())
  end

  #
  # This method is called immediately after a widget becomes attached to the
  # browser's document.
  #
  def onLoad
  end
  
  #
  # This method is called immediately before a widget will be detached from the
  # browser's document.
  #
  def onUnload
  end

  #-------------------------------------------------------------------
  # Layout data
  #-------------------------------------------------------------------
 
  #
  # Gets the panel-defined layout data associated with this widget.
  # 
  # return:: the widget's layout data
  #
  # See #setLayoutData.
  #
  def getLayoutData
    @layoutData
  end

  #
  # Sets the panel-defined layout data associated with this widget. Only the
  # panel that currently contains a widget should ever set this value. It
  # serves as a place to store layout bookkeeping data associated with a
  # widget.
  # 
  # layoutData:: the widget's layout data
  #
  def setLayoutData(layoutData)
    @layoutData = layoutData
  end

end # class Widget
