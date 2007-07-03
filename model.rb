#
# Extract the class/module hierarchy and the methods.
#
# Copyright (c) 2007 by Michael Neumann (mneumann@ntecs.de).
# All rights reserved.
#

require 'parse_tree'
require 'sexp_processor'

module RubyJS
  module Environment
    class Object
    end
    class Class
    end
  end
end

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

class Model
  def model_for(klass)
    name = klass.name

    if name =~ /^RubyJS::Environment::(.*)$/
      name = $1
    else
      raise "must be scoped inside RubyJS module"
    end

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

      sn = nil
      if s
        sn = s.name
        if sn =~ /^RubyJS::Environment::(.*)$/
          sn = $1
        else
          raise "must be scoped inside RubyJS module"
        end
      end

      return {
        :modules => a,
        :superclass => s,
        :superclass_name => sn,
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
