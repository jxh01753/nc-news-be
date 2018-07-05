const topicRouter = require('express').Router();
const {getAllTopics, getTopicByID} = require('../controllers/topicController');
const {getArticlesByTopicID} = require('../controllers/articleController');

topicRouter.get("/", (req, res, next) => {
  getAllTopics(req, res, next);
});

topicRouter.get("/:topic_id", (req, res, next) => {
  getTopicByID(req, res, next);
});

topicRouter.get("/:topic_slug/articles", (req, res, next) => {
  getArticlesByTopicID(req, res, next);
})

module.exports = topicRouter;