function def_class(h)
{
  var c = h._class || $Class.$new(h.superclass, h.classname, h.object_constructor);

  if (h.instance_methods)
  {
    for (key in h.instance_methods)
    {
      c.object_constructor.prototype[key] = h.instance_methods[key];
    }
  }

  if (h.methods)
  {
    for (key in h.methods) c[key] = h.methods[key];
  }

  if (h.modules)
  {
    for (var i=0; i<h.modules.length; i++)
    {
      c.modules.push(h.modules[i]);
    }
  }

  //
  // rebuild
  //

  // instance methods
  if (c.superclass)
  {
    for (var key in c.superclass.object_constructor.prototype)
    {
      if (c.object_constructor.prototype[key]===undefined)
      {
        c.object_constructor.prototype[key] = c.superclass.object_constructor.prototype[key];
      }
    }
  }

  // include modules
  for (var i=0; i<c.modules.length; i++)
  {
    for (var key in c.modules[i].object_constructor.prototype)
    {
      if (c.object_constructor.prototype[key]===undefined)
      {
        c.object_constructor.prototype[key] = c.modules[i].object_constructor.prototype[key];
      }
    }
  }

  // inherit class methods from superclass
  if (c.superclass)
  {
    for (var key in c.superclass)
    {
      if (c[key]===undefined)
      {
        c[key] = c.superclass[key];
      }
    }
  }

  return c;
}

function $$Class(klass, superclass, classname, object_constructor)
{
  this.superclass = superclass;
  this.classname = classname;
  this.object_constructor = object_constructor || (function() {});
  this.modules = [];
  this.klass = klass;
  return this;
}

$$Class.$name = function() {
  return "(Meta)Class";
}

$$Class.$class = function() {
  return this;
}

$Class = def_class({
  _class: new $$Class($$Class, null, "Class", $$Class),
  instance_methods: {
    $allocate: function() {
      var obj = new this.object_constructor();
      obj.klass = this; 
      return obj;
    },
    $new: function() {
      return this.$allocate();
    },
    $name: function() {
      return this.classname;
    }
  },
  methods: {
    $new: function(superclass, classname, object_constructor) {
      return new this.object_constructor($Class, superclass, classname, object_constructor);
    }
  }
});

$Object = def_class({
  superclass: null,
  classname: "Object",
  instance_methods: {
    $inspect: function() { return "halllooo" + this.toString(); },
    $class: function() {
      return this.klass;
    }
  },
  methods: {
    $say_hello: function() { alert('goooguuuck'); }
  }
});
 
$Class.superclass = $Object;

def_class({_class: $Class});  // rebuild
def_class({_class: $Object}); // rebuild

$Array = def_class({
  superclass: $Object,
  classname: "Array", 
  object_constructor: Array,
  instance_methods: {
    $to_a: function() { return this; },
    $inspect: function() { return "nur halllooo"; }
  }
});

/*
a = $Array.$new(); // => []
a.push(1);
a.push(2);
alert($Array.$name());
alert($Array.$class().$name());

alert($Class.$class().$name());
alert($Class.$name());

b = $Object.$new();

$Object.$say_hello();
$Array.$say_hello();
*/
