require 'rwt/Event'
require 'rwt/DOM'

class Listener
  def onBrowserEvent(ev)
    elem = DOM.createDiv
    DOM.setInnerText(elem, DOM.eventGetTypeString(ev))
    DOM.appendChild(DOM.getElementById('root'), elem)
  end
end

class Main
  def self.main
    DOM.__init

    div = DOM.createDiv
    DOM.setInnerText(div, 'click')

    DOM.sinkEvents(div, Event::MOUSEEVENTS)
    DOM.setEventListener(div, Listener.new)
    DOM.setElementAttribute(div, 'title', 'heyja') 

    DOM.appendChild(DOM.getElementById('root'), div)
  end
end
