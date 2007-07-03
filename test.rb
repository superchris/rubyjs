module RubyJS
  module Environment
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
  end
end

if __FILE__ == $0
  require 'rubygems'
  require 'compiler'
  require 'model'
  require 'encoder'

  model = Model.new
  encoder = Encoder.new
  compiler = RubyToJavascriptCompiler.new(encoder) 

  m = model.model_for(RubyJS::Environment::Test)

  m[:instance_methods].each_pair do |name, pt|
    encoder.reset_local_name_generator!
    puts compiler.compile(pt)
  end
end
