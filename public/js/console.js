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
    case 'greet': editor.setValue(codes.greet); break;
    case 'fizz':  editor.setValue(codes.fizz);  break;
    case 'array': editor.setValue(codes.fizz);  break;
    case 'love':  editor.setValue(codes.love);  break;
    case 'hello': editor.setValue("puts 'Hello World!'"); break;
    default: editor.setValue("puts 'Hello World!'");
  }
}
