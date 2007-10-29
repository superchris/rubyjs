#
# Generate Javascript code. 
#
# Copyright (c) 2007 by Michael Neumann (mneumann@ntecs.de).
# All rights reserved.
#

require 'rubyjs/compiler'
require 'rubyjs/model'
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
