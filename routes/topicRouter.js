const topicRouter = require('express').Router();
const {getAllTopics} = require('../controllers/topicController');

topicRouter.get("/", (req, res, next) => {
  getAllTopics(req, res, next);
});

module.exports = topicRouter;