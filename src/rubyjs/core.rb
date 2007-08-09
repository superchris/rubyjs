#
# Runtime and core classes for the Javascript side 
#
# Copyright (c) 2007 by Michael Neumann (mneumann@ntecs.de).
# All rights reserved.
#

RUNTIME_INIT = <<EOS
// declare nil
function NilClass() {}

// FIXME: remove
NilClass.prototype.toString = function() { return "nil"; };
#<nil> = new NilClass();

function #<globalattr:to_splat>(a)
{
  // TODO
  return a;
}

// 
// helper function for multiple assignment in 
// iterator parameters.
// 
//   undefined -> []
//   1         -> [1]
//   [1]       -> [[1]]
//   []        -> [[]]
//   [1,2]     -> [1,2]
// 
function #<globalattr:masgn_iter>(a)
{
  if (a===undefined) return [];
  if (a.constructor!=Array || a.length<2) return [a];
  return a;
}

//
// Call the method in the superclass.
//
// As super is used quite rarely, we dont optimize for it.
// 
// object, method, iterator, arguments
//
function #<globalattr:supercall>(o, m, i, a) 
{
  var r = o[m]; // method in current class
  var c = o.#<attr:_class>.#<attr:superclass>;
  while (r === c.#<attr:object_constructor>.prototype[m])
    c = c.#<attr:superclass>;
  return c.#<attr:object_constructor>.prototype[m].apply(o, [i].concat(a));
}

function #<globalattr:rebuild_classes>(c)
{
  for (var i=0; i<c.length; i++)
    #<globalattr:rebuild_class>(c[i]);
}

function #<globalattr:rebuild_class>(c)
{
  var k,i;

  //
  // include modules
  //
  // do that before, because when assigning instance methods of 
  // the super class, a check for === undefined prevents from
  // this method being overwritten.
  //
  for (i=0; i<c.#<attr:modules>.length; i++)
  {
    for (k in c.#<attr:modules>[i].#<attr:object_constructor>.prototype)
    {
      if (c.#<attr:object_constructor>.prototype[k]===undefined)
      {
        c.#<attr:object_constructor>.prototype[k] = c.#<attr:modules>[i].#<attr:object_constructor>.prototype[k];
      }
    }
  }

  // instance methods
  if (c.#<attr:superclass> != #<nil>)
  {
    for (k in c.#<attr:superclass>.#<attr:object_constructor>.prototype)
    {
      if (c.#<attr:object_constructor>.prototype[k]===undefined)
      {
        c.#<attr:object_constructor>.prototype[k] = c.#<attr:superclass>.#<attr:object_constructor>.prototype[k];
      }
    }
  }

  // inherit class methods from superclass
  if (c.#<attr:superclass> != #<nil>)
  {
    for (k in c.#<attr:superclass>)
    {
      if (c[k]===undefined)
      {
        c[k] = c.#<attr:superclass>[k];
      }
    }
  }
}

function #<globalattr:def_class>(h)
{
  var c,k,i;
  c = h.#<attr:_class> || #<Class>.#<m:new>(#<nil>, h.#<attr:superclass>, h.#<attr:classname>, h.#<attr:object_constructor>);

  if (h.#<attr:instance_methods>)
  {
    for (k in h.#<attr:instance_methods>)
    {
      c.#<attr:object_constructor>.prototype[k] = h.#<attr:instance_methods>[k];
    }
  }

  if (h.#<attr:methods>)
  {
    for (k in h.#<attr:methods>) c[k] = h.#<attr:methods>[k];
  }

  if (h.#<attr:modules>)
  {
    for (i=0; i<h.#<attr:modules>.length; i++)
    {
      c.#<attr:modules>.push(h.#<attr:modules>[i]);
    }
  }

  return c;
}

function #<globalattr:MetaClass>(#<_class>, #<superclass>, #<classname>, #<object_constructor>) 
{
  this.#<attr:superclass> = #<superclass>;
  this.#<attr:classname> = #<classname>;
  this.#<attr:object_constructor> = #<object_constructor>;
  this.#<attr:modules> = [];
  this.#<attr:_class> = #<_class>;
  return this;
}

#<globalattr:MetaClass>.#<m:name> = function() { return "MetaClass"; };
#<globalattr:MetaClass>.#<m:class> = function() { return this; };
EOS

module RubyJS; module Environment

  class Proc
    OBJECT_CONSTRUCTOR__ = "Function"

    def call(*args)
      `if (#<args>.length == 0) return #<self>();
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

    def inspect
      "nil"
    end
  end

  class Class
    def allocate
      `var o = new #<self>.#<attr:object_constructor>();
       o.#<attr:_class> = #<self>;
       return o;`
    end

    def new(*args, &block)
      obj = allocate()
      obj.initialize(*args, &block)
      obj
    end

    def name
      `return #<self>.#<attr:classname>;`
    end

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
    end

    # FIXME
    def raise(*args)
      p(*args)
    end
  end

  class Object
    include Kernel

    def eql?(other)
      `return (#<self>.constructor == #<other>.constructor && #<self> == #<other>)`
    end

    def kind_of?(klass)
      # TODO
    end

    def __invoke(id, args, &block)
      `return #<self>[#<id>].apply(#<self>, [#<block>].concat(#<args>));`
    end

    def initialize
    end

    def class
      `return #<self>.#<attr:_class>`
    end

    def inspect
      `return #<self>.toString()`
    end

    def hash
      `return #<self>.toString()`
    end
  end

  module Enumerable
    def map(&block)
      result = []
      each {|elem|
        if block
          result << block.call(elem)
        else
          result << elem 
        end
      }
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

=begin
  class Exception
    attr_reader :message
    def initialize(message)
      @message = message
    end
  end

  class StandardError < Exception; end
  class NameError < StandardError; end
  class NoMethodError < NameError; end
  class RuntimeError < StandardError; end
  class ArgumentError < StandardError; end
=end

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
  
    # FIXME: escape special characters
    def inspect
      `return('"' + #<self> + '"')`
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

    def index(substring, offset=0) `
      var i = #<self>.indexOf(#<substring>, #<offset>);
      return (i == -1) ? #<nil> : i` 
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

    alias size length
  end

  class Number
    OBJECT_CONSTRUCTOR__ = "Number"

    class << self
      undef_method :new
      undef_method :allocate 
    end

    def to_s
      `return #<self>.toString()`
    end

    alias inspect to_s

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

  class Array
    OBJECT_CONSTRUCTOR__ = "Array"

    include Enumerable

    def each
      `for (var i=0; i < #<self>.length; i++) {`
      yield `#<self>[i]`
      `}`
      self
    end

    def each_with_index
      `for (var i=0; i < #<self>.length; i++) {`
      yield `#<self>[i]`, `i`
      `}`
      self
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
      `var v = #<self>[0]; return ((v === undefined || v === null) ? #<nil> : v)`
    end

    # TODO: check arrary bounds
    def [](i)
      `var v = #<self>[#<i>]; return ((v === undefined || v === null) ? #<nil> : v)`
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

    def pop
      `return #<self>.pop()`
    end

    def shift
      `return #<self>.shift()`
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
      `return('[' + #<self>.toString() + ']');`
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

  class Hash
    include Enumerable

    #
    # Construct an empty Hash
    #
    def initialize
      `
      #<self>.#<attr:items> = {}; 
      #<self>.#<attr:default_value> = #<nil>;
      `
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
      obj = allocate()
      `
      if (#<list>.length % 2 != 0) throw('ArgumentError');

      // 
      // we use an associate array to store the items. But unlike
      // Javascript, the entries are arrays which contain the collisions.
      // NOTE that we have to prefix the hash code with a prefix so that
      // there are no collisions with methods etc.   
      // I prefix it for now with 1.
      //
      var items = {};
      var hashed_key, current_key, current_val;
     
      for (var i = 0; i < #<list>.length; i += 2)
      {
        current_key = #<list>[i];
        hashed_key = "1" + current_key.#<m:hash>();
        current_val = #<list>[i+1];

        if (items[hashed_key] === undefined)
        {
          // 
          // create new bucket
          // a bucket stores all the elements with key collisions.
          //
          items[hashed_key] = [];
        }

        items[hashed_key].push(current_key, current_val);
      }

      #<obj>.#<attr:items> = items; 
      #<obj>.#<attr:default_value> = #<nil>;
      return #<obj>;
      `
    end

    def [](key)
      `
      var hashed_key = "1" + #<key>.#<m:hash>();
      var bucket = #<self>.#<attr:items>[hashed_key];

      if (bucket !== undefined)
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

    def []=(key, value)
      `
      var hashed_key = "1" + #<key>.#<m:hash>();
      var bucket = #<self>.#<attr:items>[hashed_key];

      if (bucket !== undefined)
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
        return #<value>;
      }
      else 
      {
        //
        // create new bucket
        //
        #<self>.#<attr:items>[hashed_key] = [#<key>, #<value>];
        return #<value>;
      }
      `
    end

    def keys
      map {|k,v| k}
    end

    def values
      map {|k,v| v}
    end

    def each 
      `
      var key, bucket, i;
      for (key in #<self>.#<attr:items>)
      {
        if (key[0] == "1")
        {
          bucket = #<self>.#<attr:items>[key];
          for (i=0; i<bucket.length; i+=2)
          {`
          yield `bucket[i]`, `bucket[i+1]`
          `
          }
        }
      }
      `
    end

    def inspect
      str = "{"
      str += map {|k, v| (k.inspect + " => " + v.inspect) }.join(", ")
      str += "}"
      str
    end

  end

end; end
