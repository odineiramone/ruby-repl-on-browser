require 'sinatra'
require 'rack/webconsole'

Rack::Webconsole.key_code = '231'
use Rack::Webconsole

get '/' do
  erb :index
end
