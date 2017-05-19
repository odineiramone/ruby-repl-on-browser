app_files = File.expand_path('../models/*.rb', __FILE__)
Dir.glob(app_files).each { |file| require file }
