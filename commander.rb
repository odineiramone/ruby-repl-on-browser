# rubocop:disable Security/Eval
# rubocop:disable Style/Documentation
class Commander
  def execute(command)
    raise StandardError if command ~= /eval( |\()/
    result = eval("begin $stdout = StringIO.new;
                  #{command}; $stdout.string;
                  ensure $stdout = STDOUT end")

    result += '=> ' + (eval(command) || 'nil').to_s
    result
  rescue StandardError => e
    e.to_s
  end
end
