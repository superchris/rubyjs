RUN_JS = ENV['RUN_JS'] || 'run_js'

tests = ARGV.join(" ")

def compare(expected, result)
  if expected == result
    puts "OK"
  else
    puts "FAILED (expected, result)"
    p expected
    p result
  end
end

tee_js = ""
#tee_js = "-o /tmp/gen.js"

expected = `ruby gen_test_suite.rb #{tests} | ruby -I./test`
result = `ruby gen_test_suite.rb #{tests} | ./rubyjs_gen -I./test -o - #{tee_js} -m TestSuite -a "main()" - | sh utils/#{RUN_JS}.sh`

compare(expected, result)

=begin
tests.each_with_index do |file, i|
  klassname = File.basename(file)[0..-4].gsub(/(^|_)./) {|m| m[-1,1].upcase}
  humanname = File.basename(file)[0..-4].gsub('_', ' ').capitalize

  print "  (#{(i+1).to_s.rjust(3,'0')}/#{tests.size.to_s.rjust(3,'0')}) #{humanname.ljust(60)}| "; STDOUT.flush

  # run ruby
  expected = `ruby -I./test -rcommon -e 'load "#{file}"; #{klassname}.main'`

  # run rubyjs
  result = `./rubyjs_gen -I./test -rcommon -m #{klassname} -a "main()" #{file} | sh utils/#{RUN_JS}.sh`

  if expected == result
    puts "OK"
  else
    puts "FAILED (expected, result)"
    p expected
    p result
  end
end
=end
