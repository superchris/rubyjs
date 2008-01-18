#
# Core classes for the Javascript side 
#
# Copyright (c) 2007 by Michael Neumann (mneumann@ntecs.de).
# All rights reserved.
#

class Proc
  OBJECT_CONSTRUCTOR__ = "Function"

  def self.new(&block)
    raise ArgumentError, "tried to create Proc object without a block" unless block
    #
    # wrap block inside another function, that catches iter_break returns.
    #
    `return (function() {
      try {
        return #<block>.#<m:call>.apply(#<block>, arguments);
      } catch(e) 
      {
        if (e instanceof #<globalattr:iter_jump>) 
        {
          if (e.#<attr:scope> == null)
          {`
            raise LocalJumpError, "break from proc-closure"
         `}
          return e.#<attr:return_value>;
        }
        else throw(e);
      }
    })`
  end

  def call(*args) `
    // TODO: use switch/case
    if (#<args>.length == 0) return #<self>();
    else if (#<args>.length == 1) return #<self>(#<args>[0]);
    else return #<self>(#<args>);`
  end
end

class Boolean
  OBJECT_CONSTRUCTOR__ = "Boolean"

  class << self
    undef_method :new
    undef_method :allocate 
  end

  def to_s
    `return (#<self> == true ? 'true' : 'false')` 
  end

  def ==(obj)
    `return (#<self> == #<obj>)`
  end

=begin
  def &(other)
    `return (#<self> == true ? (#<other>!==#<nil> ...`
  end
=end

  alias inspect to_s
end

class NilClass
  OBJECT_CONSTRUCTOR__ = "NilClass"

  class << self
    undef_method :new
    undef_method :allocate 
  end

  def nil?
    true
  end

  def to_s
    ""
  end

  def to_i
    0
  end

  def to_f
    0.0
  end

  def to_a
    []
  end

  def to_splat
    []
  end

  def inspect
    "nil"
  end
end

class Class
  def allocate 
    `return (new #<self>.#<attr:object_constructor>())`
  end

  def new(*args, &block)
    obj = allocate()
    obj.initialize(*args, &block)
    obj
  end

  def ===(other)
    eql?(other) or other.kind_of?(self)
  end

  def name
    `return #<self>.#<attr:classname>`
  end

  alias inspect name

  def self.new(superclass, classname, object_constructor=nil)
    unless object_constructor
      object_constructor = `(function() {})`
    end
    `return new #<self>.#<attr:object_constructor>(#<Class>, #<superclass>, #<classname>, #<object_constructor>);`
  end
end

module Kernel
  def nil?
    false
  end

  def loop
    while true
      yield
    end
  end

  def puts(str)
    str = str.to_s
    `alert(#<str>); return #<nil>`
  end

  def p(*args)
    args.each do |arg|
      puts arg.inspect
    end
    nil
  end
  
  def method_missing(id, *args, &block)
    raise NoMethodError, "undefined method `#{id}' for #{self.inspect}" 
  end

  # id is a Javascript name, e.g. $aaa
  def __invoke(id, args, &block) `
    var m = #<self>[#<id>];
    if (m)
      return m.apply(#<self>, [#<block>].concat(#<args>));
    else
      return #<self>.#<m:method_missing>.apply(#<self>, 
        [#<block>].concat([#<globalattr:mm>[#<id>]]).concat(#<args>));` 
  end
  
  # NOTE: In Ruby __send is __send__
  def __send(id, *args, &block) `
    var m = #<self>[#<globalattr:mm_reverse>[#<id>]];
    if (m) 
      return m.apply(#<self>, [#<block>].concat(#<args>));
    else
      return #<self>.#<m:method_missing>.apply(#<self>, [#<block>].concat([#<id>]).concat(#<args>));`
  end
  alias send __send

  def respond_to?(id) `
    var m = #<globalattr:mm_reverse>[#<id>]; 
    return (m !== undefined && #<self>[m] !== undefined && !#<self>[m].#<attr:_mm>)`
  end

  def proc(&block)
    Proc.new(&block)
  end

  def raise(*args)
    ex = 
    if args.empty?
      RuntimeError.new("")
    else
      first = args.shift
      if first.kind_of?(Class) # FIXME: subclass of Exception
        first.new(*args)
      elsif first.instance_of?(Exception) 
        if args.empty?
          first
        else
          ArgumentError.new("to many arguments given to raise")
        end
      elsif first.instance_of?(String)
        if args.empty?
          RuntimeError.new(first)
        else
          ArgumentError.new("to many arguments given to raise")
        end
      else
        TypeError.new("exception class/object expected")
      end
    end

    `throw(#<ex>)`
  end
