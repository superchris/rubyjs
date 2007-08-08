class RootPanel < AbsolutePanel
  def self.get
    @rootPanel ||= new()
  end

  def each
    # FIXME
  end

  def initialize
    setElement(getBodyElement())
    onAttach()
  end

  def getBodyElement() `return document.body` end
end
