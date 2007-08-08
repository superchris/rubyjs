require 'rwt/Event'
require 'rwt/Element'

class Listener
  def onBrowserEvent(ev)
    elem = Element.createDiv
    Element.setInnerText(elem, Event.getTypeString(ev))
    Element.appendChild(Element.getById('root'), elem)
  end
end

class Main
  def self.main
    Event.__init

    div = Element.createDiv
    Element.setInnerText(div, 'click')

    Element.sinkEvents(div, Event::MOUSEEVENTS)
    Element.setEventListener(div, Listener.new)
    Element.setAttribute(div, 'title', 'heyja') 

    Element.appendChild(Element.getById('root'), div)
  end
end
