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
