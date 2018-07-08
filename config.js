process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

const config = {
  dev: {
    DB_URL: 'mongodb://localhost:27017/nc-news'
  },
  test: {
    DB_URL: 'mongodb://localhost:27017/nc-news-test'
  },
  production: {
    DB_URL: process.env.MONGODB_URI
  }
};

module.exports = config[process.env.NODE_ENV];
