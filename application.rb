require 'sinatra'
require 'sinatra/namespace'
require 'json'
require 'pry'

get '/' do
  erb :index
end

namespace '/api' do
  post '/ruby' do
    result = eval("begin $stdout = StringIO.new;
                  #{params[:code]}; $stdout.string;
                  ensure $stdout = STDOUT end")

    result += "\n=>" + eval(params[:code]).to_s

    payload = { result: result }
    return payload.to_json
  end
end
