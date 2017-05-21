ENV['RACK_ENV'] = 'test'

# run all tests
Dir['tests/**/*.rb'].each { |file| system "ruby #{file}" }
