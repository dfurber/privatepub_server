### Description

Setting up a [Faye Server](http://faye.jcoglan.com/) that's ready to deploy on [Heroku](http://heroku.com)

### Deployment

 * Update the NodeAdapter initialization line in server.js to reflect your desired subscribe endpoint prefix.

    var bayeux = new faye.NodeAdapter({mount:YOUR_MOUNT_PREFIX_GOES_HERE});

 * Follow instructions for deploying a node app to Heroku ([instructions here](https://devcenter.heroku.com/articles/nodejs)).


