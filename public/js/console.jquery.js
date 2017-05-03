jQuery(function($, undefined) {
  $('#term_demo').terminal(function(command) {
      if (command !== '') {
          try {
            var http = new XMLHttpRequest();
            var url = "/api/ruby";
            var params = "cmd=" + command;

            http.open("POST", url, false);
            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            http.send(params);

            result = JSON.parse(http.responseText).result.trim();
            if (result !== undefined) { this.echo(new String(result)); }
          } catch(e) {
            this.error(new String(e));
          }
      } else {
        this.echo('');
      }
  },
  {
    greetings: 'ruby 2.4.1p111 (2017-03-22 revision 58053)',
    name: 'ruby_demo',
    height: 500,
    prompt: '$ '
  });
});
