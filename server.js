var faye = require('faye'),
  sha1 = require('sha1'),
  privatePub = require('./private_pub');

if (!process.env.PRIVATE_PUB_SERVER)
{
  var yaml = require('js-yaml'),
      fs   = require('fs'),
      path = process.env.PRIVATE_PUB_CONF || './.env';
  
  try {
    var yamlFile = fs.readFileSync(path, 'utf8');
    var config = yaml.safeLoad(yamlFile);
    var keys = Object.keys(config);
    for (i in keys) {
      var key = keys[i];
      process.env[key] = config[key];
    }
    console.log('Environment loaded.');
  } catch (e) {
    console.log(".env file not found");
  }
}

var port = process.env.PORT || 3030;
var bayeux = new faye.NodeAdapter({mount:'/faye'});
bayeux.addExtension(privatePub);

callback = function(req,res) {
  res.writeHead(200, {
    'content-type': 'text/plain', 
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Request-Method': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*'
    });
  res.write('Tune in to ' + port + 'MHz for the best funk around');
  res.end();
}

if (process.env.PRIVATE_PUB_CERTIFICATE)
{
  var options = {}
  options.key = fs.readFileSync(process.env.PRIVATE_PUB_PRIVATEKEY);
  options.cert= fs.readFileSync(process.env.PRIVATE_PUB_CERTIFICATE);
  console.log('Enabling SSL mode.');
  var server = require('https').createServer(options, callback);
} else {
  var http = require('http');
  var server = http.createServer(callback);
}

bayeux.attach(server);

server.listen(port, function(){
  console.log("Listening on port " + port);
});
