require 'rwt/Event'
require 'rwt/Element'
require 'rwt/UIObject'
require 'rwt/Widget'
require 'rwt/Panel'
require 'rwt/AbsolutePanel'
require 'rwt/RootPanel'

class MyWidget < Widget
  def initialize
    setElement(Element.createDiv)
    sinkEvents(Event::ONCLICK)
    setTitle('test')
    Element.setInnerText(getElement(), 'click me')
  end

  def onBrowserEvent(ev)
    `alert('okay')`
  end
end

class Main
  def self.main
    Event.__init
    RootPanel.get.add(MyWidget.new)
  end
end
