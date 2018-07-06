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
    describe('/topics/:topic_id', () => {
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

    /*
      The spec mentions that this needs to work for topic_id, but the example only works for topic_slug. So this has been done for topic_slug
    */

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

      /*
        The following tests need their own describe block because they're on the topic_id route instead of the topic_slug route.
      */

      it('POST responds with status 201 with a newly added article', () => {
        return request
        .post(`/api/topics/5b3f3f0f2aff98c29b8f284e/articles`)
        .send({title: 'COBOL for beginners', body: 'COBOL is a language that is a language. Of all the languages, it certainly could be described as a language, but other languages need to be considered when it comes to comparing this language with another language. If you had to rank the languages out of 10, this certainly would be considered a language/language. In conclusion, who are we to say what is or what is not a language', created_by: users[0]._id})
        .expect(201)
        .then(res => {
          expect(res.body.result).to.have.all.keys('votes', '_id', 'title', 'body', 'created_by', 'belongs_to', 'created_at', '__v')
          expect(res.body.message).to.equal('Article posted!')
        })
      })
      xit('POST responds with status 400 for requests with invalid mongo IDs', () => {
        return request
        .post(`/api/topics/${articles[0]._id}/articles`)
        .send({title: 'bananas', body: 'double bananas', created_by: users[0]._id})
        .expect(201)
        .then(res => {
          // console.log(res);
        })
      })
    });
    describe('/api/articles', () => {
      it('GET should return a list of articles and the status 200 OK', () => {
        return request
        .get(`/api/articles`)
        .expect(200)
        .then(res => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.articles.length).to.equal(4);
          expect(res.body.articles[0]).to.have.all.keys('_id', 'votes', 'title', 'created_by', 'body', 'created_at', 'belongs_to', '__v');
        });
      });
    });
    describe('/api/articles/:article_id', () => {
      it('GET should return a single article and the status code 200 OK', () => {
        return request
        .get(`/api/articles/${articles[0]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body.article).to.have.all.keys('_id', 'votes','title', 'created_by', 'body', 'created_at', 'belongs_to', '__v')
          expect(res.statusCode).to.equal(200);
        });
      })
      it('GET should respond with 404 for valid mongo ID that does not exist', () => {
        return request
        .get(`/api/articles/${users[0]._id}`)
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal(`Page not found for ${users[0]._id}`);
        })
      })
      it('GET should respond with a 400 for an invalid mongoID', () => {
        return request
        .get(`/api/articles/bananas`)
        .expect(400)
        .then(res => {
          expect(res.body.message).to.equal(`Bad Request: bananas is an invalid ID`)
        })
      })
    })
    describe('/api/articles/:article_id/comments', () => {
      it('GET should return status 200 OK and an array of comments for a specific article.', () => {
        return request
        .get(`/api/articles/${articles[0]._id}/comments`)
        .expect(200)
        .then(res => {
          expect(res.body.comments[0]).to.have.all.keys('_id', 'votes', 'body', 'belongs_to', 'created_by', 'created_at', '__v');
          expect(res.body.comments.length).to.equal(2);
        });
      });
      it('GET should respond with 404 for valid mongo ID with does not exist', () => {
        return request
        .get(`/api/articles/${users[0]._id}/comments`)
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal(`Comments not found for article ${users[0]._id}. That article probably doesn't exist.`)
        })
      })
      it('GET should respond with a 400 for invalid mongoID', () => {
        return request
        .get(`/api/articles/bananas/comments`)
        .expect(400)
        .then(res => {
          expect(res.body.message).to.equal(`Bad Request: bananas is an invalid ID`)
          console.log(res)
        })
      })
      it('POST should return status 201 CREATED and an object with the comment in', () => {
        return request
        .post(`/api/articles/${articles[0]._id}/comments`)
        .send({body: 'test post please ignore', created_by: users[0]._id})
        .expect(201)
        .then(res => {
          expect(res.body.message).to.equal('Article posted!')
        })
      })
    });
  });
});