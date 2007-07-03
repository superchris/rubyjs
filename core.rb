require 'encoder'

RUNTIME_INIT = <<EOS
// declare nil
#<nil> = new Object(); 

function #<globalattr:to_splat>(a)
{
  // TODO
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
  #<self>.#<attr:superclass> = #<superclass>;
  #<self>.#<attr:classname> = #<classname>;
  #<self>.#<attr:object_constructor> = #<object_constructor>;
  #<self>.#<attr:modules> = [];
  #<self>.#<attr:_class> = #<_class>;
  return #<self>;
}

#<globalattr:MetaClass>.#<m:name> = function() { return "MetaClass"; };
#<globalattr:MetaClass>.#<m:class> = function() { return #<self>; };
EOS

module RubyJS::Environment
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

  class Object
    def __invoke(id, args, &block)
      `return #<self>[#<id>].apply(#<self>, [#<block>].concat(#<args>));`
    end

    def initialize
    end

    def self.say_hello
      `alert('goooguuuck')`
    end

    def inspect
      `return "halllooo" + #<self>.toString()`
    end

    def class
      `return #<self>.#<attr:_class>`
    end
  end

  class Array
    def to_a
      self
    end

    def inspect
      "Array#inspect"
    end
  end
end
