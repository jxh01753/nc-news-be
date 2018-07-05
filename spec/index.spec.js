const { expect } = require('chai');
const app = require('../app');
const request = require('supertest')(app);
const seedDB = require('../seed/seed');
const testData = require('../seed/testData/index.js');
const mongoose = require('mongoose');

describe('', () => {
  let comments
  let articles
  let users
  let topics
  beforeEach(() => {
    return seedDB(testData)
    .then(result => {
      console.log(result);
      [comments, articles, users, topics] = result;
    });
  });
  after(() => {
    return mongoose.disconnect();
  })
  describe('nc-news', () => {
    describe('topics', () => {
      it('GET responds with status 200 and a list of all topics', () => {
        return request
        .get(`/topics`)
        .expect(200)
        .then(res => {
          console.log(res.body);
          expect(res.body.length).to.equal(2);
        })
      })
    })
  })
})