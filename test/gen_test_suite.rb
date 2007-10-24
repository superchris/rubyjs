def gen_test_suite(tests)
  script = ""
  body = ""

  script << "require 'common'\n\n"
  tests.each_with_index do |file, i|
    basename = File.basename(file)[0..-4]
    klassname = basename.gsub(/(^|_)./) {|m| m[-1,1].upcase}
    humanname = basename.gsub('_', ' ').capitalize

    script << "#\n"
    script << "# file: #{file}\n"
    script << "#\n\n"
    script << "module T_#{klassname}\n"
    script << File.read(file)
    script << "end\n"
    script << "\n\n"
    body << %{
      puts '~~~~~~~~~~~~~~~~~~~~'
      puts '#{humanname}'
      puts '~~~~~~~~~~~~~~~~~~~~'
      T_#{klassname}::#{klassname}.main
    }
  end

  script << %{
    class TestSuite
      def self.main
        begin
          #{body}
        rescue Exception => a
          p "unhandled exception"
          p a
        end
      end
    end
    TestSuite.main unless $RUBYJS
  }

  return script
end
