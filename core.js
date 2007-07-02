function $$Class(klass, superclass, classname, object_constructor)
{
  this.superclass = superclass;
  this.classname = classname;
  this.object_constructor = object_constructor || (function() {});
  this.modules = [];
  this.klass = klass;
  this.rebuild();
  return this;
}

$$Class.prototype = {
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
  },
  add_instance_methods: function(hash) {
    for (key in hash)
    {
      this.object_constructor.prototype[key] = hash[key];
    }
  },
  add_methods: function(hash) {
    for (key in hash)
    {
      this[key] = hash[key];
    }
  },
  rebuild: function() {
    // instance methods
    if (this.superclass)
    {
      for (var key in this.superclass.object_constructor.prototype)
      {
        if (this.object_constructor.prototype[key]===undefined)
        {
          this.object_constructor.prototype[key] = this.superclass.object_constructor.prototype[key];
        }
      }
    }

    // include modules
    for (var i=0; i<this.modules.length; i++)
    {
      for (var key in this.modules[i].object_constructor.prototype)
      {
        if (this.object_constructor.prototype[key]===undefined)
        {
          this.object_constructor.prototype[key] = this.modules[i].object_constructor.prototype[key];
        }
      }
    }

    // inherit class methods from superclass
    if (this.superclass)
    {
      for (var key in this.superclass)
      {
        if (this[key]===undefined)
        {
          this[key] = this.superclass[key];
        }
      }
    }
  },
  include_module: function(module) {
    this.modules.push(module);
    this.rebuild();
  }
};

$$Class.$name = function() {
  return "(Meta)Class";
}

$$Class.$class = function() {
  return this;
}

$Class = new $$Class($$Class, null, "Class", $$Class);
$Class.$new = function(superclass, classname, object_constructor)
{
  return new this.object_constructor($Class, superclass, classname, object_constructor);
}

$Object = $Class.$new(null, "Object");
$Object.add_instance_methods({
  $inspect: function() { return "halllooo" + this.toString(); },
  $class: function() {
    return this.klass;
  }
});

$Object.add_methods({
  $say_hello: function() { alert('goooguuuck'); },
});

$Class.superclass = $Object;
$Class.rebuild();
$Object.rebuild();

// now add object as superclass to $Class and rebuild prototype
 
// object constructor can also be "function() {}", for custom objects.
$Array = $Class.$new($Object, "Array", Array);

$Array.add_instance_methods({
  $to_a: function() { return this; },
  $inspect: function() { return "nur halllooo"; }
});

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
