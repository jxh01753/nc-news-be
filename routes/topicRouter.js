const topicRouter = require('express').Router();
const {getAllTopics, getTopicByID} = require('../controllers/topicController');
const {getArticlesByTopicID, postArticleByTopicID} = require('../controllers/articleController');

topicRouter.get("/", (req, res, next) => {
  getAllTopics(req, res, next);
});

topicRouter.get("/:topic_id", (req, res, next) => {
  getTopicByID(req, res, next);
});

/* 
In the example, articles are accessed by topic slug, but in the spec they're 
accessed by topic_id. This implementation lets a user access the list of articles
by SLUG but then post by ID
*/

// topicRouter.get("/:topic_slug/articles", getArticlesByTopicID)

topicRouter.get("/:topic_id/articles", getArticlesByTopicID)

topicRouter.post("/:topic_id/articles", postArticleByTopicID)


module.exports = topicRouter;