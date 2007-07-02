#
# attr:xxxx -> different scope than methods/instance variables
# Class -> encode constant in global scope  
#

class Encoder

  def initialize
    @method_and_ivar_name_generator = NameGenerator.new
    reset_local_name_generator!
  end

  def reset_local_name_generator!
    @local_name_generator = NameGenerator.new
  end

  def encode_nil
    'nil'
  end

  def encode_self
    'this'
  end

  def encode_constant(const)
    raise
  end

  #
  # Encodes a Javascript attribute name.
  # This is used in the runtime environment of RubyJS to obfuscate
  # attribute names. They have their own namespace and don't clash
  # with method names or instance variable names!
  #
  def encode_attr(name)
    raise
  end

  #
  # A global attribute. Similar to encode_attr(), but for the global
  # scope (used by the def_class() Javascript function).
  #
  def encode_globalattr(gattr)
    raise
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

end

