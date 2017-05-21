require 'minitest/autorun'
require 'minitest/pride'
require_relative '../../models/commander'

class CommanderTest < Minitest::Test
  define_method(:setup) { @cmd = Commander.new }

  ##########
  # eval
  ##########
  def test_eval_method_return_string
    assert_kind_of String, @cmd.execute("eval puts 'test'")
  end

  def test_eval_method_return_string_with_error
    assert "ForbiddenMethodError: Please, don't use this method!", @cmd.execute("eval puts 'test'")
  end

  ##########
  # File
  ##########
  def test_file_method_return_string
    assert_kind_of String, @cmd.execute('File.open')
  end

  def test_file_method_return_string_with_error
    assert "ForbiddenMethodError: Please, don't use this method!", @cmd.execute('File.open')
  end

  ##########
  # Dir
  ##########
  def test_dir_method_return_string
    assert_kind_of String, @cmd.execute('puts Dir.pwd')
  end

  def test_dir_method_return_string_with_error
    assert "ForbiddenMethodError: Please, don't use this method!", @cmd.execute('puts Dir.pwd')
  end

  ##########
  # Dir
  ##########
  def test_io_method_return_string
    assert_kind_of String, @cmd.execute('IO.binread("super_secret_file")')
  end

  def test_io_method_return_string_with_error
    assert "ForbiddenMethodError: Please, don't use this method!", @cmd.execute('IO.binread("super_secret_file")')
  end

  ##########
  # require
  ##########
  def test_require_method_return_string
    assert_kind_of String, @cmd.execute("require 'something'")
  end

  def test_require_method_return_string_with_error
    assert "ForbiddenMethodError: Please, don't use this method!", @cmd.execute("require 'something'")
  end

  def test_inoffensive_things_return_string
    assert_kind_of String, @cmd.execute('1 + 1')
    assert_kind_of String, @cmd.execute("puts 'hello world'")
    assert_kind_of String, @cmd.execute("name = 'John Doe'\n" + "puts \"hello \#{name}\"")
  end

  def test_inoffensive_things_return_string_with_results
    assert_match '2', @cmd.execute('1 + 1')
    assert_match 'hello world', @cmd.execute("puts 'hello world'")
    assert_match 'hello John Doe', @cmd.execute("name = 'John Doe'\n" + "puts \"hello \#{name}\"")
  end
end
