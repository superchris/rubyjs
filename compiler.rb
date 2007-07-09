#
# A Ruby to Javascript compiler.
#
# Copyright (c) 2007 by Michael Neumann (mneumann@ntecs.de).
# All rights reserved.
#

require 'sexp_processor'
require 'set'

class MethodCompiler < SexpProcessor

  attr_accessor :method_calls

  def initialize(encoder)
    super()
    
    # don't stop at unknown nodes
    self.strict = true 

    # remove the type from the sexp array
    self.auto_shift_type = true

    # warn whenever the default method is called, i.e.
    # an unknown sexp is processed.
    self.warn_on_default = true

    # expected result class
    self.expected = String

    #
    # Used to collect the dynamic variable declarations for
    # an iterator. 
    #
    @current_iter_dvars = nil

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

    #
    # We collect all instance variable reads, because they might not be
    # initialized yet and we want them to be initialized as "nil"!
    #
    @read_instance_variables = Set.new

    #
    # Use to reuse unused temporary variables
    #
    @temporary_variables_pool = []


    #
    # If a return value should be assigned or not. 
    #
    @want_result = false 


    #
    # contains the name of the block argument, e.g.
    #
    #   def a(&block)
    #   end
    #
    # would contain the encoded name of "block".
    #
    @block_arg_name = nil

    #
    # Argument name used for the block argument: 
    #
    #   function (#{@block_name}, ...) { ... }
    #
    # Generated on demand with block_name().
    #
    @block_name = nil

    #
    # The name of the variable that contains the return value.
    #
    @result_name = nil
  end

  def compile_method(pt)
    process(pt)
  end

  #
  # 
  #
  def want_expression(wish=true)
    old = @want_expression
    @want_expression = wish
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
    raise if @result_name
    method_name = exp.shift || raise
    exp = exp.shift || raise

    method_body = want_result do
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
    end

    str = ""

    if @argument_variables.empty?
      str << "function(){"
    else
      args_str = ([block_name()] + @arguments_no_splat).join(",")
      str << "function(#{args_str}){"
    end

    raise if @local_variables.include?(@encoder.encode_self)
    raise if @argument_variables.include?(@encoder.encode_self)

    #
    # Add "self" to the local variables
    #
    @local_variables.add(@encoder.encode_self)
    @local_variables_need_no_initialization.add(@encoder.encode_self)

    #
    # declare local variables (except arguments)
    #
    to_declare = (@local_variables - @argument_variables).to_a
    to_declare << @result_name if @result_name
    unless to_declare.empty?
      str << "var " + to_declare.join(",") + ";"
    end

    #
    # initialize all local variables (that need initialization) to nil
    #
    to_initialize = (@local_variables - @argument_variables - @local_variables_need_no_initialization).to_a
    to_initialize << @result_name if @result_name
    unless to_initialize.empty?
      str << to_initialize.join("=")
      str << "=#{@encoder.encode_nil};"
    end

    #
    # initialize "self"
    #
    str << "#{@encoder.encode_self}=this;"

    #
    # If a block argument is given (&block) convert it to nil if it is
    # undefined. 
    #
    if @block_arg_name
      str << "#{@block_arg_name}=#{block_name()}===undefined?#{@encoder.encode_nil}:#{block_name()};"
    end

    #
    # generate initialization code for each read instance variable
    #
    @read_instance_variables.each do |iv|
      str << "if(#{@encoder.encode_self}.#{iv}===undefined)#{@encoder.encode_self}.#{iv}=#{@encoder.encode_nil};"
    end

    str << method_body
    str << ";return #{@result_name}" if @result_name
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

    res = []

    # all statements except the last don't want a result
    without_result do 
      exp[0..-2].each do |stmt|
        res << process(stmt)
      end
    end
    # last statement
    res << process(exp[-1])

    res = res.reject {|r| r.nil? || r.empty? || r == "" || r == ";"}

    exp.clear

    if @want_expression
      "(" + res.join(",") + ")"
    else
      res.join(";")
    end
  end

  #
  # STATEMENT
  #
  def process_block_arg(exp)
    raise if @want_expression || @block_arg_name
    block = exp.shift
    block_name() # make sure that the function signature contains a block argument!
    @block_arg_name = @encoder.encode_local_variable(block)
    @local_variables.add(@block_arg_name)
    @local_variables_need_no_initialization.add(@block_arg_name)
    return ""
  end

  # 
  # TODO?
  #
  def process_block_pass(exp)
    block = exp.shift
    call = exp.shift
    without_result do 
      want_expression do
        put_iter(process(block))
      end
    end
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
    max_arity = @arguments_no_splat.size

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
  # Same as generate_method_call, but where recv_exp is an sexp.
  # We take care that it gets processed, and that in case of a
  # numeric literal, it gets surrounded by parens.
  #
  def generate_method_call_receiver_exp(recv_exp, method, iter, args)
    is_num = is_numeric_literal(recv_exp)
    receiver = want_expression do process(recv_exp) end 
    receiver = "(" + receiver + ")" if is_num
    generate_method_call(receiver, method, iter, args)
  end

  #
  # Generates a arguments for a method call. 
  # 
  def generate_method_call(receiver, method, iter, args)

    method_name = @encoder.encode_method(method)
    @method_calls.add(method_name)

    without_result do
      want_expression do
        if args.nil?
          # no arguments
          #
          # NOTE: We don't have to encode an iter of "nil" as "nil".
          # Instead we save us the space and check for undefined in the
          # method definition.
          "#{receiver}.#{method_name}(#{iter})"
        elsif args.first == :array
          # one or more arguments
          args_string = args[1..-1].map{|a| process(a)}.join(",")
          "#{receiver}.#{method_name}(#{iter || @encoder.encode_nil},#{args_string})"
        elsif args.first == :splat or args.first == :argscat
          #
          # puts(*a)  # => [:fcall, :puts, [:splat, [:lvar, :a]]]]]]
          #
          # puts(1, *a) # => ... [:argscat, [:array, [:lit, 1]], [:lvar, :a]]
          #
          @method_calls.add(__invoke = @encoder.encode_method('__invoke'))
          "#{receiver}.#{__invoke}(#{iter || @encoder.encode_nil},'#{method_name}',#{ process(args) })"
        else
          raise
        end
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

    str = without_result do
      generate_method_call(@encoder.encode_self, method, get_iter(), args)
    end

    resultify(str)
  end

  #
  # EXPRESSION
  #
  # Attribute assignment: receiver.attr=(value)
  #
  # Same as a method call!
  #
  def process_attrasgn(exp)
    process_call(exp)
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

    str = without_result do 
      generate_method_call_receiver_exp(receiver, method, get_iter(), args)
    end
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

    resultify(generate_method_call(@encoder.encode_self, method, nil, nil))
  end

  #
  # EXPRESSION
  #
  # Q: Always call with "nil" if no argument is given?
  # A: No, because then we could not distinguish between
  #    no arguments and "nil" as argument.
  #
  def process_yield(exp)
    value = exp.shift

    str = without_result do
      want_expression do
        block_name() + "(" + (value ? process(value) : '') + ")"
      end
    end
    resultify(str)
  end

  #
  # Constant lookup
  # ===============
  #
  # Constant lookup in RubyJS is performed statically. This is possible
  # because the whole class hierarchy is available at compile-time. 

  #
  # EXPRESSION
  #
  def process_const(exp)
    name = exp.shift
    return resultify(@encoder.encode_constant(name))
  end

  # 
  # EXPRESSION
  #
  # A::B     # => [:colon2, [:const, :A], :B]
  #
  def process_colon2(exp)
    name = exp.shift
    raise
  end

  # 
  # EXPRESSION
  #
  # ::A     # => [:colon3, :A]
  #
  def process_colon3(exp)
    name = exp.shift
    raise
  end

  #
  # EXPRESSION
  #
  def process_and(exp)
    a = exp.shift
    b = exp.shift

    without_result do
      want_expression do
        a = conditionalize(a)
        b = conditionalize(b)
      end
    end

    return resultify("((#{a}) && (#{b}))")
  end
  
  #
  # EXPRESSION
  #
  def process_or(exp)
    a = exp.shift
    b = exp.shift

    without_result do
      want_expression do
        a = conditionalize(a)
        b = conditionalize(b)
      end
    end

    return resultify("((#{a}) || (#{b}))")
  end

  #
  # EXPRESSION
  #
  def process_not(exp)
    a = exp.shift

    without_result do
      want_expression do
        a = conditionalize(a, true)
      end
    end

    return resultify(a)
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

    cond_processed = without_result do
      conditionalize(cond)
    end

    str = ""

    if @want_expression
      str << "(#{cond_processed}?#{_then_processed || resultify(@encoder.encode_nil)}"
      str << ":"
      str << (_else_processed || resultify('nil'))
      str << ")"
    else
      str << "if(#{cond_processed}){"
      str << (_then_processed || (@want_result ? resultify(@encoder.encode_nil) : ''))
      str << "}"
      if @want_result
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
      str = without_result do
        process(param)
      end
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

    str = without_result do
      "while(#{conditionalize(cond)}){#{process(block)}}" 
    end

    if @want_result
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

  def is_numeric_literal(exp)
    type = exp[0]
    str = exp[1].inspect

    return true if type == :lit and (str =~ /^-?\d+/ or str == "Infinity" or str == "-Infinity")
    return false
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
  def process_splat(exp)
    value = exp.shift
    to_splat = @encoder.encode_globalattr('to_splat')
    str = without_result do
      want_expression do
        "#{to_splat}(#{ process(value) })"
      end
    end
    resultify(str)
  end

  #
  # EXPRESSION
  #
  def process_argscat(exp)
    prefix = exp.shift
    splat = exp.shift
    raise unless prefix.first == :array
    to_splat = @encoder.encode_globalattr('to_splat')
    str = without_result do
      want_expression do
        "#{process(prefix)}.concat(#{to_splat}(#{ process(splat) }))"
      end
    end
    resultify(str)
  end

  #
  # EXPRESSION
  #
  # Array literal
  #
  def process_array(exp)
    str = without_result do
      want_expression do
        "[" + exp.map{|e| process(e)}.compact.join(",") + "]"
      end
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

    str = without_result do
      want_expression do
        "#{lvar_name}=#{process(value)}"
      end
    end

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
  # Global variable lookup
  #
  def process_gvar(exp)
    gvar = exp.shift
    gvar_name = @encoder.encode_global_variable(gvar)
    resultify("(typeof(#{gvar_name})=='undefined'?#{@encoder.encode_nil}:#{gvar_name})")
  end

  #
  # EXPRESSION
  #
  # Global variable assignment
  #
  def process_gasgn(exp)
    gvar   = exp.shift
    value = exp.shift

    gvar_name = @encoder.encode_global_variable(gvar)

    str = without_result do
      want_expression do
        "#{gvar_name}=#{process(value)}"
      end
    end

    resultify(str)
  end

  #
  # EXPRESSION
  #
  # Dynamic variable lookup
  #
  def process_dvar(exp)
    dvar = exp.shift
    dvar_name = @encoder.encode_local_variable(dvar)
    raise "dynamic variable not available" unless @current_iter_dvars.include?(dvar_name)

    resultify("#{dvar_name}")
  end

  # 
  # EXPRESSION
  #
  # Dynamic variable assignment
  #
  def process_dasgn(exp)
    dvar = exp.shift
    value = exp.shift
    dvar_name = @encoder.encode_local_variable(dvar)
    raise "dynamic variable not available" unless @current_iter_dvars.include?(dvar_name)

    str = without_result do
      want_expression do
        "#{dvar_name}=#{process(value)}"
      end
    end

    resultify(str)
  end

  #
  # EXPRESSION
  #
  # Dynamic variable declaration and assignment 
  #
  def process_dasgn_curr(exp)
    dvar = exp.shift
    value = exp.shift
    dvar_name = @encoder.encode_local_variable(dvar)

    @current_iter_dvars.add(dvar_name)

    str = without_result do
      want_expression do
        if value
          "#{dvar_name}=#{process(value)}"
        else
          # this should never happen, see process_iter()
          raise "no declarations possible"
        end
      end
    end

    resultify(str)
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

  def process_svalue
    raise
  end

  def process_to_ary(exp)
    value = exp.shift
    str = without_result do
      want_expression do
        case value.first
        when :lit
          "[" + process(value) + "]"
        when :array, :zarray
          process(value)
        when :special_to_ary
          # this is used inside of process_iter to build the multiple
          # assignment.
          value[1]
        else
          generate_method_call_receiver_exp(value, "to_ary", nil, nil)
        end
      end
    end
    resultify(str)
  end

  #
  # EXPRESSION
  #
  # This is used to insert a pure inline JS string into the
  # code. It is used for example in process_masgn.
  #
  # It is not part of the ParseTree returned node types!
  #
  def process_special_inline_js_value(exp)
    return exp.shift
  end

  #
  # EXPRESSION
  #
  # Multiple assignment
  #
  # Simple case:
  #
  # a, b = 1, 2
  #
  # [:masgn,
  #  [:array, [:lasgn, :a], [:lasgn, :b]],
  #  [:array, [:lit, 1], [:lit, 2]]]]]]
  #
  # Case with splat argument:
  #
  # a, *b = 1, 2, 3
  #
  # [:masgn,
  #  [:array, [:lasgn, :a]],
  #  [:lasgn, :b],
  #  [:array, [:lit, 1], [:lit, 2], [:lit, 3]]]]]]
  #
  # Another case:
  #
  # a, b = 1
  #
  # [:masgn,
  #  [:array, [:lasgn, :a], [:lasgn, :b]],
  #  [:to_ary, [:lit, 1]]]
  #
  # We actually implement multiple assignment using a
  # temporary array. Example:
  #
  #   a, b = b, a
  #
  # leads to the following javascript code 
  #
  #   (_t = [b,a],
  #    a  = _t[0] === undefined ? nil : _t[0], 
  #    b  = _t[1] === undefined ? nil : _t[1])
  #
  # When a splat argument is given, there's just an
  # additional assignment which takes the rest of the
  # array.
  #
  def process_masgn(exp)
    lhs = exp.shift
    rhs = exp.pop
    splat = exp.shift 

    raise unless lhs.first == :array
    raise unless rhs.first == :array or rhs.first == :to_ary

    want_expression do
      with_temporary_variable do |tmp|
        assgn = [] 
        without_result do
          assgn << "#{tmp}=#{process(rhs)}"

          # lhs[0] == :array -> skip it
          lhs[1..-1].each_with_index do |assignment, i|  # for example where assignment == [:lasgn, :a]
            assignment << s(:special_inline_js_value, "#{tmp}[#{i}]===undefined?#{@encoder.encode_nil}:#{tmp}[#{i}]")
            assgn << process(assignment)
          end

          if splat
            # splat is for example [:lasgn, :a]
            splat << s(:special_inline_js_value, "#{tmp}.slice(#{lhs.size-1})")
            assgn << process(splat)
          end
        end

        # return value of the expression is the array
        assgn << resultify("#{tmp}")

        "(" + assgn.join(",") + ")" 
      end
    end
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

    str = without_result do
      want_expression do
        "#{@encoder.encode_self}.#{ivar_name}=#{process(value)}"
      end
    end

    resultify(str)
  end

  #
  # EXPRESSION (doesn't generate any code directly!) 
  #
  # Iterator block.
  #
  # We process as follows:
  #
  #   1. Generate code for the arguments of the block (multiple
  #   assignment etc.)
  #
  #   2. Generate code for the code block.
  #
  #   3. In 1 and 2 we also write down all dynamic variable assignments.
  #      ("dasgn_curr" which introduces a new scope)
  #
  #   4. Generate code for variable declarations.
  # 
  # TODO: assign arity to function object!
  #
  def process_iter(exp)
    call   = exp.shift # the method call to which the iterator is passed
    params = exp.shift # arguments of the block
    code   = exp.shift # the code block

    old_iter_dvars = @current_iter_dvars
    @current_iter_dvars = Set.new 
    
    # Get an argument name for the iterator function signature.
    arg_name = @encoder.encode_fresh_local_variable()

    fun_str = ""
    asgn_str = ""
   
    if params.nil? 
      # Case 1: {}: Any number of arguments may be passed
      arity = -1
      fun_str << "function(){"
    elsif params == :zero_arguments
      # Case 2: {||}: Zero arguments
      arity = 0
      fun_str << "function(){"
    elsif params.first == :masgn
      # Case 3: {|i,j|}: Multiple arguments (multiple assignment)
      arity = nil # |arity| >= 2 
      fun_str << "function(#{arg_name}){"

      # TODO: remove masgn_iter and instead put the corresponding logic
      # into yield!
      masgn_iter = @encoder.encode_globalattr("masgn_iter")
      params << [:to_ary, [:special_to_ary, "#{masgn_iter}(#{arg_name})"]]
      want_expression(false) do
        without_result do
          asgn_str << process(params) 
        end
      end
    else
      # Case 4: {|i|}: Single argument
      # TODO: warning if not exactly one argument is passed  
      arity = 1
      fun_str << "function(#{arg_name}){"

      # we convert a single argument into a multiple assignment clause
      # with one argument.

      sasgn_iter = @encoder.encode_globalattr("sasgn_iter")
      params << [:special_inline_js_value, "#{arg_name}===undefined?#{@encoder.encode_nil}:#{arg_name}"]

      want_expression(false) do
        without_result do
          asgn_str << process(params) 
        end
      end
    end

    old_result_name = @result_name
    @result_name = nil

    block_str = ""
    want_expression(false) do
      want_result do
        block_str << process(code) if code
      end
    end

    # generate code for the variable declarations
    var_str = ""
    unless @current_iter_dvars.empty?
      var_str << "var "
      var_str << @current_iter_dvars.to_a.join(",")
      var_str << ";"
    end

    # declare and initialize the return value
    if @result_name
      var_str << "var #{@result_name}=#{@encoder.encode_nil};"
    end

    # NOTE: we don't need to initialize any dvar to nil, as 
    # they can't be used before being assigned to (because
    # otherwise they are vcall's and not dynamic variables).   

    str = fun_str + var_str + asgn_str + ";" + block_str
    str << ";return #{@result_name}" if @result_name
    str << "}"

    put_iter(str)

    @result_name = old_result_name
    @current_iter_dvars = old_iter_dvars

    return process(call)
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
  
  def without_result(&block)
    want_result(false, &block)
  end

  def want_result(wish=true)
    old_want_result = @want_result
    begin
      @want_result = wish
      return yield
    ensure
      @want_result = old_want_result
    end
  end

  def resultify(str)
    if @want_result
      # FIXME
      result_name() + "=" + str
    else
      str
    end
  end

  def result_name
    @result_name ||= @encoder.encode_fresh_local_variable() 
    #@local_variables.add(@result_name)
    @result_name
  end

  # 
  # Generate a name for @block_name (which is the argument for
  # the block in the Javascript function signature).
  #
  def block_name
    @block_name ||= @encoder.encode_fresh_local_variable()
    @argument_variables.add(@block_name)
    @block_name
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
    begin
      return (yield var)
    ensure
      put_temporary_variable(var)
    end
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
    res = @iter
    @iter = nil
    res
  end

  def put_iter(iter)
    @iter = iter
  end
end
