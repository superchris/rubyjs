if ARGV.empty?
  tests = Dir['test/test_*.rb']
else
  tests = Dir["test/test_{" + ARGV.join(',') + "}.rb"] 
end

script = ""
body = ""

script << "require 'common'\n"
tests.each_with_index do |file, i|
  basename = File.basename(file)[0..-4]
  klassname = basename.gsub(/(^|_)./) {|m| m[-1,1].upcase}
  humanname = basename.gsub('_', ' ').capitalize

  script << "require '#{basename}'\n"
  body << %{
    puts '~~~~~~~~~~~~~~~~~~~~'
    puts '#{humanname}'
    puts '~~~~~~~~~~~~~~~~~~~~'
    #{klassname}.main
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

puts script
