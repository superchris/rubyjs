require 'rack'
require 'json'

class JsonHandler
  def call(env)
    [200, {"Content-Type" => "application/json"},
      JSON.dump([{'Hello' => 'World!'}])]
  end
end

if __FILE__ == $0
  require 'rack/handler/mongrel'
  server = Mongrel::HttpServer.new('0.0.0.0', 3000)
  server.register('/', Rack::Handler::Mongrel.new(Rack::File.new('.')))
  server.register('/json', Rack::Handler::Mongrel.new(JsonHandler.new))
  server.run.join
end
