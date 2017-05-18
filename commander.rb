# rubocop:disable Security/Eval
# rubocop:disable Style/Documentation
class ForbiddenMethodError < StandardError
  def message
    "Please, don't use this method!"
  end
end

class Commander
  def execute(command)
    raise ForbiddenMethodError if command =~ /(eval|File|Dir)( |\(|\.)/

    result = eval("begin
                    $stdout = StringIO.new;
                    #{command};
                    $stdout.string;
                  ensure
                    $stdout = STDOUT
                  end")

    result += '=> ' + (eval(command) || 'nil').to_s
    result
  rescue => e
    "#{e.class}: #{e.message}"
  end
end
