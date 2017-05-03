require 'sinatra'
require 'rack/webconsole'

get '/' do
  erb :index
end
