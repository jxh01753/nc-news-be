process.env.NODE_ENV = "test";
const { expect } = require("chai");
const app = require("../app");
const request = require("supertest")(app);
const seedDB = require("../seed/seed");
const testData = require("../seed/testData/index.js");
const mongoose = require("mongoose");

describe("", () => {
  let comments, articles, topics, users;
  beforeEach(() => {
    return seedDB(testData).then(result => {
      [comments, articles, topics, users] = result;
    });
  });
  after(() => {
    return mongoose.disconnect();
  });

  describe("nc-news", () => {
    /*
    TOPICS ENDPOINTS
    */

    describe("/topics", () => {
      it("GET responds with status 200 and a list of all topics", () => {
        return request
          .get(`/api/topics`)
          .expect(200)
          .then(res => {
            expect(res.body.topics[0]).to.have.keys("_id", "articles", "title", "slug", "__v");
            expect(res.body.topics.length).to.equal(2);
            expect(res.body.topics[0].articles).to.equal(2);
          });
      });
    });

    describe("/topics/:topic_id", () => {
      it("GET responds with status 200 for a specific topic", () => {
        return request
          .get(`/api/topics/${topics[0]._id}`)
          .expect(200)
          .then(res => {
            expect(res.body.topic).to.have.keys("_id", "title", "slug", "__v");
            expect(res.body.topic.title).to.equal("Mitch");
          });
      });

      it("GET responds with status 400 for an invalid mongo ID", () => {
        return request
          .get(`/api/topics/bananas`)
          .expect(400)
          .then(res => {
            expect(res.body.message).to.equal(`Bad Request: bananas is an invalid ID`);
          });
      });

      it("GET responds with status 404 for a valid topic id that does not exist", () => {
        return request
          .get(`/api/topics/${articles[0]._id}`)
          .expect(404)
          .then(res => {
            expect(res.body.message).to.equal(`Page not found for ${articles[0]._id}`);
          });
      });
    });

    describe("/topics/:topic_id/articles", () => {
      it("GET responds with status 200 with a list of articles for a specific topic", () => {
        return request
          .get(`/api/topics/${topics[0]._id}/articles`)
          .expect(200)
          .then(res => {
            expect(res.body.articles.length).to.equal(2);
            expect(res.body.articles[0].title).to.equal("Living in the shadow of a great man");
          });
      });

      it("POST responds with status 201 with a newly added article", () => {
        return request
          .post(`/api/topics/${topics[0]._id}/articles`)
          .send({
            title: "COBOL for beginners",
            body:
              "COBOL is a language that is a language. Of all the languages, it certainly could be described as a language, but other languages need to be considered when it comes to comparing this language with another language. If you had to rank the languages out of 10, this certainly would be considered a language/language. In conclusion, who are we to say what is or what is not a language",
            created_by: users[0]._id
          })
          .expect(201)
          .then(res => {
            expect(res.body.result).to.have.all.keys(
              "votes",
              "_id",
              "title",
              "body",
              "created_by",
              "belongs_to",
              "created_at",
              "__v"
            );
            expect(res.body.message).to.equal("Article posted!");
            return request.get(`/api/topics/${topics[0]._id}/articles`).then(result => {
              expect(result.body.articles.length).to.equal(3);
              expect(result.body.articles[2].title).to.equal("COBOL for beginners");
              expect(result.body.articles[2]).to.have.all.keys(
                "votes",
                "_id",
                "title",
                "body",
                "created_by",
                "belongs_to",
                "created_at",
                "__v"
              );
            });
          });
      });

      it("POST responds with status 404 when attempting to add an article to non-existent topic", () => {
        return request
          .post(`/api/topics/${users[0]._id}/articles`)
          .send({ title: "bananas", body: "double bananas", created_by: users[0]._id })
          .expect(404)
          .then(res => {
            expect(res.body.message).to.equal("Adding new article failed. Topic does not exist.");
          });
      });

      it("POST responds with 400 when attempting to add an article to invalid topic ID", () => {
        return request
          .post(`/api/topics/bananas/articles`)
          .expect(400)
          .then(res => {
            expect(res.body.message).to.equal("Bad Request: bananas is an invalid ID");
          });
      });
    });

    /*
      ARTICLES ENDPOINT
    */

    describe("/api/articles", () => {
      it("GET should return a list of articles and the status 200 OK", () => {
        return request
          .get(`/api/articles`)
          .expect(200)
          .then(res => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.articles.length).to.equal(4);
            expect(res.body.articles[0]).to.have.all.keys(
              "_id",
              "comments",
              "votes",
              "title",
              "created_by",
              "body",
              "created_at",
              "belongs_to",
              "__v"
            );
            expect(res.body.articles[0].comments).to.equal(2);
          });
      });
    });

    describe("/api/articles/:article_id", () => {
      it("GET should return a single article and the status code 200 OK", () => {
        return request
          .get(`/api/articles/${articles[0]._id}`)
          .expect(200)
          .then(res => {
            expect(res.body.article).to.have.all.keys(
              "_id",
              "votes",
              "title",
              "created_by",
              "body",
              "created_at",
              "belongs_to",
              "__v"
            );
            expect(res.statusCode).to.equal(200);
          });
      });

      it("GET should respond with 404 for valid mongo ID that does not exist", () => {
        return request
          .get(`/api/articles/${users[0]._id}`)
          .expect(404)
          .then(res => {
            expect(res.body.message).to.equal(`Page not found for ${users[0]._id}`);
          });
      });

      it("GET should respond with a 400 for an invalid mongoID", () => {
        return request
          .get(`/api/articles/bananas`)
          .expect(400)
          .then(res => {
            expect(res.body.message).to.equal(`Bad Request: bananas is an invalid ID`);
          });
      });

      it("PUT with query /:article_id?vote=up should increment the vote count by one on the specified article", () => {
        return request
          .put(`/api/articles/${articles[0]._id}?vote=up`)
          .expect(200)
          .then(res => {
            return request.get(`/api/articles/${articles[0]._id}`).then(result => {
              expect(result.body.article.votes).to.equal(articles[0].votes + 1);
            });
          });
      });
      it("PUT with query /:article_id?vote=down should decrease the vote count by one on the specified article.", () => {
        return request
          .put(`/api/articles/${articles[0]._id}?vote=down`)
          .expect(200)
          .then(res => {
            return request.get(`/api/articles/${articles[0]._id}`).then(result => {
              expect(result.body.article.votes).to.equal(articles[0].votes - 1);
            });
          });
      });

      it("PUT with invalid query should return status 400", () => {
        return request
          .put(`/api/articles/${articles[0]._id}?bananas=yes`)
          .expect(400)
          .then(res => {
            expect(res.body.message).to.equal("That is an invalid query");
          });
      });

      it("PUT with invalid query value should return status 400", () => {
        return request
          .put(`/api/articles/${articles[0]._id}?vote=maybe`)
          .expect(400)
          .then(res => {
            expect(res.body.message).to.equal("That is an invalid query");
          });
      });
    });

    /*
      COMMENTS BY ARTICLE ENDPOINT
    */

    describe("/api/articles/:article_id/comments", () => {
      it("GET should return status 200 OK and an array of comments for a specific article.", () => {
        return request
          .get(`/api/articles/${articles[0]._id}/comments`)
          .expect(200)
          .then(res => {
            expect(res.body.comments[0]).to.have.all.keys(
              "_id",
              "votes",
              "body",
              "belongs_to",
              "created_by",
              "created_at",
              "__v"
            );
            expect(res.body.comments.length).to.equal(2);
            expect(res.body.comments[0].body).to.equal(
              "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — on you it works."
            );
          });
      });

      it("GET should respond with 404 for valid mongo ID with does not exist", () => {
        return request
          .get(`/api/articles/${users[0]._id}/comments`)
          .expect(404)
          .then(res => {
            expect(res.body.message).to.equal(
              `Comments not found for article ${users[0]._id}. That article probably doesn't exist.`
            );
          });
      });

      it("GET should respond with a 400 for invalid mongoID", () => {
        return request
          .get(`/api/articles/bananas/comments`)
          .expect(400)
          .then(res => {
            expect(res.body.message).to.equal(`Bad Request: bananas is an invalid ID`);
          });
      });

      it("POST should return status 201 CREATED and an object with the new comment", () => {
        return request
          .post(`/api/articles/${articles[0]._id}/comments`)
          .send({ body: "test post please ignore", created_by: users[0]._id })
          .expect(201)
          .then(res => {
            expect(res.body.result).to.have.all.keys(
              "votes",
              "_id",
              "body",
              "created_by",
              "belongs_to",
              "created_at",
              "__v"
            );
            expect(res.body.result.body).to.equal("test post please ignore");
            expect(res.body.result.created_by).to.equal(String(users[0]._id));
            expect(res.body.message).to.equal("Comment posted!");
            return request.get(`/api/articles/${articles[0]._id}/comments`).then(result => {
              expect(result.body.comments.length).to.equal(3);
            });
          });
      });

      it("POST should return status 404 when attempting to post to a missing or non-existent article", () => {
        return request
          .post(`/api/articles/${users[0]._id}/comments`)
          .send({ body: "test post please ignore", created_by: users[0]._id })
          .expect(404)
          .then(res => {
            expect(res.body.message).to.equal("That article does not exist.");
          });
      });

      it("POST should return status 400 when missing required parameters", () => {
        return request
          .post(`/api/articles/${articles[0]._id}/comments`)
          .send({ body: "test post please ignore" })
          .expect(400)
          .then(res => {
            expect(res.body.message).to.equal("Bad Request: a required field is missing!");
          });
      });

      it("POST should return status 400 when attempting to post to an invalid ID", () => {
        return request
          .post(`/api/articles/bananas/comments`)
          .send({ body: "test post please ignore", created_by: users[0]._id })
          .expect(400)
          .then(res => {
            expect(res.body.message).to.equal("Bad Request: bananas is an invalid ID");
          });
      });
    });

    /*
    COMMENTS ENDPOINT
    */

    describe("/api/comments/:comment_id", () => {
      it("DELETE removes a comment by the comment_id", () => {
        return request
          .delete(`/api/comments/${comments[0]._id}`)
          .expect(200)
          .then(res => {
            expect(res.body.message).to.equal("Comment has been deleted.");
            return request.get(`/api/comments`).then(result => {
              expect(result.body.comments.length).to.equal(comments.length - 1);
            });
          });
      });

      it("DELETE returns a 404 error when passed a valid but non-existent ID", () => {
        return request
          .delete(`/api/comments/${users[0]._id}`)
          .expect(404)
          .then(res => {
            expect(res.body.message).to.equal("That comment does not exist.");
          });
      });

      it("DELETE returns a 400 error when passed an invalid ID", () => {
        return request
          .delete(`/api/comments/bananas`)
          .expect(400)
          .then(res => {
            expect(res.body.message).to.equal("Bad Request: bananas is an invalid ID");
          });
      });

      it("GET returns a 200 OK when passed valid mongoID", () => {
        return request
          .get(`/api/comments/${comments[0]._id}`)
          .expect(200)
          .then(res => {
            expect(res.body.comment._id).to.equal(String(comments[0]._id));
            expect(res.body.comment).to.have.keys(
              "_id",
              "votes",
              "body",
              "belongs_to",
              "created_by",
              "created_at",
              "__v"
            );
          });
      });

      it("PUT with the query ?vote=up increases the vote count of the comment by 1", () => {
        return request
          .put(`/api/comments/${comments[0]._id}?vote=up`)
          .expect(200)
          .then(res => {
            return request.get(`/api/comments/${comments[0]._id}`).then(result => {
              expect(result.body.comment.votes).to.equal(comments[0].votes + 1);
            });
          });
      });

      it("PUT with the query ?vote=down decreases the vote count of the comment by 1", () => {
        return request
          .put(`/api/comments/${comments[0]._id}?vote=down`)
          .expect(200)
          .then(res => {
            return request.get(`/api/comments/${comments[0]._id}`).then(result => {
              expect(result.body.comment.votes).to.equal(comments[0].votes - 1);
            });
          });
      });

      it("PUT with an invalid query should return status 400", () => {
        return request
          .put(`/api/comments/${comments[0]._id}?bananas=down`)
          .expect(400)
          .then(res => {
            expect(res.body.message).to.equal("That is an invalid query");
          });
      });

      it("PUT with an invalid query value should return status 400", () => {
        return request
          .put(`/api/comments/${comments[0]._id}?vote=maybe`)
          .expect(400)
          .then(res => {
            expect(res.body.message).to.equal("That is an invalid query");
          });
      });
    });

    /*
      USERNAME ENDPOINT
    */

    describe("/api/users/:username", () => {
      it("GET returns 200 OK with a JSON object of the specified user", () => {
        return request
          .get(`/api/users/${users[0].username}`)
          .expect(200)
          .then(res => {
            expect(res.body.user._id).to.equal(String(users[0]._id));
            expect(res.body.user).to.have.all.keys("_id", "username", "name", "avatar_url", "__v");
            expect(res.body.user.name).to.equal(users[0].name);
          });
      });

      it("GET returns 404 for non-existent users", () => {
        return request
          .get(`/api/users/bananas`)
          .expect(404)
          .then(res => {
            expect(res.body.message).to.equal("user bananas does not exist");
          });
      });
    });
  });
});
