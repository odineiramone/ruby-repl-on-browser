var terminal = document.getElementById('terminal');

function cleanTerminal() {
  terminal.value = '';
}

function mandaEsseTrecoPraFora() {
  var command = editor.getValue();

  if (command !== '') {
      try {
        var http = new XMLHttpRequest();
        var url = "/api/ruby";

        var params = "cmd=" + encodeURIComponent(command);

        http.open("POST", url, false);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.send(params);

        result = JSON.parse(http.responseText).result.trim();
        if (result !== undefined) { terminal.value = result; }
      } catch(e) {
        terminal.value = e;
      }
  } else {
    terminal.value = '';
  }
}

function loadCode(select){
  var selected_option = select.options[select.selectedIndex].id;
  cleanTerminal();

  switch (selected_option) {
    case 'greet':
      editor.setValue("# The Greeter class\n\
class Greeter\n\
  attr_writer :name\n\
  def initialize(name)\n\
    @name = name.capitalize\n\
  end\n\
  \n\
  def salute\n\
    puts \"Hello #{@name}!\"\n\
  end\n\
end\n\
\n\
# Create a new object\n\
g = Greeter.new(\"world\")\n\
\n\
# Output \"Hello World!\"\n\
g.salute\n\
\n\
# put your name here!\n\
g.name = \"Your name here!\"\n\
\n\
# hello visitor\n\
g.salute\n\
                      ");
      break;

    case 'fizz':
      editor.setValue("def fizzbuzz(num_qtd)\n\
 for i in 1..num_qtd\n\
   if i % 3 == 0 &&  i % 5 == 0\n\
     print 'fizzbuzz, '\n\
   elsif i % 3 == 0 && i % 5 != 0\n\
     print 'fizz, '\n\
   elsif i % 3 != 0 && i % 5 == 0\n\
     print 'buzz, '\n\
   else\n\
     print \"#{i}, \"\n\
   end\n\
 end\n\
end\n\
\n\
fizzbuzz(15)\n\
");
      break;
    case 'array':
      editor.setValue("# Ruby knows what you\n\
# mean, even if you\n\
# want to do math on\n\
# an entire Array\n\
cities  = %w[ London\n\
             Oslo\n\
             Paris\n\
             Amsterdam\n\
             Berlin ]\n\
visited = %w[Berlin Oslo]\n\
\n\
puts \"I still need \" +\n\
     \"to visit the \" +\n\
     \"following cities:\",\n\
     cities - visited\n\
                    ");
      break;
    case 'love':
      editor.setValue("# Output \"I love Ruby\"\n\
say = \"I love Ruby\"\n\
puts say\n\
\n\
# Output \"I *LOVE* RUBY\"\n\
say['love'] = \"*love*\"\n\
puts say.upcase\n\
\n\
# Output \"I *love* Ruby\"\n\
# five times\n\
5.times { puts say }\n\
                      ");
      break;
    case 'hello':
      editor.setValue("puts 'Hello World!'");
      break;
    default:
      editor.setValue("puts 'Hello World!'");
  }
}
