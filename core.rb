require 'encoder'

INIT_CODE = <<EOS
function #<globalattr:def_class>(h)
{
  var c,k,i;
  c = h.#<attr:_class> || #<Class>.#<m:new>(h.#<attr:superclass>, h.#<attr:classname>, h.#<attr:object_constructor>);

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
  if (c.#<attr:superclass>)
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
  if (c.#<attr:superclass>)
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
  #<self>.#<attr:object_constructor> = #<object_constructor> || (function() {});
  #<self>.#<attr:modules> = [];
  #<self>.#<attr:_class> = #<_class>;
  return #<self>;
}

#<globalattr:MetaClass>.#<m:name> = function()
{
  return "(Meta)Class";
};

#<globalattr:MetaClass>.#<m:class> = function()
{
  return #<self>;
};

#<Class> = #<globalattr:def_class>({
  #<attr:_class>: new #<globalattr:MetaClass>(#<globalattr:MetaClass>, null, "Class", #<globalattr:MetaClass>),
  #<attr:instance_methods>: {
    #<m:allocate>: function() {
      var o = new #<self>.#<attr:object_constructor>();
      o.#<attr:_class> = #<self>; 
      return o;
    },
    #<m:new>: function() {
      return #<self>.#<m:allocate>();
    },
    #<m:name>: function() {
      return #<self>.#<attr:classname>;
    }
  },
  #<attr:methods>: {
    #<m:new>: function(#<superclass>, #<classname>, #<object_constructor>) {
      return new #<self>.#<attr:object_constructor>(#<Class>, #<superclass>, #<classname>, #<object_constructor>);
    }
  }
});

#<Object> = #<globalattr:def_class>({
  #<attr:superclass>: null,
  #<attr:classname>: "Object",
  #<attr:instance_methods>: {
    #<m:inspect>: function() { return "halllooo" + #<self>.toString(); },
    #<m:class>: function() {
      return #<self>.#<attr:_class>;
    }
  },
  #<attr:methods>: {
    #<m:say_hello>: function() { alert('goooguuuck'); }
  }
});
 
#<Class>.#<attr:superclass> = #<Object>;

#<globalattr:def_class>({#<attr:_class>: #<Class>});  // rebuild
#<globalattr:def_class>({#<attr:_class>: #<Object>}); // rebuild

#<Array> = #<globalattr:def_class>({
  #<attr:superclass>: #<Object>,
  #<attr:classname>: "Array", 
  #<attr:object_constructor>: Array,
  #<attr:instance_methods>: {
    #<m:to_a>: function() { return #<self>; },
    #<m:inspect>: function() { return "nur halllooo"; }
  }
});

a = #<Array>.#<m:new>(); // => []
a.push(1);
a.push(2);
alert(#<Array>.#<m:name>());
alert(#<Array>.#<m:class>().#<m:name>());

alert(#<Class>.#<m:class>().#<m:name>());
alert(#<Class>.#<m:name>());

b = #<Object>.#<m:new>();

#<Object>.#<m:say_hello>();
#<Array>.#<m:say_hello>();
EOS

str = Encoder.new.interpolate(INIT_CODE)
puts Encoder.new.strip_ws_from_js_code(str)

=begin
class Class
  def allocate
    `var o = new #<self>.#<attr:object_constructor>();
     o.#<attr:_class> = #<self>;
     return o;`
  end

  def new
    allocate()
  end

  def name
    `return #<self>.#<attr:classname>;`
  end

  def self.new(superclass, classname, object_constructor)
    `return new #<self>.#<attr:object_constructor>(#<Class>, #<superclass>, #<classname>, #<object_constructor>);`
  end
end

class Object
end
=end
