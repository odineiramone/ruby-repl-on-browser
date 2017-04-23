$(document).ready(function(){
  var code = $(".codemirror-textarea")[0];
  var editor = CodeMirror.fromTextArea(code, {
    lineNumbers : true,
    lineWrapping : true,
    mode : "ruby",
    theme : "monokai"
  });
});
