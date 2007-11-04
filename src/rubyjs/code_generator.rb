#
# Generate Javascript code. 
#
# Copyright (c) 2007 by Michael Neumann (mneumann@ntecs.de).
# All rights reserved.
#

require 'rubyjs/compiler'
require 'rubyjs/model'
require 'set'

RUNTIME_MM = <<EOS
//
// Generates a new method_missing function
// for the given symbol +sym+.
// 
var #<globalattr:mm_fun_cache> = {}; 
function #<globalattr:mm_fun>(sym)
{
  if (!#<globalattr:mm_fun_cache>[sym])
  {
    var fn = function() {
      return #<globalattr:call_method_missing>(this, arguments, sym);
    };
    fn.#<attr:_mm> = true;
    #<globalattr:mm_fun_cache>[sym] = fn;
  }

  return #<globalattr:mm_fun_cache>[sym];
}

function #<globalattr:call_method_missing>(obj, args, sym)
{
  var i, a;
  a = [];
  if (args.length == 0)
    a.push(#<nil>);
  else
    a.push(args[0]);

  a.push(#<globalattr:mm>[sym] || #<nil>);

  for (i=1; i<args.length; i++)
    a.push(args[i]);
  
  var m = obj.#<m:method_missing>;

  if (m)
    return m.apply(obj, a);
  else
    throw "FATAL: method_missing missing";
}

//
// assign method_missing stubs
//
function #<globalattr:mm_assign>(c)
{
  var i;

  for (i in #<globalattr:mm>)  
  {
    if (c.#<attr:object_constructor>.prototype[i]===undefined)
    {
      c.#<attr:object_constructor>.prototype[i] = #<globalattr:mm_fun>(i);
    }
  }

  if (c.#<attr:superclass> != #<nil>)
  {
    for (i in c.#<attr:superclass>)
    {
      if (c[i]===undefined)
      {
        c[i] = #<globalattr:mm_fun>(i);
      }
    }
  }
}
EOS

RUNTIME_INIT = <<EOS
// declare nil
function NilClass() {}

// FIXME: remove
NilClass.prototype.toString = function() { return "nil"; };
#<nil> = new NilClass();

//
// define a null-function (used by HTTPRequest)
//
function #<globalattr:null_func>()
{
}

//
// r: return value
// s: scope (method scope)
//
function #<globalattr:iter_jump>(r,s)
{
  this.#<attr:return_value> = r;
  this.#<attr:scope> = s; 
  return this;
}

//
// Throw in Javascript is a statement.
//
// This function can be used to overcome
// that limitation.
//
function #<globalattr:throw_expr>(x) { throw(x); }

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

function #<globalattr:zsupercall>(o, m, a) 
{
  var r = o[m]; // method in current class
  var c = o.#<attr:_class>.#<attr:superclass>;
  while (r === c.#<attr:object_constructor>.prototype[m])
    c = c.#<attr:superclass>;
  return c.#<attr:object_constructor>.prototype[m].apply(o, a);
}

//
// Whether o.kind_of?(c)
//
function #<globalattr:kind_of>(o, c)
{
  var k,i,m;

  k = o.#<attr:_class>;

  while (k != #<nil>)
  {
    if (k === c) return true;

    // check included modules
    m = k.#<attr:modules>;
    for (i=0; i<m.length; i++)
    {
      if (m[i] === c) return true;
    }

    k = k.#<attr:superclass>; 
  }

  return false;
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
  // the super class, a check for === undefined prevents this method 
  // from being overwritten.
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

  // set class for instanciated objects
  c.#<attr:object_constructor>.prototype.#<attr:_class> = c;
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




class CodeGenerator
  def initialize
    @world = Model.new
  end

  def def_Class
    m = @world.models[RubyJS::Environment::Class]

    str = ""
    str << generate_class_declaration(
      m,
      assign=true,
      _class=ipol(%[new #<globalattr:MetaClass>(#<globalattr:MetaClass>, #<nil>, "Class", #<globalattr:MetaClass>)]),
      obj_cons=nil,
      use_superclass=false,
      use_modules=false)

    str << @world.encode_globalattr('rebuild_class') + "(" + @world.encode_constant(m[:name]) + ");"

    str
  end

  def encode(code)
    return ipol(code)
  end
  
  def gen_mm_stubs
    # Method name mapping

    mm_stubs = ""
    mm_stubs << "// method map\n"
    mm_stubs << "var #<globalattr:mm> = {" 
    i = []
    # Javascript name -> Ruby name 
    @world.all_method_names do |k,v|
      i << "#{v.inspect}:#{k.inspect}" 
    end
    mm_stubs << i.join(",")
    mm_stubs << "};\n"
    mm_stubs << "var #<globalattr:mm_reverse> = {};\n"
    mm_stubs << "for (var i in #<globalattr:mm>) #<globalattr:mm_reverse>[#<globalattr:mm>[i]] = i;\n"

    ipol(mm_stubs)
  end

  def generate
    str = ""

    #
    # Code for Class
    #
    # Required at the beginning because all other classes are created as
    # objects from Class using Class.new.
    #
    str << def_Class()

    #
    # Now define all other classes/modules
    #

    @world.iterate_all(Set.new) do |m|

      #
      # We have to add the modules for class Class here.
      #
      if m[:for] == RubyJS::Environment::Class
        h = { "_class" => @world.encode_constant(m[:name]) }
        b_modules(m, h)
        str << b_def_class(h)
        next
      end

      begin
        obj_cons = m[:for].const_get(:OBJECT_CONSTRUCTOR__)
      rescue
        obj_cons = nil
      end

      str << generate_class_declaration(m, assign=true, _class=nil, obj_cons)
    end

    #
    # Class is a subclass of Object
    #
    str << ipol(<<-EOS)
      #<Class>.#<attr:superclass> = #<Object>;
    EOS

    #
    # rebuild all classes and modules
    #
    klasses = []
    @world.iterate_all(Set.new) do |m|
      klasses << @world.encode_constant(m[:name])
    end
    str << ipol("var #<globalattr:klasses> = [#{klasses.join(",")}];\n" + 
                "#<globalattr:rebuild_classes>(#<globalattr:klasses>);\n")

    unless $RUBYJS__OPTS.include?('NoMethodMissing')
      str << ipol("for (var i=0; i<#<globalattr:klasses>.length; i++) #<globalattr:mm_assign>(#<globalattr:klasses>[i]);\n")
    end

    #
    # prepend
    #
    
    str_prep = ""

    # Code of runtime
    str_prep << ipol(RUNTIME_INIT)

    unless $RUBYJS__OPTS.include?('NoMethodMissing')
      str_prep << ipol(RUNTIME_MM)
      str_prep << gen_mm_stubs()
    end

    return str_prep + str
  end

  def b_methods(kind, model, h)
    m = {}
    model[kind].each_pair do |name, pt|
      @world.with_local do 
        m[name] = MethodCompiler.new(@world, @world.encode_method(name)).compile_method(pt)
      end
    end
    unless m.empty?
      h[kind.to_s] = "{" + m.map {|name, fn| 
        if $RUBYJS__OPTS.include?('PrettyPrint')
          @world.encode_method(name) + ":\n" + 
          %[/* #{ model[:name] }#{kind.to_s == "methods" ? "." : "#"}#{ name } */\n#{fn}\n\n]
        else
          @world.encode_method(name) + ": #{fn}" 
        end
      }.join(",") + "}"
    end
  end

  def b_modules(model, h)
    h["modules"] = "[" + model[:modules].map {|m|
      @world.encode_constant(@world.namify(m))
    }.join(",") + "]"
  end

  def b_def_class(h)
    @world.encode_globalattr('def_class') + "({" + 
    h.map {|k, v| @world.encode_attr(k) + ": #{v}"}.join(",") + "});"
  end

  def generate_class_declaration(model, assign=true, _class=nil, object_constructor=nil, use_superclass=true, use_modules=true)
    h = {}
    h["_class"] = _class if _class 
    h["object_constructor"] = object_constructor if object_constructor

    b_methods(:instance_methods, model, h)
    b_methods(:methods, model, h)

    h["classname"] = model[:name].inspect

    if model[:superclass] and use_superclass
      h["superclass"] = @world.old_encode_constant(@world.namify(model[:superclass]))
    else
      # we need this as def_class expects a nil value if no superclass
      # is given!
      h["superclass"] = @world.encode_nil
    end

    b_modules(model, h) if use_modules

    str = ""
    str << @world.encode_constant(model[:name]) + " = " if assign
    str << b_def_class(h)

    return str
  end

  private

  # iterpolate strings
  def ipol(str)
    @world.interpolate(str)
  end
end
