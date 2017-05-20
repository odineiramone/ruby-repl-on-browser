require 'minitest/autorun'
require 'minitest/pride'
require_relative '../../models/kernel'

class KernelTest < Minitest::Test
  def test_exec_raise_error_when_is_called
    assert_raises "undefined method `system' for main:Object" do
      exec 'echo *'
    end
  end

  def test_system_raise_error_when_is_called
    assert_raises "undefined method `system' for main:Object" do
      system 'ls -la'
    end
  end

  def test_backticks_raise_error_when_is_called
    assert_raises "undefined method `system' for main:Object" do
      `sudo su`
    end
  end
end