end

class Object
  include Kernel

  def eql?(other)
    `return (#<self>.constructor == #<other>.constructor && #<self> == #<other>)`
  end

  def ===(other)
    eql?(other) or kind_of?(other)
  end

  def instance_of?(klass)
    `return (#<self>.#<attr:_class> === #<klass>)`  
  end

  def kind_of?(klass)
    `return #<globalattr:kind_of>(#<self>, #<klass>)`
  end
  alias is_a? kind_of?

  # Ruby 1.9
  def tap
    yield self
    self
  end

  def initialize
  end

  def class
    `return #<self>.#<attr:_class>`
  end

  def to_s
    `return #<self>.toString()`
  end

  alias inspect to_s
  alias hash to_s

  def method(id)
    Method.new(self, id)
  end
end

class Method
  def initialize(object, method_id)
    @object, @method_id = object, method_id

    m = nil
   `#<m> = #<object>[#<globalattr:mm_reverse>[#<method_id>]];
    if (#<m>==null) #<m> = #<nil>;`
    if m
      @method = m
    else
      raise NameError, "undefined method `#{method_id}' for class `#{object.class.name}'"
    end
  end

  def call(*args, &block)
    `return #<self>.#<@method>.apply(#<self>.#<@object>, [#<block>].concat(#<args>))`
  end

  def inspect
    "#<Method: #{@object.class.name}##{@method_id}>"
  end
end

module Enumerable
  def map(&block)
    result = []
    each {|elem| result << (block ? block.call(elem) : elem) }
    result
  end
  alias collect map

  def select
    result = []
    each {|elem|
      if yield(elem)
        result << elem 
      end
    }
    result
  end
  alias find_all select

  def reject
    result = []
    each {|elem|
      unless yield(elem)
        result << elem
      end
    }
    result
  end

  def to_a
    result = []
    each {|elem| result << elem}
    result
  end
end

class Range
  def initialize(first, last, exclude_last=false)
    @first, @last = first, last
    @exclude_last = exclude_last ? true : false
  end

  def exclude_end?
    @exclude_last
  end

  def first
    @first
  end
  alias begin first

  def last
    @last
  end
  alias end last

  def ==(obj)
    `if (#<self>.constructor != #<obj>.constructor) return false;`
    @first == obj.first and @last == obj.last and @exclude_last == obj.exclude_end?
  end

  def eql?(obj)
    `if (#<self>.constructor != #<obj>.constructor) return false;`
    @first.eql?(obj.first) and @last.eql?(obj.last) and @exclude_last == obj.exclude_end? 
  end

  def include?(obj)
    return false if obj < @first
    if @exclude_last
      obj < @last 
    else
      obj <= @last
    end
  end

  alias member? include?
  alias === include?

  def each
    current = @first
    return if @first > @last
    if @exclude_last
      while current < @last
        yield current
        current = current.succ
      end
    else
      while current <= @last
        yield current
        current = current.succ
      end
    end
  end

  def to_a
    arr = []
    return arr if @first > @last
    current = @first
    if @exclude_last
      while current < @last
        arr << current
        current = current.succ
      end
    else
      while current <= @last
        arr << current
        current = current.succ
      end
    end
    return arr
  end

  def to_s
    if @exclude_last
      "#{@first}...#{@last}"
    else
      "#{@first}..#{@last}"
    end
  end

  def inspect
    if @exclude_last
      "#{@first.inspect}...#{@last.inspect}"
    else
      "#{@first.inspect}..#{@last.inspect}"
    end
  end

end

class Exception
  attr_reader :message
  def initialize(message=nil)
    if message.nil?
      @message = self.class.name
    else
      @message = message
    end
  end
  alias to_s message

  def inspect
    "#<#{self.class.name}: #{@message}>"
  end
end

class StandardError < Exception; end
class NameError < StandardError; end
class NoMethodError < NameError; end
class RuntimeError < StandardError; end
class ArgumentError < StandardError; end
class TypeError < StandardError; end
class LocalJumpError < StandardError; end

