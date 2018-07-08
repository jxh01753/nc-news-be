# Northcoders News

This is the back-end API endpoints for Northcoders News. A reddit-like app for articles and discussions.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

If you'd like to get things going on your own machine:

* Have some sort of text editor; and,
* Some sort of compatible unix-like terminal environment.


If you have npm installed, you can type `npm i`. If not, you should get that first.

If that doesn't work, the dependencies are -

* `bodyparser`;
* `ejs`;
* `express`; and
* `mongoose`.

The dev dependencies used are -
* `mocha` with the `chai` assertion library;
* `supertest`; and,
* `nodemon`.

All of which should be readily available on `npm` or `yarn` or your favourite package manager.

### Setting up a `config.js` file.

Once you've done the above, you'll need to set up a `config.js` file in the `root` folder.

There are three scenarios that are all pinned to the `process.env.NODE_ENV` key. 
On line 1, you should have `process.env.NODE_ENV = process.env_NODE_ENV || 'dev'`

In your `config.js` file, you should create a variable called `config` and the value of it should be an object with `dev`, `test` and `deployment` keys. The values of said keys should be another object, with the key value pairs `DB_URL: 'mongodb://YOUR_DB_ADDRESS_HERE:PORT'` for your differing scenarios.

The file should export `config[process.env.NODE_ENV]`.

Once you've done this, you can start up `mongoose` by typing `mongod` into a new terminal tab/window.

## Seed the database

Once you've done the above, you can seed the database using `npm seed:dev`. This may differ depending on your package manager.

If this doesn't work, you can also use `node seed.dev.js` to get things going.

## Running the tests

To run the tests, type `npm t`. It may differ depending on your package manager.

Alternatively, you can use `mocha spec/index.spec.js` to start the test suite.

Once you've done this, providing you have set `config.js` up correctly, the test suite should switch to the test database and re-seed after every `describe` block.

## Deployment

If you wish to deploy, you'll need to add an additional key value pair to your `config.js` for `deployment`. 

The `package.json` should already have shortcuts set up, but if not, you can do the following:

* `npm run deploy` will switch the environment to `production` and attempt to seed to a remote database host.
* `npm start` is set up to switch to `production` when hosted remotely on a service like heroku.   

If you're seeding to mlabs or another database host, make sure you've set your `mongodb` address in your `config.js` and then you can use `npm run deploy` and then deploy to your web app hosting service.

There is a deployment of this app on heroku located here: [https://jxh01753-nc-news.herokuapp.com/api](https://jxh01753-nc-news.herokuapp.com/api)

## Built With

* [EJS](https://github.com/mde/ejs) - Embedded javascript for the front-end;
* [express](https://expressjs.com/) - Web framework for node;
* [mongoose](http://mongoosejs.com/) - Mongoose object modelling for node;
* [node](https://github.com/nodejs/node) - Nodejs Javascript runtime environment; and,
* [VSCode](https://github.com/Microsoft/vscode) - VSCode text editor.

## Authors

* **Northcoders** - *MongoDB schemas, outline of spec* - [Northcoders](https://github.com/northcoders/BE-FT-northcoders-news); and,
* **John Harrington** - *The rest of it* - [jxh01753](https://github.com/jxh01753)

## Acknowledgments

* The fine folks on the other end of `nchelp`;
* The fine folks sitting nearby me who I bounced ideas off when I wrote this;
* Fan and/or air cooling/conditioning manufacturers for keeping the temperature down; and,
* The artists featured on and the curators of those "Now Thats What I Call Lo-Fi Hip-Hop JHop Radio 24/7" playlists on spotify and youtube.
