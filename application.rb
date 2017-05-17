require 'sinatra'
require 'sinatra/namespace'
require 'json'
# require 'pry'

module Kernel
  remove_method :exec
  remove_method :system
  remove_method :`
end

get '/' do
  erb :index
end

namespace '/api' do
  post '/ruby' do
    result = eval("begin $stdout = StringIO.new;
                  #{params[:cmd]}; $stdout.string;
                  ensure $stdout = STDOUT end")

    result += "=> " + (eval(params[:cmd]).to_s || 'nil')

    payload = { result: result }
    return payload.to_json
  end
end