#
# NOTE: Strings in RubyJS are immutable!!!
#
class String
  OBJECT_CONSTRUCTOR__ = "String"

  def +(str)
    `return(#<self> + #<str>)`
  end
  
  def empty?
    `return(#<self> === "")`
  end

  def rjust(len, pad=" ")
    raise ArgumentError, "zero width padding" if pad.empty?

    n = len - self.length
    return self if n <= 0 

    fillstr = ""
    `while(#<fillstr>.length < #<n>) #<fillstr> += #<pad>;`

    return fillstr[0,n] + self
  end

  def ljust(len, pad=" ")
    raise ArgumentError, "zero width padding" if pad.empty?

    n = len - self.length
    return self if n <= 0 

    fillstr = ""
    `while(#<fillstr>.length < #<n>) #<fillstr> += #<pad>;`

    return self + fillstr[0,n]
  end

  def inspect
    # prototype.js
    specialChar = `{
      '\\b': '\\\\b',
      '\\t': '\\\\t',
      '\\n': '\\\\n',
      '\\f': '\\\\f',
      '\\r': '\\\\r',
      '\\\\': '\\\\\\\\'
    };`

    escapedString = self.gsub(/[\x00-\x1f\\]/) {|match| 
      character = `#<specialChar>[#<match>]` 
     `return #<character> ? #<character> : 
        '\\\\u00' + ("0" + #<match>.charCodeAt().toString(16)).substring(0,2);`
    }

    `return ('"' + #<escapedString>.replace(/"/g, '\\\\"') + '"');`
  end

  def to_s
    self
  end

  def strip
    `return #<self>.replace(/^\\s+/, '').replace(/\\s+$/, '')`
  end

  def split(str)
    `return #<self>.split(#<str>)`
  end

  def length
    `return #<self>.length`
  end
  alias size length

  def index(substring, offset=0) `
    var i = #<self>.indexOf(#<substring>, #<offset>);
    return (i == -1) ? #<nil> : i` 
  end

  def =~(pattern) `
    var i = #<self>.search(#<pattern>);
    return (i == -1 ? #<nil> : i)`
  end

  def gsub(pattern, replacement=nil)
    # from prototype.js
    result, source, match = "", self, nil
   `while(#<source>.length > 0) {
      if (#<match> = #<source>.match(#<pattern>)) {
        #<result> += #<source>.slice(0, #<match>.index);` 
        if replacement
          result += replacement 
        else
          result += yield(match.first).to_s
        end
       `#<source> = #<source>.slice(#<match>.index + #<match>[0].length);
      } else {
        #<result> += #<source>; #<source> = '';
      }
    } return #<result>`
  end

  def sub(pattern, replacement)
    # FIXME: block
    `#<self>.replace(pattern, replacement)`
  end

  def [](index, len=nil)
    if len.nil?
      # single character access
      # FIXME: returns a string and not a Fixnum!
      # But: Ruby 1.9+ has this behaviour!!!
      `return #<self>.charAt(#<index>) || #<nil>`
    else
      # substring access
      return nil if len < 0
      `return #<self>.substring(#<index>, #<index>+#<len>)`
    end
  end
end

class Number
  OBJECT_CONSTRUCTOR__ = "Number"

  class << self
    undef_method :new
    undef_method :allocate 
  end

  def to_s(base=10)
    `return #<self>.toString(#<base>)`
  end

  def inspect
    `return #<self>.toString()`
  end

  def +(x)  `return #<self> + #<x>` end
  def -(x)  `return #<self> - #<x>` end
  def -@()  `return -#<self>` end
  def +@()  `return #<self>` end
  def *(x)  `return #<self> * #<x>` end
  def /(x)  `return #<self> / #<x>` end
  def <(x)  `return #<self> < #<x>` end
  def <=(x) `return #<self> <= #<x>` end
  def >(x)  `return #<self> > #<x>` end
  def >=(x) `return #<self> >= #<x>` end
  def ==(x) `return #<self> == #<x>` end
  def %(x)  `return #<self> % #<x>` end
  def |(x)  `return #<self> | #<x>` end
  def &(x)  `return #<self> & #<x>` end
  def ^(x)  `return #<self> ^ #<x>` end
  def ~()   `return ~#<self>` end

  def succ() `return #<self>+1` end

  def times
    i = 0
    while i < self
      yield i
      i += 1
    end
    return self
  end

  def downto(x)
    i = self
    while i >= x  
      yield i
      i -= 1
    end
    return self
  end

  def upto(x)
    i = self
    while i <= x  
      yield i
      i += 1
    end
    return self
  end

