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

class HTTPRequest

  # 
  # Makes an asynchronous HTTP GET to a remote server.
  # 
  # url::     the absolute url to GET
  # returns:: +false+ if the invocation fails to issue
  # yields::  the response
  #
  def self.asyncGet(url, user=nil, pwd=nil, &block) 
    asyncImpl(url, "GET", "", user, pwd, &block)
  end

  # 
  # Makes an asynchronous HTTP POST to a remote server.
  # 
  # url::      the absolute url to which the POST data is delivered
  # postData:: the data to post
  # returns::  +false+ if the invocation fails to issue
  # yields::   the response
  #
  def self.asyncPost(url, postData, user=nil, pwd=nil, &block)
    asyncImpl(url, "POST", postData, user, pwd, &block)
  end

  private

  def self.createXmlHTTPRequest()
    `return new XMLHttpRequest()`
  end

  def self.asyncImpl(url, method, data="", user=nil, pwd=nil)
    xmlHttp = createXmlHTTPRequest()
   `
    try {
      #<xmlHttp>.open(#<method>, #<url>, true);
      #<xmlHttp>.setRequestHeader("Content-Type", "text/plain; charset=utf-8");
      #<xmlHttp>.onreadystatechange = function() {
        if (#<xmlHttp>.readyState == 4) {
          #<xmlHttp>.onreadystatechange = #<globalattr:null_func>; `
   
            yield `(#<xmlHttp>.responseText || "")`

       `}
      };
      #<xmlHttp>.send(#<data>);
      return true;
    } catch (e) {
      #<xmlHttp>.onreadystatechange = #<globalattr:null_func>;
      return false;
    } `
  end

end


