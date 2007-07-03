module RubyJS
  module Environment
    class Test
      def b 
        `return true`
      end

      def a(a,b=a,c=2,*args,&block)
        b(*args, &block)

        p 1, 2, 3
        p 2
        a.b()

        a = b = c = 1
        l = 1
        l = @hallo
        @hallo = 1;

        if @hallo == 4
          a = b
        elsif true
        else
        end

        a = if true then 1 else 5 end

        while true
          a += 1
          a += 2
        end

        return 3
      end
    end
  end
end

if __FILE__ == $0
  require 'rubygems'
  require 'compiler'
  require 'model'
  require 'encoder'

  require 'core'

  def generate_class_declaration(model, encoder, assign=true, _class=nil, object_constructor=nil, use_superclass=true)
    # to interpolates it's string
    ipol = encoder.method(:interpolate)

    h = {}
    h["_class"] = _class if _class 
    h["object_constructor"] = object_constructor if object_constructor

    #
    # Instance methods
    #
    m = {}
    model[:instance_methods].each_pair do |name, pt|
      encoder.with_local do 
        m[name] = MethodCompiler.new(encoder).compile_method(pt)
      end
    end
    unless m.empty?
      h["instance_methods"] = "{" + m.map {|name, fn| ipol["#<m:#{name}>"] + ": #{fn}" }.join(",") + "}"
    end

    #
    # Class methods
    #
    m = {}
    model[:methods].each_pair do |name, pt|
      encoder.with_local do 
        m[name] = MethodCompiler.new(encoder).compile_method(pt)
      end
    end
    unless m.empty?
      h["methods"] = "{" + m.map {|name, fn| ipol["#<m:#{name}>"] + ": #{fn}" }.join(",") + "}"
    end

    h["classname"] = model[:name].inspect

    if model[:superclass] and use_superclass
      h["superclass"] = ipol["#<#{model[:superclass_name]}>"]   # FIXME: name of constants?
    else
      # we need this as def_class expects a nil value if no superclass
      # is given!
      h["superclass"] = ipol["#<nil>"]
    end

    #
    # TODO: modules and included modules
    #
    raise if model[:is_a] != :class

    str = ""

    str << ipol["#<#{model[:name]}>"] + " = " if assign
      
    str << ipol["#<globalattr:def_class>"] + "({" + 
          h.map {|k, v| ipol["#<attr:#{k}>"] + ": #{v}"}.join(",") + 
          "});"

    return str
  end

  model = Model.new
  encoder = Encoder.new

  class_model = model.model_for(RubyJS::Environment::Class) 
  object_model = model.model_for(RubyJS::Environment::Object)
  array_model = model.model_for(RubyJS::Environment::Array)
  
  # to interpolates it's string
  ipol = encoder.method(:interpolate)

  str = ""
  str << ipol[RUNTIME_INIT]

  str << generate_class_declaration(class_model, encoder, true, 
    ipol[%[new #<globalattr:MetaClass>(#<globalattr:MetaClass>, #<nil>, "Class", #<globalattr:MetaClass>)]],
     obj_cons=nil, use_superclass=false)

  str << generate_class_declaration(object_model, encoder, true) 

  str << ipol[<<-EOS]
    #<Class>.#<attr:superclass> = #<Object>;
    #<globalattr:def_class>({#<attr:_class>: #<Class>});  // rebuild
    #<globalattr:def_class>({#<attr:_class>: #<Object>}); // rebuild
  EOS

  str << generate_class_declaration(array_model, encoder, true, nil, "Array") 


  str << ipol[<<EOS]
function test() {
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
}
EOS

  encoder.with_local do
    puts encoder.strip_ws_from_js_code(str)
  end
end
