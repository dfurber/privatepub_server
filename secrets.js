require('js-yaml');

exports.forEnvironment = function(path, env) {

  var path = path ||  './secrets.yml';
  try {
    var config = require(path);
  } catch (e) {
    console.log("secrets.yml not found");
  }

  return {
    token: config[env].PRIVATE_PUB_SECRET_TOKEN || config.PRIVATE_PUB_SECRET_TOKEN,
    server: config[env].PRIVATE_PUB_SERVER || config.PRIVATE_PUB_SERVER
  };
};

