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

  def generate(additional_code="")
    str = ""

    # Code of runtime
    str << ipol(RUNTIME_INIT)

    # Code for Class
    str << generate_class_declaration(
             @world.models[RubyJS::Environment::Class],
             assign=true,
             _class=ipol(%[new #<globalattr:MetaClass>(#<globalattr:MetaClass>, #<nil>, "Class", #<globalattr:MetaClass>)]),
             obj_cons=nil,
             use_superclass=false)

    # Code for Object
    str << generate_class_declaration(
             @world.models[RubyJS::Environment::Object],
             assign=true) 
    
    # Code to make Class a subclass of Object and rebuild everything
    str << ipol(<<-EOS)
      #<Class>.#<attr:superclass> = #<Object>;
      #<globalattr:def_class>({#<attr:_class>: #<Class>});  // rebuild
      #<globalattr:def_class>({#<attr:_class>: #<Object>}); // rebuild
    EOS

    # Now generate code for all remaining classes/modules
    seen = Set.new([RubyJS::Environment::Class, RubyJS::Environment::Object])
    @world.iterate_all(seen) do |m|
      next if m[:is_a] != :class # TODO
      begin
        obj_cons = m[:for].const_get(:OBJECT_CONSTRUCTOR__)
      rescue
        obj_cons = nil
      end

      str << generate_class_declaration(
               m,
               assign=true,
               _class=nil,
               obj_cons)
    end

    str << ipol(additional_code)

    return @world.strip_ws_from_js_code(str)
  end
  
  def generate_class_declaration(model, assign=true, _class=nil, object_constructor=nil, use_superclass=true)
    h = {}
    h["_class"] = _class if _class 
    h["object_constructor"] = object_constructor if object_constructor

    #
    # Instance methods
    #
    m = {}
    model[:instance_methods].each_pair do |name, pt|
      @world.with_local do 
        m[name] = MethodCompiler.new(@world).compile_method(pt)
      end
    end
    unless m.empty?
      h["instance_methods"] = "{" + m.map {|name, fn| @world.encode_method(name) + ": #{fn}" }.join(",") + "}"
    end

    #
    # Class methods
    #
    m = {}
    model[:methods].each_pair do |name, pt|
      @world.with_local do 
        m[name] = MethodCompiler.new(@world).compile_method(pt)
      end
    end
    unless m.empty?
      h["methods"] = "{" + m.map {|name, fn| @world.encode_method(name) + ": #{fn}" }.join(",") + "}"
    end

    h["classname"] = model[:name].inspect

    if model[:superclass] and use_superclass
      h["superclass"] = ipol("#<#{model[:superclass_name]}>")   # FIXME: name of constants?
    else
      # we need this as def_class expects a nil value if no superclass
      # is given!
      h["superclass"] = @world.encode_nil
    end

    #
    # TODO: modules and included modules
    #
    raise if model[:is_a] != :class

    str = ""

    str << ipol("#<#{model[:name]}>") + " = " if assign
      
    str << ipol("#<globalattr:def_class>") + "({" + 
          h.map {|k, v| ipol("#<attr:#{k}>") + ": #{v}"}.join(",") + 
          "});"

    return str
  end

  private

  # iterpolate strings
  def ipol(str)
    @world.interpolate(str)
  end
end
