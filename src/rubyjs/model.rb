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

  def process_defs(exp)
    defs, _self, name, code, *r = *exp
    raise unless r.empty?
    raise unless _self == s(:self)

    @methods[name.to_s] = s(:defn, name, code) 
    return s()
  end

  def process_defn(exp)
    defn, name, code, *r = *exp  
    raise unless r.empty?

    @instance_methods[name.to_s] = exp
    return s()
  end
end

class Model < Encoder
  SCOPE_R = /^RubyJS::Environment::(.*)$/

  attr_accessor :models
  attr_accessor :current_model

  attr_reader :method_calls

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

    with_current_model(model) do 
      block.call(model)
    end
    seen.add(model[:for])
  end 

  alias old_encode_constant encode_constant

  def encode_constant(name)
    if @current_model
      lookup_constant(name)
    else
      old_encode_constant(name)
    end
  end

  #
  # Compile time constant lookup.
  #
  # Lookup rules (like Ruby 1.9+):
  #
  #   1. Current class
  #   2. Super classes except object
  #   3. lexically enclosing modules/classes
  #   4. Object
  #
  def lookup_constant(name)
    model = @current_model
    prefix, *path = name.split("::")

    start_lookup_at = nil
    done = false

    if prefix.empty?
      # e.g. "::A"
      start_lookup_at = RubyJS::Environment
      done = true
    else

      # 1. Current class
      if model[:for].constants.include?(prefix)
        start_lookup_at = model[:for].const_get(prefix)
        done = true
      end

      # 2. Super classes except object 
      unless done
        m = model
        loop do
          if m[:superclass] and m[:superclass] != RubyJS::Environment::Object
            if m[:superclass].constants.include?(prefix)
              start_lookup_at = m[:superclass].const_get(prefix)
              done = true
              break
            else
              m = @models[m[:superclass]]
            end
          else
            break
          end
        end
      end

      # 3. lexically enclosing modules/classes
      # FIXME
      unless done
        arr = model[:name].split("::")
        loop do
          arr.pop

          begin
            start_lookup_at = eval((["RubyJS", "Environment"] + arr + [prefix]).join("::"))
            done = true
            break
          rescue NameError
          end

          break if arr.empty?
        end
      end

      # 4. Object
      unless done
        begin
          start_lookup_at = RubyJS::Environment::Object.const_get(prefix)
          done = true
        rescue NameError
        end
      end

    end

    unless done
      raise "failed to lookup constant prefix #{prefix}" 
    end

    #
    # follow the whole path, e.g. A::B::C
    #
    value = start_lookup_at
    path.each do |piece|
      value = value.const_get(piece)
    end

    if value.is_a?(::Class) or value.is_a?(::Module)
      # A class or module

      if model = @models[value]
        return old_encode_constant(model[:name])
      else
        raise("unrecognized class/module referenced by constant")
      end
    else
      # A value
      if value.is_a?(Fixnum)
        # If it is the receiver of a method call, we have to surround it
        # with parens, e.g. (1).
        # As we can't easily decide whether it's a receiver of a method
        # call, we simply surround every constant Fixnum with parens.
        return "(" + value.inspect + ")"
      elsif value.is_a?(String)
        # FIXME: Generate a reference instead?
        return value.inspect
      else
        raise
      end
    end
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

  def with_current_model(model)
    old_current_model = @current_model 
    @current_model = model
    begin
      yield
    ensure
      @current_model = old_current_model
    end
  end

  def model_for(klass)
    name = namify(klass)

    me = MethodExtractor.new
    me.process(*ParseTree.new.parse_tree(klass))

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
