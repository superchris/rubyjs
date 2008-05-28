#module MicroUnit
  class TestCase
    #  def self.reset
    #    @@test_suites = {}
    #  end
    #
    #  reset
    #
    #  def self.inherited klass
    #    @@test_suites[klass] = true
    #  end
    #
    #  def self.test_suites
    #    @@test_suites.keys.sort_by { |ts| ts.name }
    #  end
    #
    attr_accessor :_assertions

    def setup
    
    end
  
    def teardown
    
    end
  
    def _increment_assertions
      @_assertions ||= 0
      @_assertions += 1
    end

    def assert test, msg = "failed assertion (no message given)"
      _increment_assertions
      raise StandardError, msg unless test
    end

    #  def assert_block msg = "assert_block failed."
    #    assert yield, msg
    #  end
    #
    #  def assert_equal exp, act, msg = ""
    #    msg += '.' unless msg.empty?
    #    assert exp == act, "#{msg}\n<#{exp.inspect}> expected but was\n<#{act.inspect}>.".strip
    #  end
    #
    #  def assert_in_delta exp, act, delta, msg = "Expected #{exp} to be within #{delta} of #{act}"
    #    assert delta.to_f > (exp.to_f - act.to_f).abs, msg
    #  end
    #
    #  def assert_instance_of cls, obj, msg = "Expected #{obj.inspect} to be an instance of #{cls}"
    #    assert cls === obj, msg
    #  end
    #
    #  def assert_kind_of cls, obj, msg = "Expected #{obj.inspect} to be a kind of #{cls}"
    #    assert obj.kind_of?(cls), msg
    #  end
    #
    #  def assert_match exp, act, msg = "Expected #{act.inspect} to match #{exp.inspect}"
    #    assert act =~ exp, msg
    #  end
    #
    #  def assert_nil obj, msg = "Expected #{obj.inspect} to be nil"
    #    assert obj.nil?, msg
    #  end
    #
    #  def assert_no_match exp, act, msg = "Expected #{act.inspect} to not match #{exp.inspect}"
    #    assert act !~ exp, msg
    #  end
    #
    #  def assert_not_equal exp, act, msg = "Expected #{act.inspect} to not be equal to #{exp.inspect}"
    #    assert exp != act, msg
    #  end
    #
    #  def assert_not_nil obj, msg = "Expected #{obj.inspect} to not be nil"
    #    assert ! obj.nil?, msg
    #  end
    #
    #  def assert_not_same exp, act, msg = "Expected #{act.inspect} to not be the same as #{exp.inspect}"
    #    assert ! exp.equal?(act), msg
    #  end
    #
    #  def assert_nothing_raised
    #    _increment_assertions
    #    yield
    #  rescue => e
    #    raise StandardError, exception_details(e, "Exception raised:")
    #  end
    #
    #  alias :assert_nothing_thrown :assert_nothing_raised
    #
    #  def assert_operator o1, op, o2, msg = "<#{o1.inspect}> expected to be\n#{op.inspect}\n<#{o2.inspect}>."
    #    assert o1.__send__(op, o2), msg
    #  end
    #
    #  def exception_details e, msg
    #    "#{msg}\nClass: <#{e.class}>\nMessage: <#{e.message.inspect}>\n---Backtrace---\n#{filter_backtrace(e.backtrace).join("\n")}\n---------------"
    #  end
    #
    #  def assert_raises *exp
    #    msg = "" #exp.last.kind_of(String) ? exp.pop : nil
    #    exp = exp.first if exp.size == 1
    #    begin
    #      yield
    #      raise StandardError, "<#{exp.inspect}> exception expected but none was thrown."
    #    rescue Exception => e
    #      assert((Array === exp ? exp.include?(e) : exp === e),
    #        exception_details(e,
    #          "<#{exp.inspect}> exception expected but was"))
    #
    #      return e
    #    end
    #  end
    #  alias :assert_raise :assert_raises
    #
    #  def assert_respond_to obj, meth, msg = "Expected #{obj.inspect} of type #{obj.class} to respond_to? #{meth.inspect}"
    #    assert obj.respond_to?(meth), msg
    #  end
    #
    #  def assert_same exp, act, msg = "Expected #{act.inspect} to be the same as #{exp.inspect}."
    #    assert exp.equal?(act), msg
    #  end
    #
    #  def assert_send send, msg = nil
    #    recv, meth, *args = send
    #    assert(recv.__send__(meth, *args),
    #      msg || "<#{recv.inspect}> expected to respond to\n<#{meth.inspect}> with a true value.")
    #  end
    #
    #  def assert_throws sym, msg = "<#{sym.inspect}> should have been thrown."
    #    caught = true
    #    catch(sym) do
    #      yield rescue nil
    #      caught = false
    #    end
    #    assert caught, msg
    #  end
    #
    #  def flunk msg = "Flunked"
    #    assert false, msg
    #  end
  end # class TestCase
       
  class TestRunner
    
    def self.puts(m)
      message = m.to_s
      `document.write(#<message>);`
    end
    
    def self.run(klass)
      @failures, @errors, @assertions = 0,0,0
      klass.instance_methods.each do |meth|
        if (meth =~ /^test/)
          inst = klass.new
          begin
            inst.setup
            inst.send meth
            puts "."
          rescue Exception => e
            puke(klass, meth, e)
          ensure
            begin
              inst.teardown
            rescue Exception => e
              puke(klass, meth, e)
            end
          end
          @assertions += inst._assertions
        end
      end
      puts ("<br/>")
      puts ("Assertions: #{@assertions} Failures: #{@failures}")
    end
  
    def self.puke(klass, meth, e)
      puts e
      @failures += 1
    end
  end
#end