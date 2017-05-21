require 'minitest/autorun'
require 'minitest/pride'
require 'rack/test'
require_relative '../../application.rb'

class ApplicationTest < Minitest::Test
  include Rack::Test::Methods
  define_method(:app) { Sinatra::Application }

  def test_get_index
    response = get '/'
    assert response.status, 200
  end

  def test_post_must_be_success
    response = post '/api/ruby', cmd: "puts 'Hello World!'"
    assert response.status, 200
  end

  def test_post_returns_a_string
    response = post '/api/ruby', cmd: "puts 'Hello World!'"
    assert response.body.class, String
  end

  def test_post_returns_a_expected_string
    response = post '/api/ruby', cmd: "puts 'Hello World!'"
    assert JSON.parse(response.body), 'result' => "Hello World!\n" + '=> nil'
  end
end
