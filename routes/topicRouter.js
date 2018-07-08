const topicRouter = require('express').Router();
const {getAllTopics, getTopicByID} = require('../controllers/topicController');
const {getArticlesByTopicID, postArticleByTopicID} = require('../controllers/articleController');


topicRouter.route("/").get(getAllTopics);
topicRouter.route("/:topic_id").get(getTopicByID)
topicRouter.route("/:topic_id/articles").get(getArticlesByTopicID).post(postArticleByTopicID)

module.exports = topicRouter;

/* 
In the example, articles are accessed by topic slug, but in the spec they're 
accessed by topic_id. This implementation lets a user access the list of articles
by SLUG but then post by ID
*/

// topicRouter.get("/:topic_slug/articles", getArticlesByTopicID)