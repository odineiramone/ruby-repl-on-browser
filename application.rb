require 'sinatra'
require 'sinatra/namespace'
require 'json'
require './requirer.rb'

get '/' do
  erb :index
end

namespace '/api' do
  post '/ruby' do
    result = Commander.new.execute params[:cmd]
    return { result: result }.to_json
  end
end
