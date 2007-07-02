require 'rubygems'
require 'parse_tree'
require 'sexp_processor'
require 'set'
require 'pp'
require 'name_generator'

class ParseTree
  def parse_tree_for_instance_method(klass, method)
    parse_tree_for_method(klass, method, false)
  end

  def parse_tree_for_class_method(klass, method)
    parse_tree_for_method(klass, method, true)
  end
end

class RubyToJavascriptCompiler < SexpProcessor

  RESULT_VAR = "r"

  attr_accessor :method_calls

  def initialize(attribute_name_generator)
    super()
    
    # don't stop at unknown nodes
    self.strict = false 

    # remove the type from the sexp array
    self.auto_shift_type = true

    # warn whenever the default method is called, i.e.
    # an unknown sexp is processed.
    self.warn_on_default = true

    # expected result class
    self.expected = String

    #@current_iter_dvars = nil
    #@iter_dvars_stack = []

    #
    # This name generator is used for methods and instance variables
    # (both summarized as "attributes"). 
    #
    @attribute_name_generator = attribute_name_generator 

    # We use a second name generator for local variables. 
    # There is no problem when method and local variable names clash, 
    # as methods are always called in dot notation. Using a second name
    # generator uses slighly less longer variable names.
    @local_variable_name_generator = NameGenerator.new

    #
    # record all (potential) names of all method calls
    #
    @method_calls = Set.new

    # 
    # record all local variables
    #
    @local_variables = Set.new

    #
    # contains all argument variables except "*args"
    #
    @arguments_no_splat = []

    #
    # Contains the name of a splat argument "*args" 
    # or nil if none has been specified.
    #
    @argument_splat = nil

    #
    # If the result should be an expression, this is set to true.
    #
    @want_expression = false

    #
    # Usually each method introduces a new local variable scope. 
    # Make sure that there is no nested :scope.
    # 
    @scope_nesting = 0


    @block_nesting = 0

    #
    # We collect all instance variable reads, because they might not be
    # initialized yet and we want them to be initialized as "nil"!
    #
    @read_instance_variables = Set.new

    #
    # Used to write down all used temporary variables, so that we can
    # declare them. 
    #
    @all_temporary_variables = Set.new

    #
    # Use to reuse unused temporary variables
    #
    @temporary_variables_pool = []


    @want_result = 0
  end

  #
  # 
  #
  def want_expression
    old = @want_expression
    @want_expression = true
    res = yield 
    @want_expression = old
    return res
  end

  #
  # There exist a short cut in the node tree for simple getter and
  # setter-methods:
  # 
  #   [:defn, :method_name, [:ivar, :variable_name]]
  #
  #   [:defn, :method_name, [:attrset, :variable_name]]
  #
  # We don't want to handle them differently, that's why we expand them
  # into:
  #
  #   [:block, [:ivar, :variable_name]]
  #
  #   [:block, [:args, :v], [:iasgn, :variable_name, [:lvar, :v]]]
  #
  def process_defn(exp)
    method_name = exp.shift || raise
    exp = exp.shift || raise

    @want_result += 1

    method_body = 
    case exp.first
    when :ivar
      process(s(:block, exp))
    when :attrset
      process(s(:block, s(:args, :_), s(:iasgn, exp[1], s(:lvar, :_))))
    when :scope, :block, :fbody
      process(exp)
    else
      raise
    end

    @want_result -= 1

    raise if @want_result < 0

    @block_name ||= @local_variable_name_generator.fresh # TODO: anonymous?

    args_str = ([@block_name] + @arguments_no_splat).map {|i| encode_local_variable(i)}.join(",")
    str = "function(#{args_str}){"

    #
    # declare local variables
    #
    unless @local_variables.empty?
      str << "var " + @local_variables.to_a.map{|i| encode_local_variable(i)}.join(",")
      str << ";"
    end

    #
    # initialize all local variables to nil
    #
    str << @local_variables.to_a.map{|i| encode_local_variable(i)}.join("=")
    str << "=nil;"

    #
    # generate initialization code for each read instance variable
    #
    @read_instance_variables.each do |iv|
      # FIXME: encode nil in global scope
      str << "if(this.#{encode_instance_variable(iv)}===undefined)this.#{encode_instance_variable(iv)}=nil;"
    end

    str << method_body
    str << "}"

    return str
  end

  def process_scope(exp)
    raise "nested scope" if @scope_nesting > 0
    @scope_nesting += 1
    res = process(exp.shift)
    @scope_nesting -= 1
    return res
  end

  def process_fbody(exp)
    process(exp.shift)
  end

  def process_block(exp)
    raise "empty block" if exp.empty?
    @block_nesting += 1

    @want_result -= 1

    res = []
    last_stmt_is_return = false
    loop do
      stmt = exp.shift
      if exp.empty?
        # stmt is the last statement in the block
        @want_result += 1
        if stmt[0] == :return
          last_stmt_is_return = true
        end
        res << process(stmt)
        break
      else
        res << process(stmt)
      end
    end

    @block_nesting -= 1

    res = res.reject {|r| r.nil? || r.empty? || r == "" || r == ";"}

    str =
    if @want_expression
      "(" + res.join(",") + ")"
    else
      res.join(";")
    end

    if @block_nesting == 0
      raise if @want_expression
      if not last_stmt_is_return
        str << ";return #{RESULT_VAR}" 
      end
    end

    str
  end

  #
  # STATEMENT
  #
  def process_block_arg(exp)
    raise if @want_expression
    raise if @block_name
    block = exp.shift
    @block_name = @local_variable_name_generator.get(block.to_s)
    ""
  end

  def process_block_pass(exp)
    block = exp.shift
    call = exp.shift
    @want_result -= 1
    want_expression do
      put_iter(process(block))
    end
    @want_result += 1
    process(call)
  end

  #
  # STATEMENT
  #
  # Method arguments.
  #
  # Generate arity checks and default argument assignment.
  #
  def process_args(exp)
    raise if @want_expression

    args = []
    default_values = nil

    loop do
      arg = exp.shift
      break if arg.nil?
      if arg.is_a?(Symbol)
        args << arg
      else
        raise unless exp.empty?
        default_values = arg
      end
    end

    args.each do |arg|
      arg = arg.to_s
      if arg[0,1] == '*'
        arg = arg[1..-1]
        arg_name = @local_variable_name_generator.get(arg) 
        raise if @argument_splat
        @argument_splat = arg_name
      else
        arg_name = @local_variable_name_generator.get(arg) 
        @arguments_no_splat << arg_name
      end
    end

    # that's not the correct arity, but we decrease it by one for each
    # optional argument.
    min_arity = @arguments_no_splat.size

    str = ""

    #
    # Generate code for the default values of arguments. We check
    # whether a argument has been assigned a value, if not (=== undefined), 
    # then we assign the default value.
    #
    if default_values
      raise unless default_values[0] == :block
      default_values[1..-1].each do |dv|
        min_arity -= 1
        raise unless dv[0] == :lasgn
        raise unless dv.size == 3
        arg = dv[1].to_s 
        arg_name = @local_variable_name_generator.get(arg) 
        value = dv[2]

        str << "if(#{encode_local_variable(arg_name)}===undefined)"
        str << "#{encode_local_variable(arg_name)}="
        str << want_expression do process(value) end
        str << ";"
      end
    end

    # now as we know the min_arity, we prepend an arity check before the
    # code generated above.
    str2 = ""

    if @argument_splat
      # max_arity == infinity => no check

      if min_arity == 0
        # min_arity == infinity as well => we need no check
      else
        # +1 because we have a block argument anyway.
        str2 << "if(arguments.length<#{min_arity+1})throw('ArgumentError');"
      end
    else
      if min_arity == 0
        # can't be less than 0 arguments anyway! => no check
      else
        if min_arity == max_arity
          str2 << "if(arguments.length!=#{min_arity+1})throw('ArgumentError');"
        else
          str2 << "if(arguments.length<#{min_arity+1}||arguments.length>#{max_arity+1})throw('ArgumentError');"
        end
      end
    end

    # prepend
    str = str2 + str


    if @argument_splat
      # construct the code to initialize the splat argument. 
      # unluckily the arguments object is not an array, instead it's a
      # special object that has only the length() and [] methods. There
      # is no way to convert it to an array, except looping over each
      # value and pushing the value into a new array.
      # FIXME: variable "i"
      str << "var #{encode_local_variable(@argument_splat)}=[];"
      str << "for(var i=#{@arguments_no_splat.size+1};i<arguments.length;i++)#{encode_local_variable(@argument_splat)}.push(arguments[i]);"
    end
    
    return str 
  end


  #
  # Generates a arguments for a method call. 
  # 
  def generate_method_call(receiver, method_name, iter, args)
    want_expression do
      if args.nil?
        # no arguments
        "#{receiver}.#{encode_method(method_name)}(#{iter})"
      elsif args.first == :array
        # one or more arguments
        args_string = args[1..-1].map{|a| process(a)}.join(",")
        "#{receiver}.#{encode_method(method_name)}(#{iter},#{args_string})"
      elsif args.first == :splat
        # FIXME
        #
        # puts(*a)  # => [:fcall, :puts, [:splat, [:lvar, :a]]]]]]
        #
        "#{receiver}.__invoke(#{iter},'#{encode_method(method_name)}',rubyjs_splat(#{ process(args[1]) }))"

      elsif args.first == :argscat
        #
        # puts(1, *a) # => ... [:argscat, [:array, [:lit, 1]], [:lvar, :a]]
        #
        prefix = args[1]
        splat = args[2]
        raise unless prefix[0] == :array

        a = "[" + process(prefix) + "].concat(rubyjs_splat(#{ process(splat) }))"
        "#{receiver}.__invoke(#{iter},'#{encode_method(method_name)}',#{a})"
      else
        raise
      end
    end
  end

  #
  # EXPRESSION
  #
  # Method call without receiver
  #
  def process_fcall(exp)
    method = exp.shift
    args = exp.shift

    method_name = @attribute_name_generator.get(method.to_s)
    @method_calls.add(method_name)

    @want_result -= 1
    str = generate_method_call("this", method_name, get_iter(), args)
    @want_result += 1

    resultify(str)
  end

  #
  # EXPRESSION
  #
  # Method call with receiver
  #
  def process_call(exp)
    receiver = exp.shift
    method = exp.shift
    args = exp.shift

    method_name = @attribute_name_generator.get(method.to_s)
    @method_calls.add(method_name)

    @want_result -= 1

    iter = get_iter()
    receiver_string = want_expression do process(receiver) end
    str = generate_method_call(receiver_string, method_name, iter, args)

    @want_result += 1
    resultify(str)
  end

  #
  # EXPRESSION
  #
  # Virtual call. Either a method call or a variable, determined at
  # runtime.
  #
  # Ruby cannot distinguish a local variable and a method called without
  # parentheses and without receiver at parse time. Example:
  #
  #   def my_method
  #     method_or_not.inspect
  #   end
  #
  # If a local variable of that name exists, then it is used as
  # receiver. Otherwise it is seen as a method and is called.
  #
  # NOTE: A vcall can never have an iterator! Because if an iterator is
  # specified it is automatically no variable and as such a fcall or
  # call is generated.
  #
  # NOTE: As RubyJS disallows to use eval(), a vcall can never be a
  # local variable (FIXME: to be prooved).
  #
  def process_vcall(exp)
    method = exp.shift

    method_name = @attribute_name_generator.get(method.to_s)
    @method_calls.add(method_name)

    resultify("this.#{encode_method(method_name)}(nil)")
  end


  #
  # STATEMENT/EXPRESSION
  #
  # unless is converted by the Ruby parser into an "if"
  #
  def process_if(exp)
    cond = exp.shift
    _then = exp.shift
    _else = exp.shift

    _then_processed = if _then
                        process(_then)
                      else
                        nil
                      end

    _else_processed = if _else
                        process(_else)
                      else
                        nil
                      end

    @want_result -= 1
    cond_processed = conditionalize(cond)
    @want_result += 1

    str = ""

    if @want_expression
      str << "(#{cond_processed}?#{_then_processed || resultify('nil')}"
      str << ":"
      str << (_else_processed || resultify('nil'))
      str << ")"
    else
      str << "if(#{cond_processed}){"
      str << (_then_processed || (@want_result > 0 ? resultify('nil') : ''))
      str << "}"
      if @want_result > 0
        _else_processed ||= resultify('nil') 
      end
      if _else_processed
        str << "else{"
        str << _else_processed
        str << "}"
      end
    end

    return str
  end

  #
  # STATEMENT
  #
  def process_return(exp)
    raise if @want_expression
    param = exp.shift
    if param
      # want_result!!!
      old_want_result = @want_result
      @want_result = 1
      str = process(param)
      @want_result = old_want_result
      str << ";return #{RESULT_VAR}" # FIXME
    else
      "return nil"
    end
  end

  #
  # STATEMENT
  #
  def process_while(exp)
    raise if @want_expression

    cond = exp.shift
    block = exp.shift
    flag = exp.shift
    raise unless flag == true

    @want_result -= 1
    str = ""
    str << "while(#{conditionalize(cond)}){#{process(block)}}" 
    @want_result += 1

    if @want_result > 0
      str << ";" + resultify("nil") + ";"
    end

    return str
  end


  #
  # EXPRESSION
  #
  # Process literals
  #
  def process_lit(exp)
    lit = exp.shift
    str = lit.inspect
    res = case str[0,1]
    when '"'
      str
    when '/'
      str
    else
      raise if str.include?("..") # FIXME: Range
      str
    end

    resultify(res)
  end 

  #
  # EXPRESSION
  #
  # Process string literal
  #
  def process_str(exp)
    str = exp.shift
    resultify(str.inspect)
  end
  
  #
  # EXPRESSION
  #
  def process_true(exp)
    resultify("true")
  end
  
  #
  # EXPRESSION
  #
  def process_false(exp)
    resultify("false")
  end

  #
  # EXPRESSION
  #
  def process_nil(exp)
    # FIXME: encode nil
    resultify("nil")
  end
  
  #
  # EXPRESSION
  #
  def process_self(exp)
    resultify("this")
  end
  
  #
  # EXPRESSION
  #
  # Array literal
  #
  def process_array(exp)
    str = want_expression do
      "[" + exp.map{|e| process(e)}.compact.join(",") + "]"
    end
    exp.clear
    resultify(str)
  end

  def process_hash(exp)
    raise
  end

  # 
  # EXPRESSION
  #
  # Empty array.
  #
  def process_zarray(exp)
    resultify("[]")
  end


  #
  # EXPRESSION
  #
  # Local variable assignment
  #
  # We have to write down all local variables, because they have to be
  # declared at the top of the method (otherwise they are seen as
  # "global" variables :)
  #
  def process_lasgn(exp)
    lvar   = exp.shift
    value = exp.shift

    lvar_name = @local_variable_name_generator.get(lvar.to_s)
    @local_variables.add(lvar_name)

    @want_result -= 1
    str = 
    want_expression do
      "#{encode_local_variable(lvar_name)}=#{process(value)}"
    end
    @want_result += 1

    resultify(str)
  end

  #
  # EXPRESSION
  #
  # Local variable lookup
  #
  def process_lvar(exp)
    lvar = exp.shift

    lvar_name = @local_variable_name_generator.get(lvar.to_s)
    #raise "variable not available" unless @local_variables.include?(lvar_name)

    resultify("#{encode_local_variable(lvar_name)}")
  end

  #
  # EXPRESSION
  #
  # A dynamic variable lookup can be replaced with a local variable
  # lookup lvar, as it is handled in the code generation in the same
  # way.
  #
  def process_dvar(exp)
    process_lvar(exp)
  end

  #
  # EXPRESSION
  #
  # Instance variable lookup
  #
  def process_ivar(exp)
    ivar = exp.shift
    ivar_name = @attribute_name_generator.get(ivar.to_s)
    @read_instance_variables.add(ivar_name)
    resultify("this.#{encode_instance_variable(ivar_name)}")
  end

  #
  # EXPRESSION
  #
  # Instance variable assignment
  #
  def process_iasgn(exp)
    ivar  = exp.shift
    value = exp.shift
    ivar_name = @attribute_name_generator.get(ivar.to_s)

    @want_result -= 1
    str = 
    want_expression do
      "this.#{encode_instance_variable(ivar_name)}=#{process(value)}"
    end
    @want_result += 1

    resultify(str)
  end

  #
  # 
  # 
  def process_iter(exp)
    call   = exp.shift
    params = exp.shift
    block  = exp.shift

    raise

    # dynamic variables in the call belong to the outer scope. 
    # that's why we call it before collecting dvar declarations
    # into current_iter_dvars. 
    call = process(call) 

    @iter_dvars_stack.push(@current_iter_dvars) 
    @current_iter_dvars = []

    block = process(block)
    inner = process(inner)

    raise
    res = s(:iter, call, s(:dvar_decl, *@current_iter_dvars), block, inner) 

    @current_iter_dvars = @iter_dvars_stack.pop

    return res
  end

  #
  #  
  #
  def process_dasgn_curr(exp)
    raise
    variable = exp.shift
    value = exp.shift# || s(:nil)

    @current_iter_dvars << variable 
    if value
      return s(:dasgn, variable, process(value))
    else
      return s(:dasgn, variable)
    end
  end

  # 
  # a =~ /regexp/
  #
  # is converted to 
  #
  # [:match3, [:lit, /regexp/], [:lvar, :a]]
  #
  # We just convert it to:
  #
  # [:call, [:lvar, :a], :=~, [:array, [:lit, /regexp/]]]
  #
  def process_match3(exp)
    right = exp.shift
    left = exp.shift 
    return process(s(:call, left, :=~, s(:array, right)))
  end

  # 
  # if /regexp/ =~ a
  #
  # is converted to 
  #
  # [:match2, [:lit, /regexp/], [:lvar, :a]]
  #
  # We just convert it to:
  #
  # [:call, [:lit, /regexp/], :=~, [:array, [:lvar, :a]]]
  #
  def process_match2(exp)
    left = exp.shift
    right = exp.shift
    return process(s(:call, left, :=~, s(:array, right)))
  end

  private

  def resultify(str)
    if @want_result > 0
      # FIXME
      RESULT_VAR + "=" + str
    else
      str
    end
  end

  #
  # 
  def conditionalize(exp, negate=false)
    want_expression do
      tmp = get_temporary_variable()
      enc = encode_local_variable(tmp)
      if negate 
        "(#{enc}=#{process(exp)},#{enc}===false||#{enc}===nil)"
      else
        "(#{enc}=#{process(exp)},#{enc}!==false&&#{enc}!==nil)"
      end
    end
  end

  def get_temporary_variable
    tmp = @temporary_variables_pool.shift || @local_variable_name_generator.fresh
    @all_temporary_variables.add(tmp)
    return tmp
  end

  def put_temporary_variable(tmp)
    @temporary_variables_pool.unshift(tmp)
  end

  def get_iter
    res = @iter || 'nil'
    @iter = nil
    res
  end

  def put_iter(iter)
    @iter = iter
  end


  def encode_method(name)
    "$" + name
  end

  def encode_local_variable(name)
    "_" + name
  end

  def encode_instance_variable(name)
    "$" + name
  end
end