end

# for compatibility
class Fixnum < Number; end
class Bignum < Number; end
class Float < Number; end

#
# Every method that returns an element has to
# check this element for +null+. This is required
# to seamlessly use Javascript data without needing
# to convert it before usage.
#
# The reverse, passing a RubyJS Array to Javascript
# without conversion of +nil+ to +null+ is of course
# not possible!
#
# NOTE: Following condition holds true:
#   v == null <=> v=null || v=undefined
#
class Array
  OBJECT_CONSTRUCTOR__ = "Array"

  include Enumerable

  def each() `
    var elem;
    for (var i=0; i < #<self>.length; i++) {
      elem = #<self>[i];`
      yield `(elem == null ? #<nil> : elem)`
   `}
    return #<self>`
  end

  def each_with_index() `  
    var elem;
    for (var i=0; i < #<self>.length; i++) {
      elem = #<self>[i];` 
      yield `(elem == null ? #<nil> : elem)`, `i`
   `}
    return #<self>`
  end

  def join(sep="")
    str = ""
    self.each_with_index {|elem, i|
      str += elem.to_s
      str += sep if i != self.length-1
    }
    str
  end

  def to_a
    self
  end

  def to_ary
    self
  end

  def self.new
    `return []`
  end

  # TODO: test that otherArray is array 
  def +(otherArray)
    `return #<self>.concat(#<otherArray>)`
  end

  def dup
    `return #<self>.concat()`
  end

  def reverse
    `return #<self>.concat().reverse()`
  end

  def reverse!
    `#<self>.reverse(); return #<self>`
  end

  def length
    `return #<self>.length`
  end

  alias size length

  def first
    `var v = #<self>[0]; return (v == null ? #<nil> : v)`
  end

  def last
    `var v = #<self>[#<self>.length - 1]; return (v == null ? #<nil> : v)`
  end

  def clear
    `#<self>.length=0; return #<self>` 
  end

  # TODO: check arrary bounds
  def [](i)
    `var v = #<self>[#<i>]; return (v == null ? #<nil> : v)`
  end

  def []=(i, val)
    `return (#<self>[#<i>] = #<val>)`
  end

  def push(*args)
    `#<self>.push.apply(#<self>, #<args>); return #<self>`
  end

  def <<(arg)
    `#<self>.push(#<arg>); return #<self>`
  end

  def pop() `
    var elem = #<self>.pop();
    return (elem == null ? #<nil> : elem)`
  end

  def shift() `
    var elem = #<self>.shift();
    return (elem == null ? #<nil> : elem)`
  end

  def delete(obj) `
    var del = false;
    for (var i=0; i < #<self>.length; i++)
    {
      if (#<obj>.#<m:eql?>(#<nil>, #<self>[i]))
      {
        #<self>.splice(i,1);
        del = true;
        // stay at the current index unless we are at the last element!
        if (i < #<self>.length-1) --i; 
      }
    }
    return del ? #<obj> : #<nil>`
  end
 
  def unshift(*args)
    `#<self>.unshift.apply(#<self>, #<args>); return #<self>`
  end

  def empty?
    `return (#<self>.length == 0)`
  end

  def to_s
    map {|i| i.to_s}.join
  end

  def inspect
    str = "["
    str += self.map {|elem| elem.inspect}.join(", ")
    str += "]"
    str
  end

  def eql?(other)
    `
    if (!(#<other> instanceof Array)) return false;
    if (#<self>.length != #<other>.length) return false;  

    //
    // compare element-wise
    //
    for (var i = 0; i < #<self>.length; i++) 
    {
      if (! #<self>[i].#<m:eql?>(#<nil>, #<other>[i]))
      {
        // 
        // at least for one element #eql? holds not true
        //
        return false;
      }
    }
    
    return true;
    `
  end
end

class Regexp
  OBJECT_CONSTRUCTOR__ = "RegExp"
end

class MatchData
  def initialize(match)
    @match = match
  end
end

