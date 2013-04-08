var http = require('http'),
  faye = require('faye'),
  sha1 = require('sha1'),
  privatePub = require('./private_pub');

var port = process.env.PORT || 3030;

var bayeux = new faye.NodeAdapter({mount:'/faye'});


bayeux.addExtension(privatePub);


var server = http.createServer(function(req,res) {
  res.writeHead(200, {'content-type': 'text/plain'});
  res.write('Tune in to ' + port + 'MHz for the best funk around');
  res.end();
});

console.log("Listening on port " + port);
bayeux.attach(server);

server.listen(port);
