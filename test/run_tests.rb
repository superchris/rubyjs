require 'tempfile'
require 'test/gen_test_suite'

if ARGV.empty?
  tests = Dir['test/test_*.rb']
else
  tests = Dir["test/test_{" + ARGV.join(',') + "}.rb"] 
end

rubycode = Tempfile.new('rubyjs')
script = gen_test_suite(tests) 
rubycode.write(script)
rubycode.close(false)

jsout = `./rubyjs_gen -I./test -a ";main()" -m TestSuite #{rubycode.path} | ./utils/js/run.sh`
rbout = `ruby -I./test < #{rubycode.path}`

if jsout == rbout
else
  puts "FAILED"
  exit 1
end
