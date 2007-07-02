class Test
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

if __FILE__ == $0
  require 'compiler'
  def process(klass, method)
    exp = ParseTree.new.parse_tree_for_instance_method(klass, method)
    pp exp
    encoder = Encoder.new
    compiler = RubyToJavascriptCompiler.new(encoder)
    p compiler.process(exp)
    p compiler.method_calls
    encoder.reset_local_name_generator!
  end

  process(Test, :a)
end
