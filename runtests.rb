if ARGV.empty?
  tests = Dir['test/test_*.rb']
else
  tests = Dir["test/test_{" + ARGV.join(',') + "}.rb"] 
end

tests.each_with_index do |file, i|
  klassname = File.basename(file)[0..-4].gsub(/(^|_)./) {|m| m[-1,1].upcase}
  humanname = File.basename(file)[0..-4].gsub('_', ' ').capitalize

  print "  (#{(i+1).to_s.rjust(3,'0')}/#{tests.size.to_s.rjust(3,'0')}) #{humanname.ljust(60)}| "; STDOUT.flush

  # run ruby
  expected = `ruby -I./test -rcommon -e 'load "#{file}"; #{klassname}.main'`

  # run rubyjs
  result = `./rubyjs_gen -I./test -rcommon -m #{klassname} -a "main()" #{file} | sh utils/run_js.sh`

  if expected == result
    puts "OK"
  else
    puts "FAILED (expected, result)"
    p expected
    p result
  end
end
