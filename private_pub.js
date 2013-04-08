var server = process.env.PRIVATE_PUB_SERVER,
    token = process.env.PRIVATE_PUB_SECRET_TOKEN,
    signatureExpiration = 3600;

if (!server || !token) {
  console.log('No server or token configuration found. Be sure to set the environment variables PRIVATE_PUB_SERVER and PRIVATE_PUB_SECRET_TOKEN or use a secrets.yml file.')
}

subscription = function(options) {
  var sub = options || {};
  sub.server    = sub.server || server;
  sub.timestamp = sub.timestamp || getTimestamp();
  sub.signature = sha1([token, sub.channel, sub.timestamp].join(''));
  return sub;
};
  
getTimestamp = function() {
  return Math.round((new Date).getTime() * 1000);
};

var signatureIsExpired = function(timestamp) {
  return timestamp < ((new Date).getTime() - getTimestamp());
};

var authenticateSubscribe = function(message) {
  var subscription = subscription({channel: message.subscription, timestamp: message.ext.private_pub_timestamp});
  if (message.ext.private_pub_signature != subscription.signature)
    message.error = "Incorrect signature.";
  else if (signatureIsExpired(message.ext.private_pub_timestamp))
    message.error = "Signature has expired.";
  return message;
};

var authenticatePublish = function(message) {
  if (message.ext.private_pub_token !== token)
    message.error = "Incorrect token.";
  else
    message.ext.private_pub_token = null;
  return message;  
}

exports = {
  incoming: function(message, callback) {
    if (message.channel === '/meta/subscribe') {
      message = authenticateSubscribe(message);
    } else if (!message.channel.match(/^\/meta/)) {
      message = authenticatePublish(message);
    }
    callback(message);
  }
};


