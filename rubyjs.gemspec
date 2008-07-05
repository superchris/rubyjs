spec = Gem::Specification.new do |s|
  s.name = 'rubyjs'
  s.version = '0.8.1'
  s.summary = 'RubyJS is a Ruby to Javascript Compiler.'

  s.files = ['README', 'Rakefile', 'utils', 'utils/js', 'utils/js/Makefile', 'utils/js/RunScript.class', 'utils/js/RunScript.java', 'utils/js/js.jar', 'utils/js/run.sh', 'utils/jsc', 'utils/jsc/Makefile', 'utils/jsc/README', 'utils/jsc/RunScript.c', 'utils/jsc/run.sh', 'utils/yuicompressor', 'utils/yuicompressor/README', 'utils/yuicompressor/yuicompressor-2.2.5.jar']
  s.add_dependency('ParseTree', '>= 2.1.1')
  s.requirements << "Ruby >= 1.8.6"

  s.require_path = 'src'
  s.bindir = 'bin'
  s.executables = ['rubyjs']

  s.author = "Michael Neumann"
  s.email = "mneumann@ntecs.de"
  s.homepage = "http://rubyforge.org/projects/rubyjs"
  s.rubyforge_project = "rubyjs"
end   
