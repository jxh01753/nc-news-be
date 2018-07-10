# Northcoders News

This is the back-end API endpoints for Northcoders News. A reddit-like app for articles and discussions.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

If you'd like to get things going on your own machine:

- Have some sort of text editor; and,
- Some sort of compatible unix-like terminal environment.

If you have npm installed, you can type `npm i`. If not, you should get that first.

If you'd like to manually install, the dependencies are -

- `node v10.0.0`
- `bodyparser v1.15.2`;
- `ejs v2.6.1`;
- `express v4.16.3`; and
- `mongoose v5.0.14`.

The dev dependencies used are -

- `mocha v5.0.5` with the `chai v4.1.2` assertion library;
- `supertest v3.0.0`; and,
- `nodemon v1.17.4`.

All of which should be readily available on `npm` or `yarn` or your favourite package manager.

### Setting up a `config.js` file.

Once you've done the above, you'll need to set up a `config.js` file in the `root` folder.

It should look like this -

```
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

const config = {
  dev: {
    DB_URL: "mongodb://your-local-address:Your-Port/nc-news"
  },
  test: {
    DB_URL: "mongodb://your-local-address:Your-Port/nc-news-test"
  },
  production: {
    DB_URL: "mongodb://your-remote-address:your-port/nc-news"
  }
};

module.exports = config[process.env.NODE_ENV];
```

Once you've done this, you can start up `mongo` by typing `mongod` into a new terminal tab/window.

## Seed the database

Once you've done the above, you can seed the database using `npm seed:dev`. This may differ depending on your package manager.

Alternatively, you can also use `node seed.dev.js` to get things going.

## Running the tests

To run the tests, type `npm t`. It may differ depending on your package manager.

Alternatively, you can use `mocha spec/index.spec.js` to start the test suite.

Once you've done this, providing you have set `config.js` up correctly, the test suite should switch to the test database and re-seed after every `describe` block.

## Deployment

If you wish to deploy, you'll need to add an additional key value pair to your `config.js` for `deployment`.

The `package.json` should already have shortcuts set up, but if not, you can do the following:

- `npm run deploy` will switch the environment to `production` and attempt to seed to a remote database host.
- `npm start` is set up to switch to `production` when hosted remotely on a service like heroku.

There is a deployment of this app on heroku located here: [https://jxh01753-nc-news.herokuapp.com/api](https://jxh01753-nc-news.herokuapp.com/api)

## Built With

- [EJS](https://github.com/mde/ejs) - Embedded javascript for the front-end;
- [express](https://expressjs.com/) - Web framework for node;
- [mongoose](http://mongoosejs.com/) - Mongoose object modelling for node;
- [node](https://github.com/nodejs/node) - Nodejs Javascript runtime environment; and,
- [VSCode](https://github.com/Microsoft/vscode) - VSCode text editor.

## Authors

- **Northcoders** - _MongoDB schemas, outline of spec_ - [northcoders](https://github.com/northcoders/BE-FT-northcoders-news); and,
- **John Harrington** - _The rest of it_ - [jxh01753](https://github.com/jxh01753)

## Acknowledgments

- The fine folks on the other end of `nchelp`;
- The fine folks sitting nearby me who I bounced ideas off when I wrote this;
- Fan and/or air cooling/conditioning manufacturers for keeping the temperature down; and,
- The artists featured on and the curators of those "Now Thats What I Call Lo-Fi Hip-Hop JHop Radio 24/7" playlists on spotify and youtube.