#
# We prefix every element by a ":"
#
class Hash
  include Enumerable

  #
  # Construct an empty Hash
  #
  def initialize() `
    #<self>.#<attr:items> = {}; 
    #<self>.#<attr:default_value> = #<nil>;
    return #<nil>`
  end

  #
  # Construct a Hash from key, value pairs, e.g.
  #
  #   Hash.new_from_key_value_list(1,2, 3,4, 5,6)
  #
  # will result in
  #
  #   {1 => 2, 3 => 4, 5 => 6}
  #
  def self.new_from_key_value_list(*list) 
    raise ArgumentError if list.length % 2 != 0 
    obj = allocate()
    `
    // 
    // we use an associate array to store the items. But unlike
    // Javascript, the entries are arrays which contain the collisions.
    // NOTE that we have to prefix the hash code with a prefix so that
    // there are no collisions with methods etc.   
    // I prefix it for now with ":".
    //
    var items = {};
    var hashed_key, current_key, current_val;
   
    for (var i = 0; i < #<list>.length; i += 2)
    {
      current_key = #<list>[i];
      current_val = #<list>[i+1];
      hashed_key = ":" + current_key.#<m:hash>();

      // make sure that a bucket exists
      if (!items[hashed_key]) items[hashed_key] = [];

      items[hashed_key].push(current_key, current_val);
    }

    #<obj>.#<attr:items> = items; 
    #<obj>.#<attr:default_value> = #<nil>;
    return #<obj>;
    `
  end

  def self.new_from_jsobject(jsobj) 
    obj = new()
  end

  def [](key) `
    if (!#<self>.#<attr:items>)
    {
      // this is a Javascript Object, not a RubyJS Hash object.
      // we directly look the key up. it's fast but not Ruby-like,
      // so be careful!
      
      var elem = #<self>[#<key>];
      return (elem == null ? #<nil> : elem);
    }

    var hashed_key = ":" + #<key>.#<m:hash>();
    var bucket = #<self>.#<attr:items>[hashed_key];

    if (bucket)
    {
      //
      // find the matching element inside the bucket
      //

      for (var i = 0; i < bucket.length; i += 2)
      {
        if (bucket[i].#<m:eql?>(#<nil>,#<key>))
          return bucket[i+1];
      }
    }

    // no matching key found -> return default value
    return #<self>.#<attr:default_value>;
    `
  end

  def []=(key, value) `
    if (!#<self>.#<attr:items>)
    {
      // this is a Javascript Object, not a RubyJS Hash object.
      // we directly look the key up. it's fast but not Ruby-like,
      // so be careful!
      
      #<self>[#<key>] = #<value>;
      return #<value>; 
    }

    var hashed_key = ":" + #<key>.#<m:hash>();
    var bucket = #<self>.#<attr:items>[hashed_key];

    if (bucket)
    {
      //
      // find the matching element inside the bucket
      //

      for (var i = 0; i < bucket.length; i += 2)
      {
        if (bucket[i].#<m:eql?>(#<nil>,#<key>))
        {
          // overwrite value
          bucket[i+1] = #<value>;
          return #<value>;
        }
      }
      // key not found in this bucket. append key, value pair to bucket
      bucket.push(#<key>, #<value>);
    }
    else 
    {
      //
      // create new bucket
      //
      #<self>.#<attr:items>[hashed_key] = [#<key>, #<value>];
    }
    return #<value>;
    `
  end

  def keys
    map {|k,v| k}
  end

  def values
    map {|k,v| v}
  end

  def each() `
    if (!#<self>.#<attr:items>)
    {
      // this is a Javascript Object, not a RubyJS Hash object.
      // we directly look the key up. it's fast but not Ruby-like,
      // so be careful!
      var key, value;
      for (key in #<self>)
      {
        value = #<self>[key];`
        yield `(key == null ? #<nil> : key)`, `(value == null ? #<nil> : value)`;
     `
      }
      
      return #<nil>;
    }

    var key, bucket, i;
    for (key in #<self>.#<attr:items>)
    {
      if (key.charAt(0) == ":")
      {
        bucket = #<self>.#<attr:items>[key];
        for (i=0; i<bucket.length; i+=2)
        {`
        yield `bucket[i]`, `bucket[i+1]`
        `
        }
      }
    }
    return #<nil>;
    `
  end

  def inspect
    str = "{"
    str += map {|k, v| (k.inspect + "=>" + v.inspect) }.join(", ")
    str += "}"
    str
  end

  def to_s
    strs = []
    each {|k, v| strs << k; strs << v}
    strs.join("")
  end

end
