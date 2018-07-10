const topicRouter = require("express").Router();
const { getAllTopics, getTopicByID } = require("../controllers/topicController");
const { getArticlesByTopicID, postArticleByTopicID } = require("../controllers/articleController");

topicRouter.route("/").get(getAllTopics);

topicRouter.route("/:topic_id").get(getTopicByID);

topicRouter
  .route("/:topic_id/articles")
  .get(getArticlesByTopicID)
  .post(postArticleByTopicID);

module.exports = topicRouter;
