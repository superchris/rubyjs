#
# Runtime and core classes for the Javascript side 
#
# Copyright (c) 2007 by Michael Neumann (mneumann@ntecs.de).
# All rights reserved.
#

RUNTIME_INIT = <<EOS
// declare nil
function NilClass() {}
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

  //
  // rebuild
  //

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

  // include modules
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

  class NilClass
    OBJECT_CONSTRUCTOR__ = "NilClass"

    def nil?
      true
    end

    def to_s
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
        # TODO
        #yield
      end
    end

    # TODO
    def raise
    end
  end

  class Object
    include Kernel

    def eql?(other)
      `return (#<self> === #<other>)`
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

    def alert(str)
      str = str.to_s
      `alert(#<str>); return #<nil>`
    end
  end

=begin
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
        cond = yield(elem)
        if cond
          result << elem 
        end
      }
      result
    end
    alias find_all select

    def reject
      result = []
      each {|elem|
        cond = yield(elem)
        unless cond
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
=end
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

  class NilClass
    class << self
      undef_method :new
      undef_method :allocate 
    end

    def nil?
      true
    end 

    def inspect
      "nil"
    end
  end 

  # TODO: make undef_method working
  class Number
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

    def +(x)  `return #<self> + #<x>` end
    def -(x)  `return #<self> - #<x>` end
    def *(x)  `return #<self> * #<x>` end
    def /(x)  `return #<self> / #<x>` end
    def <(x)  `return #<self> < #<x>` end
    def <=(x) `return #<self> <= #<x>` end
    def >(x)  `return #<self> > #<x>` end
    def >=(x) `return #<self> >= #<x>` end
    def ==(x) `return #<self> == #<x>` end
    def %(x)  `return #<self> % #<x>` end

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

    #include Enumerable

    def each
      `for (var i=0; i < #<self>.length; i++) {`
      yield `#<self>[i]`
      `}`
      self
    end

    def each_with_index
      `for (var i=0; i < self.length; i++) {`
      yield `self[i]`, `i`
      `}`
      self
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

    # TODO: check arrary bounds
    def [](i)
      `var val = #<self>[#<i>]; return ((val === undefined || val === null) ? #<nil> : val)`
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
   
    def unshift(*args)
      `#<self>.unshift.apply(#<self>, #<args>); return #<self>`
    end

    def empty?
      `return (#<self>.length == 0)`
    end

    def to_s
      `return('[' + #<self>.toString() + ']');`
    end

    # TODO: inspect elements as well
=begin
    def inspect
      str = "["
      self.each_with_index {|elem, i|
        str += elem.inspect
        str += ", " if i != self.length-1
      }
      str += "]"
      str
    end
=end

=begin
=end

    # FIXME: don't hard code eql? formatting. implement and use #<eql?> expression.
=begin
    def eql?(other)
      `
      if (!(#<other> instanceof Array)) return false;
      if (self.length != #<other>.length) return false;  
 
      /*
       * compare element-wise
       */
      for (var i = 0; i < self.length; i++) 
      {
        if (!rubyjs_test(rubyjs_send(self[i], '__eql$q', [#<other>[i]], null)))
        {
          /* 
           * at least for one element #eql? holds not true
           */
          return false;
        }
      }
      
      return true;
      `
    end
=end
    def self.iter
      yield
      yield 1
      yield [1]
      yield 1,2
    end

    def self.iter2(&block)
      block.call
      block.call(1)
      block.call([1])
      block.call(1,2)
    end


    def self.test
      1.upto(3) do |i| alert(i) end

      [1,2,3,"hallo"].each_with_index do |v, i|
        alert(v)
        alert(i)
      end
      
      iter do |i,j|
        alert(i)
        alert(j)
      end
    end
  end
end; end
