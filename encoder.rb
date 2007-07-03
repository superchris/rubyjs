#
# Encode all kind of variables or symbols for Javascript generation.
#
# Copyright (c) 2007 by Michael Neumann (mneumann@ntecs.de).
# All rights reserved.
#

require 'name_generator'

class Encoder
  def initialize
    @method_and_ivar_name_generator = NameGenerator.new
    @attribute_name_generator = NameGenerator.new
    @global_attribute_name_generator = NameGenerator.new
    @constant_name_generator = NameGenerator.new
    reset_local_name_generator!
  end

  def reset_local_name_generator!
    @local_name_generator = NameGenerator.new
  end

  def with_local
    reset_local_name_generator!
    res = yield
    reset_local_name_generator!
    return res
  end

  def encode_nil
    'nil'
  end

  def encode_self
    'this'
  end

  #
  # Constants are encoded with a preceding "$". Doesn't conflict with 
  # methods or instance variables, as they are always used in dot
  # notation while constants not.
  # 
  def encode_constant(name)
    "$" + @constant_name_generator.get(name.to_s)
  end

  #
  # Encodes a Javascript attribute name.
  # This is used in the runtime environment of RubyJS to obfuscate
  # attribute names. They have their own namespace and don't clash
  # with method names or instance variable names!
  #
  # Attributes are encoded with a preceding "a$". This doesn't conflict
  # with methods or instance variables, as they use "$".
  #
  def encode_attr(name)
    "a$" + @attribute_name_generator.get(name.to_s)
  end

  #
  # A global attribute. Similar to encode_attr(), but for the global
  # scope (used by the def_class() Javascript function).
  #
  # Global attributes are encoded with a "a$" prefix. They don't
  # conflict with attributes, because attributes are always used in dot
  # notation, wheres global attributes not. 
  #
  def encode_globalattr(name)
    "a$" + @global_attribute_name_generator.get(name.to_s)
  end

  #
  # Method names and instance variable names use the same generator.
  # They don't clash, as instance variables are prefixed with '@' (not
  # in the Javascript code, but in the Parse tree from Ruby). That's why
  # a different symbol name is generated.
  #
  def encode_method(name)
    "$" + @method_and_ivar_name_generator.get(name.to_s)
  end

  def encode_instance_variable(name)
    raise unless name.to_s[0,1] == '@'
    "$" + @method_and_ivar_name_generator.get(name.to_s)
  end

  def encode_local_variable(name)
    "_" + @local_name_generator.get(name.to_s)
  end

  def encode_fresh_local_variable
    "_" + @local_name_generator.fresh()
  end

  #
  # Interpolate a string that contains #<...> expressions. 
  #
  # Supported expressions:
  #
  #     #<method()>         # => encode_method("method")
  #     #<self>             # => encode_self()
  #     #<nil>              # => encode_nil()
  #     #<@ivar>            # => encode_instance_variable("@ivar")
  #     #<Constant>         # => encode_constant("Constant")
  #     #<attr:name>        # => encode_attr("name")
  #     #<globalattr:name>  # => encode_globalattr("name")
  #     #<variable>         # => encode_local_variable("variable")
  #
  def interpolate(str)
    str = str.gsub(/#<(.*?)>/) {
      case s = $1.strip
      when /^(\w+)\(\)$/        then encode_method($1) 
      when /^m:(\w+)$/          then encode_method($1) 
      when /^self$/             then encode_self()
      when /^nil$/              then encode_nil()
      when /^(@\w+)$/           then encode_instance_variable($1)
      when /^([A-Z]\w+)$/       then encode_constant($1) 
      when /^attr:(\w+)$/       then encode_attr($1)
      when /^globalattr:(\w+)$/ then encode_globalattr($1)
      when /^([a-z_]\w*)$/      then encode_local_variable($1)
      else
        raise
      end
    }
    return str
  end

  #
  # Note that this method only works correctly if each statment is
  # separated by ";", especially assignments like:
  #
  # a.x = function() {
  # };              <------- important!!!
  #
  def strip_ws_from_js_code(str)
    arr = []
    loop do 
      if str =~ /(["'])/
        arr << $~.pre_match
        post = $~.post_match
        s = $1
        if post =~ /^(([^#{s}]|\\.)*#{s})/
          str = $~.post_match
          arr << s + $1
        else
          raise
        end
      else
        arr << str
        break
      end
    end

    str = arr.map {|a|
      if a[0,1] == '"' || a[0,1] == "'"
        # keep strings as-is 
        a
      else
        a.gsub(/\/\/[^\n]*/,"").         # remove comments
          gsub(/\s*([^\w\$])\s*/) { $1 } # remove unneccessary whitespace
      end
    }.join("")

    # remove leading whitespace
    str = $~.post_match if str =~ /^\s*/

    return str
  end
end
