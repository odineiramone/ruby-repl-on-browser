require 'sinatra'
require 'sinatra/namespace'
require 'json'

get '/' do
  erb :index
end

namespace '/api' do
  post '/ruby' do
    result = eval("begin $stdout = StringIO.new;
                  #{params[:cmd]}; $stdout.string;
                  ensure $stdout = STDOUT end")

    payload = { result: result }
    return payload.to_json
  end
end
