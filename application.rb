require 'sinatra'
require 'sinatra/namespace'
require 'json'
require './kernel.rb'

get '/' do
  erb :index
end

namespace '/api' do
  post '/ruby' do
    result = eval("begin $stdout = StringIO.new;
                  #{params[:cmd]}; $stdout.string;
                  ensure $stdout = STDOUT end")

    result += '=> ' + (eval(params[:cmd]) || 'nil').to_s

    payload = { result: result }
    return payload.to_json
  end
end
