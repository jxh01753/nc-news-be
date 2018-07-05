const {Article} = require('../models/index.js');

const getAllArticles = (req, res, next) => {
  console.log('hello');
  Article.find()
  .populate({path: 'belongs_to', select: '-__v -title -_id'})
  .populate({path: 'created_by', select: 'username -_id'})
  .lean()
  .then(articles => {
    console.log(articles);
    res.status(200).send({articles});
  }).catch(console.log);
};

const getArticlesByTopicID = (req, res, next) => {
  Article.find({belongs_to: req.params.topic_slug})
  .populate({path: 'belongs_to', select:'slug -_id'})
  .populate({path: 'created_by', select:'username -_id'})
  .then(articles => {
    res.status(200).send({articles})
  }).catch(console.log);
}

module.exports = {getAllArticles, getArticlesByTopicID};