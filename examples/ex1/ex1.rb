require 'rwt/Event'
require 'rwt/DOM'
require 'rwt/UIObject'
require 'rwt/Widget'
require 'rwt/Panel'
require 'rwt/AbsolutePanel'
require 'rwt/RootPanel'
require 'rwt/Label'

class MyWidget < Widget
  def initialize
    setElement(DOM.createDiv)
    sinkEvents(Event::ONCLICK)
    setTitle('test')
    DOM.setInnerText(getElement(), 'click me')
  end

  def onBrowserEvent(ev)
    `alert('okay')`
  end
end

class MyEventListener
  def onClick(widget)
    widget.setText(widget.getText + "-")
  end
end

class Main
  def self.main
    Event.__init
    RootPanel.get.add(MyWidget.new)

    listener = MyEventListener.new

    10.times do
      label = Label.new('XXX')
      label.addClickListener(listener)
      RootPanel.get.add(label)
    end
  end
end
