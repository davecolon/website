k-plus
==========

IT'S GOT WHAT PLANTS CRAVE!

## CLI Tools

- Install [NodeJS](https://nodejs.org/en/) LTS version, and update package.json's engines field if necessary.

- Install [PM2](https://github.com/Unitech/pm2). This allows us to edit server files and automatically restart the server to pick up new changes. Also keeps logs organized, and can run in the background.

### Setup

`npm install`: install node_modules

### Local server

`npm run start-local`: start a dev server on localhost:3000, and show logs

Edit local server config in ./dev/env/local.json


## Development

### HTML (PUG)

For development we are using [PUGJS (also known as JADE)](https://www.npmjs.com/package/pug), the jade files are inside **views**, 
**index.jade** correspond to the main code, **navbar.jade** to the navigation bar, and **layout.jade to the header tags.

### ASSETS

The folder **public** contains all the assets for the website:
+ **assets:**
   This folder has the documents, fonts, images and videos for the website

+ **js**
   This folder has the javascript functionality for the website.

+ **styles**
   This folder contain the [sass](http://sass-lang.com/guide) files for the styles.

### CMS

The content is being pull out from googlesheet, any copy change must be done there.


## Deploy
+ Go to the project on the [Google cloud console](https://console.cloud.google.com/)
+ Select **Compute Engine** and click on `SSH` for connecting to the VM
+ Go to website folder, `cd website`
+ Pull the last changes from the github repository `git pull`
+ Call the following commands to deploy the server:
  1. `sudo pm2 kill`
  2. `sudo pm2 start dev/env/production.json`
  3. `sudo pm2 startup`
  4. `sudo pm2 save`
  5. `sudo reboot`

## Killing Apache:
In case of seeing the apache template when navigating to the url, you will have to kill apache and then follow the deployment steps again, starting from step 2.
+ `sudo update-rc.d -f  apache2 remove`
+ `sudo reboot`


More info [Setting up express on google compute](https://codepen.io/positlabs/post/setting-up-express-on-google-compute)