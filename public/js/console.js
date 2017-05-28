var terminal = document.getElementById('terminal');

var button = document.getElementById('save');
button.addEventListener('click', saveTextAsFile);

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
    case 'array': editor.setValue(codes.array);  break;
    case 'love':  editor.setValue(codes.love);  break;
    case 'hello': editor.setValue("puts 'Hello World!'"); break;
    default: editor.setValue("puts 'Hello World!'");
  }
}

function saveTextAsFile() {
  var textToWrite = editor.getValue();
  var textFileAsBlob = new Blob([ textToWrite ], { type: "text/plain" });
  var fileNameToSaveAs = timestampString() + '_awesome_ruby.rb'

  var downloadLink = document.createElement("a");
  downloadLink.download = fileNameToSaveAs;
  downloadLink.innerHTML = "Download File";

  if (window.webkitURL != null) {
    // Chrome allows the link to be clicked without actually adding it to the DOM.
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
  } else {
    // Firefox requires the link to be added to the DOM before it can be clicked.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
  }

  downloadLink.click();
}

function destroyClickedElement(event) {
  // remove the link from the DOM
  document.body.removeChild(event.target);
}

function timestampString() {
  var date = new Date();
  return date.timestamp();
}

Date.prototype.timestamp = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd,
          this.getHours(),
          this.getMinutes(),
          this.getSeconds()
         ].join('');
};
