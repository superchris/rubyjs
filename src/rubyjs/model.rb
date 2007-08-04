#
# Extract the class/module hierarchy and the methods.
#
# Copyright (c) 2007 by Michael Neumann (mneumann@ntecs.de).
# All rights reserved.
#

require 'parse_tree'
require 'sexp_processor'
require 'enumerator'
require 'rubyjs/encoder'
require 'set'

class MethodExtractor < SexpProcessor
  attr_accessor :instance_methods, :methods

  def initialize
    super()

    self.strict = false 
    self.auto_shift_type = false
    self.require_empty = false

    @instance_methods = {} 
    @methods = {} 
  end

  def process_defn(exp)
    defn, name, code = *exp  
    name = name.to_s
    if name =~ /^self\.(.*)$/
      @methods[$1] = exp
    else
      @instance_methods[name] = exp
    end
    return s()
  end
end

class Model < Encoder
  SCOPE_R = /^RubyJS::Environment::(.*)$/

  attr_accessor :models

  def initialize
    super()

    #
    # record all (potential) names of all method calls
    #
    @method_calls = Set.new


    @models = {}

    # all modules and classes (a Class is_a Module)
    ObjectSpace.each_object {|o| 
      @models[o] = model_for(o) if o.is_a?(::Module) && o.name =~ SCOPE_R
    }
  end

  def add_method_call(name)
    @method_calls.add(name)
  end

  def iterate_all(seen, &block)
    @models.each_value do |v|
      iterate_rec(v, seen, &block)
    end
  end

  def iterate_rec(model, seen, &block)
    return if seen.include?(model[:for])
    iterate_rec(@models[model[:superclass]], seen, &block) if model[:superclass]

    model[:modules].each do |m|
      iterate_rec(@models[m], seen, &block)
    end

    block.call(model)
    seen.add(model[:for])
  end 

  def namify(klass)
    name = klass.name
    if name =~ SCOPE_R
      name = $1
    else
      raise "must be scoped inside RubyJS module"
    end
    return name
  end

  def model_for(klass)
    name = namify(klass)

    me = MethodExtractor.new
    me.process(ParseTree.new.parse_tree(klass))

    if klass.is_a?(::Class)
      a = klass.ancestors
      a = a[0...(a.index(::Object))]

      s = klass.superclass
      s = nil if s == ::Object

      # remove klass from the ancestor chain
      a = a[1..-1] if a[0] == klass

      # a now contains the included modules
      a = a[0...(a.index(s))] if s

      if klass == RubyJS::Environment::Object
        raise unless s.nil?
        s = nil
      else
        if s.nil?
          s = RubyJS::Environment::Object
        end
      end

      return {
        :for => klass,
        :modules => a,
        :superclass => s,
        :is_a => :class,
        :name => name,
        :instance_methods => me.instance_methods,
        :methods => me.methods
      }
    elsif klass.is_a?(::Module)
      a = klass.ancestors

      # remove klass from the ancestor chain
      a = a[1..-1] if a[0] == klass

      return {
        :for => klass,
        :modules => a,
        :is_a => :module,
        :name => name,
        :instance_methods => me.instance_methods,
        :methods => me.methods
      }
    else
      raise
    end
  end
end
