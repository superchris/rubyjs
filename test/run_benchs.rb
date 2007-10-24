require 'yaml'
require 'tempfile'
params = YAML.load(File.read('test/benchmark/params.yaml'))
benchs = Dir["test/benchmark/bm_*.{rb,js}"]
OPTS = "--opt NoArgumentArityChecks --opt OptimizeArithOps"

def run_rubyjs(param, klassname, file)
  par = param ? param.inspect : "nil" 
  cmd_rubyjs_gen = 
    %{./rubyjs_gen -I./test -o - -o /tmp/#{klassname} -r common -r benchmark/common #{OPTS} -m #{klassname} -a "main(undefined, #{par})" #{file}}

  cmd_run_js = %{/usr/bin/time ./utils/js/run.sh 2>&1} 

  result = `#{cmd_rubyjs_gen} | #{cmd_run_js}`
  arr = result.split("\n")
  time = arr.pop.split(" ")[2].sub(",", ".").to_f # user
  return [file, klassname, param, time.to_f, arr.join("\n")]
end

def run_js(param, klassname, file)
  par = param ? param.inspect : "null" 

  script = ""
  script << File.read('./test/benchmark/common.js')
  script << "\n"
  script << File.read(file)
  script << "\n"
  script << "main(#{par});"

  jscode = Tempfile.new('rubyjs')
  jscode.write(script)
  jscode.close(false)

  cmd_run_js = %{/usr/bin/time ./utils/js/run.sh 2>&1} 

  result = `#{cmd_run_js} < #{jscode.path}`
  arr = result.split("\n")
  time = arr.pop.split(" ")[2].sub(",", ".").to_f # user
  return [file, klassname, param, time.to_f, arr.join("\n")]
end

benchs.sort.each do |file|
  basename = File.basename(file)[0..-4]
  klassname = basename.gsub(/(^|_)./) {|m| m[-1,1].upcase}
  humanname = basename.gsub('_', ' ').capitalize
  ext = File.extname(file)

  (params[klassname] || [nil]).each do |i|
    case ext
    when '.rb'
      p run_rubyjs(i, klassname, file)
    when '.js'
      p run_js(i, klassname, file)
    else
      raise
    end
  end
end
