var http = require('http'),
  faye = require('faye');

var bayeux = new faye.NodeAdapter({mount:YOUR_MOUNT_PREFIX_GOES_HERE});

port = process.env.PORT || 3030;

var server = http.createServer(function(req,res) {
  res.writeHead(200, {'content-type': 'text/plain'});
  res.write('Tune in to ' + port + 'MHz for the best funk around');
  res.end();
});

console.log("Listening on port " + port);
bayeux.attach(server);

server.listen(port);
