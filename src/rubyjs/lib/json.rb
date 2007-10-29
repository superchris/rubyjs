#
# JSON loading/dumping
#
# Parser code taken from http://www.json.org/json.js
#

class JSON
  class SyntaxError < RuntimeError; end

  #
  # Parsing happens in three stages. In the first stage, we run the text against
  # a regular expression which looks for non-JSON characters. We are especially
  # concerned with '()' and 'new' because they can cause invocation, and '='
  # because it can cause mutation. But just to be safe, we will reject all
  # unexpected characters.
  #
  # We split the first stage into 4 regexp operations in order to work around
  # crippling deficiencies in IE's and Safari's regexp engines. First we replace
  # all backslash pairs with '@' (a non-JSON character). Second, we replace all
  # simple value tokens with ']' characters. Third, we delete all open brackets
  # that follow a colon or comma or that begin the text. Finally, we look to see
  # that the remaining characters are only whitespace or ']' or ',' or ':' or '{'
  # or '}'. If that is so, then the text is safe for eval.
  #
  # In the second stage we use the eval function to compile the text into a
  # JavaScript structure. The '{' operator is subject to a syntactic ambiguity
  # in JavaScript: it can begin a block or an object literal. We wrap the text
  # in parens to eliminate the ambiguity.
  #
  def self._parse(str)
    RubyJS::inline <<-'endjs' 
      if (/^[\],:{}\s]*$/.test(#<str>.replace(/\\./g, '@').
          replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(:?[eE][+\-]?\d+)?/g, ']').
          replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        return eval('(' + #<str> + ')');
      }
    endjs

    raise SyntaxError, str
  end

  def self.load(str)
    obj = _parse(str) 
   `
    var conv = function(obj) {
      if (obj==null) return #<nil>;
      else if (obj instanceof Array) {
        for (var i=0; i<obj.length; i++) obj[i] = conv(obj[i]); 
      }
      else if (typeof(obj) == 'object') {
        var nobj = #<Hash>.#<m:new>();
        for (var i in obj) {
          nobj.#<m:[]=>(#<nil>, conv(i), conv(obj[i]));
        }
        return nobj;
      }
      return obj;
    };
    return conv(#<obj>);
   `
  end

  def self.dump(obj)
    obj.to_json
  end
end

class Object
  def to_json; raise end
end

class Boolean
  alias to_json to_s
end

class NilClass
  def to_json; "null" end
end

class String
  alias to_json inspect # FIXME?
end

class Number
  alias to_json to_s
end

class Array
  def to_json
    map {|a| a.to_json}.join(",")
  end
end

class Hash
  def to_json
    str = "{"
    str += map {|k, v| (k.to_json + ":" + v.to_json) }.join(",")
    str += "}"
    str
  end
end
