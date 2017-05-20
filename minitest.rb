# ruMann all tests
Dir['tests/**/*.rb'].each { |file| system "ruby #{file}" }
