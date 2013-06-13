var path = process.argv[2] || './secrets.yml';
var secrets = require('./secrets').forEnvironment(path, 'development');


if (!secrets.token || !secrets.server) {
  console.log('No secrets found to load.');
} else {
  
  process.env.PRIVATE_PUB_SECRET_TOKEN = secrets.token;
  process.env.PRIVATE_PUB_SERVER = secrets.server;
  require('./server');
  
}

