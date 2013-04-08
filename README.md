### Description

This is a port of Ryan Bates' Private Pub Faye extension so that you can run a Node.JS Private Pub server instead of the bundled Ruby one.

Setting up a Private Pub [Faye Server](http://faye.jcoglan.com/) that's ready to deploy on [Heroku](http://heroku.com)

### Local Development

 * Run 'npm install'. If you're new to node, you may have to install node.js and npm in order for any of this to work.

 * Configure your secrets file. You are most likely using this with the Rails private_pub gem. We recommend using the ([secretive gem](https://github.com/singlebrook/secretive)) to store the Private Pub configuration. Alternately, you can copy the included secrets.yml file with your server name and token.
 
 * If you are using private_pub.yml in your Rails app, then create a new secrets.yml file in the node project folder and copy over your token and server info to fit the template. 
 
 * Load the configuration locally: node local.js [/path/to/secrets.yml]
 
 * Fire up the development server: node server.js
 
### Deployment to Heroku

 * Follow instructions for deploying a node app to Heroku ([instructions here](https://devcenter.heroku.com/articles/nodejs)).
 
 * Load the production configuration to heroku: node heroku.js [/path/to/secrets.yml]



