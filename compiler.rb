#
# A Ruby to Javascript compiler.
#
# Copyright (c) 2007 by Michael Neumann (mneumann@ntecs.de).
# All rights reserved.
#

require 'sexp_processor'
require 'set'

class RubyToJavascriptCompiler < SexpProcessor

  attr_accessor :method_calls

  def initialize(encoder)
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
    # The encoder object used for encoding and name generation of all
    # kind of variables etc.
    #
    @encoder = encoder

    #
    # record all (potential) names of all method calls
    #
    @method_calls = Set.new

    # 
    # record all local variables (including arguments)
    #
    @local_variables = Set.new

    #
    # Those local variables that need not be initialized with "nil" are
    # contained in this set (mostly temporary variables).
    #
    @local_variables_need_no_initialization = Set.new

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
    # Include all arguments
    #
    @argument_variables = Set.new

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
    # Use to reuse unused temporary variables
    #
    @temporary_variables_pool = []


    @want_result = 0
  end

  def compile(pt)
    process(pt)
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

    raise if @result_name
    @result_name = @encoder.encode_fresh_local_variable() 

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
    @result_name = nil

    raise if @want_result < 0

    str = ""

    if @argument_variables.empty?
      str << "function(){"
    else
      @block_name ||= @encoder.encode_fresh_local_variable()
      args_str = ([@block_name] + @arguments_no_splat).join(",")
      str << "function(#{args_str}){"
    end

    #
    # declare local variables (except arguments)
    #
    to_declare = (@local_variables - @argument_variables).to_a
    unless to_declare.empty?
      str << "var " + to_declare.join(",") + ";"
    end

    #
    # initialize all local variables (that need initialization) to nil
    #
    to_initialize = (@local_variables - @argument_variables - @local_variables_need_no_initialization).to_a
    unless to_initialize.empty?
      str << to_initialize.join("=")
      str << "=#{@encoder.encode_nil};"
    end

    #
    # generate initialization code for each read instance variable
    #
    @read_instance_variables.each do |iv|
      str << "if(#{@encoder.encode_self}.#{iv}===undefined)#{@encoder.encode_self}.#{iv}=#{@encoder.encode_nil};"
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
    want_return = true
    loop do
      stmt = exp.shift
      if exp.empty?
        # stmt is the last statement in the block
        @want_result += 1
        if [:return, :xstr].include?(stmt[0])
          want_return = false
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
      if want_return
        str << ";return #{result_name()}" 
      end
    end

    str
  end

  #
  # STATEMENT
  #
  def process_block_arg(exp)
    raise if @want_expression || @block_name
    block = exp.shift
    @block_name = @encoder.encode_local_variable(block)
    @local_variables.add(@block_name)
    @argument_variables.add(@block_name)
    return ""
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
        raise if @argument_splat
        @argument_splat = @encoder.encode_local_variable(arg[1..-1])
        # argument_splat is not an argument in the function's argument list
        @local_variables.add(@argument_splat) 
      else
        v = @encoder.encode_local_variable(arg)
        @arguments_no_splat << v 
        @local_variables.add(v)
        @argument_variables.add(v)
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
        arg = @encoder.encode_local_variable(dv[1])
        @local_variables.add(arg)
        @argument_variables.add(arg)
        value = dv[2]

        str << "if(#{arg}===undefined)"
        str << "#{arg}="
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
      str << "#{@argument_splat}=[];"
      @local_variables_need_no_initialization.add(@argument_splat)
      with_temporary_variable do |i|
        @local_variables_need_no_initialization.add(i)
        str << "for(#{i}=#{@arguments_no_splat.size+1};#{i}<arguments.length;#{i}++)#{@argument_splat}.push(arguments[#{i}]);"
      end
    end
    
    return str 
  end


  #
  # Generates a arguments for a method call. 
  # 
  def generate_method_call(receiver, method, iter, args)

    method_name = @encoder.encode_method(method)
    @method_calls.add(method_name)

    want_expression do
      if args.nil?
        # no arguments
        "#{receiver}.#{method_name}(#{iter})"
      elsif args.first == :array
        # one or more arguments
        args_string = args[1..-1].map{|a| process(a)}.join(",")
        "#{receiver}.#{method_name}(#{iter},#{args_string})"
      elsif args.first == :splat
        #
        # puts(*a)  # => [:fcall, :puts, [:splat, [:lvar, :a]]]]]]
        #
        # TODO: __invoke and rubyjs_splat
        "#{receiver}.__invoke(#{iter},'#{method_name}',rubyjs_splat(#{ process(args[1]) }))"

      elsif args.first == :argscat
        #
        # puts(1, *a) # => ... [:argscat, [:array, [:lit, 1]], [:lvar, :a]]
        #
        prefix = args[1]
        splat = args[2]
        raise unless prefix[0] == :array

        # TODO: rubyjs_splat, __invoke
        a = "[" + process(prefix) + "].concat(rubyjs_splat(#{ process(splat) }))"
        "#{receiver}.__invoke(#{iter},'#{method_name}',#{a})"
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

    @want_result -= 1
    str = generate_method_call(@encoder.encode_self, method, get_iter(), args)
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

    @want_result -= 1

    iter = get_iter()
    receiver_string = want_expression do process(receiver) end
    str = generate_method_call(receiver_string, method, iter, args)

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

    resultify(generate_method_call(@encoder.encode_self, method, @encoder.encode_nil, nil))
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
      str << "(#{cond_processed}?#{_then_processed || resultify(@encoder.encode_nil)}"
      str << ":"
      str << (_else_processed || resultify('nil'))
      str << ")"
    else
      str << "if(#{cond_processed}){"
      str << (_then_processed || (@want_result > 0 ? resultify(@encoder.encode_nil) : ''))
      str << "}"
      if @want_result > 0
        _else_processed ||= resultify(@encoder.encode_nil) 
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
      @want_result -= 1
      str = process(param)
      @want_result += 1
      "return #{str}" 
    else
      "return #{@encoder.encode_nil}"
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
      str << ";" + resultify(@encoder.encode_nil) + ";"
    end

    return str
  end


  #
  # UNDEFINED
  #
  # Backtick strings: `inline javascript`
  #
  # We use them for inline Javascript.
  #
  # It's unclear whether it's a STATEMENT or EXPRESSION.
  # It depends on the Javascript.
  #
  # NOTE: You have to take care to return a value yourself
  # in case of @want_result, i.e. there is no automatic handling
  # thereof.
  #
  def process_xstr(exp)
    str = exp.shift
    @encoder.interpolate(str)
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
    resultify(@encoder.encode_nil)
  end
  
  #
  # EXPRESSION
  #
  def process_self(exp)
    resultify(@encoder.encode_self)
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

    lvar_name = @encoder.encode_local_variable(lvar)
    @local_variables.add(lvar_name)

    @want_result -= 1
    str = 
    want_expression do
      "#{lvar_name}=#{process(value)}"
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

    lvar_name = @encoder.encode_local_variable(lvar)
    raise "variable not available" unless @local_variables.include?(lvar_name)

    resultify("#{lvar_name}")
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
    ivar_name = @encoder.encode_instance_variable(ivar)
    @read_instance_variables.add(ivar_name)
    resultify("#{@encoder.encode_self}.#{ivar_name}")
  end

  #
  # EXPRESSION
  #
  # Instance variable assignment
  #
  def process_iasgn(exp)
    ivar  = exp.shift
    value = exp.shift
    ivar_name = @encoder.encode_instance_variable(ivar)

    @want_result -= 1
    str = 
    want_expression do
      "#{@encoder.encode_self}.#{ivar_name}=#{process(value)}"
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

  #######################################################################
  
  private

  #######################################################################

  def resultify(str)
    if @want_result > 0
      # FIXME
      result_name() + "=" + str
    else
      str
    end
  end

  def result_name
    @result_name ||= @encoder.encode_fresh_local_variable() 
    @local_variables.add(@result_name)
    @result_name
  end

  def conditionalize(exp, negate=false)
    want_expression do
      with_temporary_variable do |tmp|
        @local_variables_need_no_initialization.add(tmp)
        if negate 
          "(#{tmp}=#{process(exp)},#{tmp}===false||#{tmp}===nil)"
        else
          "(#{tmp}=#{process(exp)},#{tmp}!==false&&#{tmp}!==nil)"
        end
      end
    end
  end

  def with_temporary_variable
    var = get_temporary_variable()
    res = yield var
    put_temporary_variable(var)
    return res
  end

  def get_temporary_variable
    tmp = @temporary_variables_pool.shift || @encoder.encode_fresh_local_variable
    @local_variables.add(tmp)
    return tmp
  end

  def put_temporary_variable(tmp)
    @temporary_variables_pool.unshift(tmp)
  end

  def get_iter
    res = @iter || @encoder.encode_nil
    @iter = nil
    res
  end

  def put_iter(iter)
    @iter = iter
  end
end
