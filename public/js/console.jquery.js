var terminal = document.getElementById('terminal');

function mandaEsseTrecoPraFora() {
  var command = editor.getValue();

  if (command !== '') {
      try {
        var http = new XMLHttpRequest();
        var url = "/api/ruby";

        var params = "cmd=" + command;

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
