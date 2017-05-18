var editor

$(document).ready(function(){
  var code = $(".codemirror-textarea")[0];
  editor = CodeMirror.fromTextArea(code, {
    lineNumbers : true,
    lineWrapping : true,
    mode : "ruby",
    theme : "monokai",
    tabSize : '2'
  });
});
