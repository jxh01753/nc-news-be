process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const app = require('../app');
const request = require('supertest')(app);
const seedDB = require('../seed/seed');
const testData = require('../seed/testData/index.js');
const mongoose = require('mongoose');

describe('', () => {
  let comments, articles, topics, users
  beforeEach(() => {
    return seedDB(testData)
    .then(result => {
      [comments, articles, topics, users] = result;
    });
  });
  after(() => {
    return mongoose.disconnect();
  })
  describe('nc-news', () => {
    describe('topics', () => {
      it('GET responds with status 200 and a list of all topics', () => {
        return request
        .get(`/api/topics`)
        .expect(200)
        .then(res => {
          expect(res.body.topics[0]).to.have.keys('_id', 'title', 'slug', '__v');
          expect(res.body.topics.length).to.equal(2);
        })
      })
    })
    describe('topics/:topic_id', () => {
      it('GET responds with status 200 for a specific topic', () => {
        return request
        .get(`/api/topics/${topics[0]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body.topic).to.have.keys('_id', 'title', 'slug', '__v');
          expect(res.body.topic.title).to.equal('Mitch');
        });
      })
      it('GET responds with status 400 for an invalid mongo ID', () => {
        return request
        .get(`/api/topics/bananas`)
        .expect(400)
        .then(res => {
          expect(res.body.message).to.equal(`Bad Request: bananas is an invalid ID`);
        });
      });
      it('Get responds with status 404 for a valid topic id that does not exist', () => {
        return request
        .get(`/api/topics/${articles[0]._id}`)
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal(`Page not found for ${articles[0]._id}`);
        })
      })
    });
    describe('/topics/:topic_slug/articles', () => {
      it ('GET responds with status 200 with list of articles for a specific topic', () => {
        return request
        .get('/api/topics/mitch/articles')
        .expect(200)
        .then(res => {
          expect(res.body.result.length).to.equal(2);
          expect(res.body.result[0].belongs_to.slug).to.equal('mitch');
        });
      });
      it ('GET responds with status 404 for an invalid topic', () => {
        return request
        .get(`/api/topics/bananas/articles`)
        .expect(404)
        .then(res => {
            expect(res.body.message).to.equal(`There are no articles for topic bananas.`)
        })
      })
      it('POST responds with status 201 with a newly added article', () => {
        return request
        .post(`/api/topics/coding/articles`)
        .send({title: 'COBOL for beginners', body: 'COBOL is a language that is a language. Of all the languages, it certainly could be described as a language, but other languages need to be considered when it comes to comparing this language with another language. If you had to rank the languages out of 10, this certainly would be considered a language/language. In conclusion, who are we to say what is or what is not a language'})
        .expect(201)
        .then(res => {
          console.log('pending test');
        })
      })
    });
  });
});