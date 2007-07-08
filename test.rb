if __FILE__ == $0
  require 'rubygems'
  require 'code_generator'
  require 'core'

  puts CodeGenerator.new.generate("function test() { #<Array>.#<m:test>(); }")
end
