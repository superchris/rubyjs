#
# Extract the class/module hierarchy and the methods.
#
# Copyright (c) 2007 by Michael Neumann (mneumann@ntecs.de).
# All rights reserved.
#

require 'parse_tree'

module RubyJS
  module Environment
    class Object
    end
    class Class
    end
  end
end

class Model
  def initialize
    @pt = ParseTree.new
  end

  def parse_tree_for_instance_method(klass, method)
    @pt.parse_tree_for_method(klass, method, false)
  end

  def parse_tree_for_class_method(klass, method)
    @pt.parse_tree_for_method(klass, method, true)
  end

  def instance_methods_for_class(klass)
    methods = {} 
    klass.instance_methods.each do |m|
      t = parse_tree_for_instance_method(klass, m)
      methods[m] = t if is_method(t)
    end
    methods
  end

  #
  # Class methods
  #
  def methods_for_class(klass)
    methods = {} 
    (klass.methods - klass.class.methods).each do |m|
      t = parse_tree_for_class_method(klass, m)
      methods[m] = t if is_method(t)
    end
    methods
  end


  #
  # Returns true if the parse tree contains a method that we
  # are interested in. We are only interested in methods that are
  # actually defined directly in that class or module that we are
  # querying. 
  #
  def is_method(parsetree)
    return false if parsetree[0] == nil
    if parsetree[0] == :defn
      if parsetree[2] && parsetree[2][0] == :cfunc
        return false
      end
      return true
    else
      return false
    end
  end

  def model_for(klass)
    name = klass.name

    if name =~ /^RubyJS::Environment::(.*)$/
      name = $1
    else
      raise "must be scoped inside RubyJS module"
    end

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
        :modules => a,
        :superclass => s,
        :is_a => :class,
        :name => name,
        :instance_methods => instance_methods_for_class(klass),
        :methods => methods_for_class(klass) 
      }
    elsif klass.is_a?(::Module)
      a = klass.ancestors

      # remove klass from the ancestor chain
      a = a[1..-1] if a[0] == klass

      return {
        :modules => a,
        :is_a => :module,
        :name => name,
        :instance_methods => instance_methods_for_class(klass),
        :methods => methods_for_class(klass)
      }
    else
      raise
    end
  end
end
