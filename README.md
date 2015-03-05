### Description

This is a port of Ryan Bates' Private Pub Faye extension so that you can run a Node.JS Private Pub server instead of the bundled Ruby one.

Setting up a Private Pub [Faye Server](http://faye.jcoglan.com/) that's ready to deploy on [Heroku](http://heroku.com)

### Local Development

 * Run 'npm install -g'. If you're new to node, you may have to install node.js and npm in order for any of this to work.

 * Configure your .env file. You are most likely using this with the Rails private_pub gem. See the included .env.example file.
 
 * Start the development server: pm2 start server.js --name privatepub
 
 * Stop the server: pm2 stop privatepub
 
### Deployment to Ubuntu

 * Create a privatepub user: useradd -d privatepub
 
 * Become that user: su privatepub
 
 * Clone the repo: git clone git@github.com:dfurber/privatepub_server.git /home/privatepub

 * Follow the instructions for local development. You can either create a .env file or export the needed variables into your environment.
 
 * Run "pm2 startup server.js --name privatepub" as the user you wish to run privatepub as a daemon. It will give you a command to run as root. Run it.
 
 * Either reboot or run the start command as in development.
 
### Deployment to Heroku

 * It isn't a good idea to run this on Heroku because Faye wants to use websockets. If you need to toss it up there, you can. Hence this repo includes a Procfile.

 * Follow instructions for deploying a node app to Heroku ([instructions here](https://devcenter.heroku.com/articles/nodejs)).
 
 * Load the production configuration to heroku using the heroku config:set command.



