var path = process.argv[2] || './secrets.yml';
var secrets = require('./secrets').forEnvironment(path, 'production');


if (!secrets.token || !secrets.server) {
  console.log('No secrets found to load to Heroku.');
} else {
  
  var sys = require('sys');
  var exec = require('child_process').exec;
  function puts(error, stdout, stderr) { sys.puts(stdout) }
  var command = "heroku config:add PRIVATE_PUB_SECRET_TOKEN=" + secrets.token + " PRIVATE_PUB_SERVER=" + secrets.server;
  exec(command, puts);
  
}