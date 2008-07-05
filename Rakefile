require 'rubygems'
RUBYJS_BIN = File.join ".", "bin", "rubyjs"

task :gen_tests do
  ruby "test/gen_browser_test_suite.rb"
end

task :run_tests do
  ruby "test/run_tests.rb"
end

task :default => :gen_tests

rule ".js" => ".rb" do |t|
  klass = t.source.pathmap("%n").
    split(/_/).collect { |part| part.capitalize}.join
  sh "#{RUBYJS_BIN} -O PrettyPrint -d -m #{klass} -o #{t.name} #{t.source}"
end

rule ".html" => ".js" do |t|
  File.open(t.name, "w") do |file|
    file.puts <<EOHTML
<html>
  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    
    <script src="#{t.source.pathmap("%f")}"></script>
    
  </head>
  <body>
      
  <script>

main();

</script>
  </body>
</html>    
EOHTML
  end
end

desc "Generate a rubyspec file that github won't complain about"
task :generate_gemspec do
  files = Dir['**/*'].reject {|name| name =~ /^[nbproject|examples]/}.
      map {|entry| "'#{entry}'"}.join(", ")
  File.open("rubyjs.gemspec", "w") do |f|
    f.puts <<EOF
spec = Gem::Specification.new do |s|
  s.name = 'rubyjs'
  s.version = '0.8.1'
  s.summary = 'RubyJS is a Ruby to Javascript Compiler.'

  s.files = [#{files}]
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
EOF
  end
end
