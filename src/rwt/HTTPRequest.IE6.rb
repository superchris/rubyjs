class HTTPRequest
  def self.createXmlHTTPRequest()
    `return new ActiveXObject("Msxml2.XMLHTTP")`
  end
end
