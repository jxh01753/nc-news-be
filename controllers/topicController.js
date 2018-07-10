const { Topic, Article } = require("../models/index");

const getAllTopics = (req, res, next) => {
  Topic.find()
    .lean()
    .then(topics => {
      const articleCounter = topics.map(topic => {
        return Article.count({ belongs_to: topic._id });
      });
      return Promise.all([topics, ...articleCounter]);
    })
    .then(([topics, ...count]) => {
      topics.forEach((topic, i) => {
        topic.articles = count[i];
      });
      res.status(200).send({ topics });
    })
    .catch(next);
};

const getTopicByID = (req, res, next) => {
  Topic.findById(req.params.topic_id)
    .then(topic => {
      topic === null
        ? next({ status: 404, message: `Page not found for ${req.params.topic_id}` })
        : res.status(200).send({ topic });
    })
    .catch(next);
};

module.exports = { getAllTopics, getTopicByID };
