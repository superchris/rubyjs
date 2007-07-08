#
# Generate Javascript code. 
#
# Copyright (c) 2007 by Michael Neumann (mneumann@ntecs.de).
# All rights reserved.
#

require 'compiler'
require 'model'
require 'set'

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

  def generate(additional_code="")
    str = ""

    # Code of runtime
    str << ipol(RUNTIME_INIT)

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
    str << @world.encode_globalattr('rebuild_classes') + "([" + klasses.join(",") + "]);"

    #
    # add additional code
    #
    str << ipol(additional_code)

    return @world.strip_ws_from_js_code(str)
  end

  def b_methods(kind, model, h)
    m = {}
    model[kind].each_pair do |name, pt|
      @world.with_local do 
        m[name] = MethodCompiler.new(@world).compile_method(pt)
      end
    end
    unless m.empty?
      h[kind.to_s] = "{" + m.map {|name, fn| @world.encode_method(name) + ": #{fn}" }.join(",") + "}"
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
      h["superclass"] = @world.encode_constant(@world.namify(model[:superclass]))
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
