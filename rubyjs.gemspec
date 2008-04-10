require 'rubygems'

spec = Gem::Specification.new do |s|
  s.name = 'rubyjs'
  s.version = '0.7.1'
  s.summary = 'RubyJS is a Ruby to Javascript Compiler.'

  s.files = Dir['**/*']
  s.add_dependency('RubyInline', '>= 3.6.0')

  s.require_path = 'src'
  s.bindir = 'bin'
  s.executables = ['rubyjs']

  s.author = "Michael Neumann"
  s.email = "mneumann@ntecs.de"
  s.homepage = "http://rubyforge.org/projects/rubyjs"
  s.rubyforge_project = "rubyjs"
end

if __FILE__ == $0
  Gem::manage_gems
  Gem::Builder.new(spec).build
end
