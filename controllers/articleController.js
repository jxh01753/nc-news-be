const {Article} = require('../models/index.js');

const getAllArticles = (req, res, next) => {
  Article.find()
  .populate({path: 'belongs_to', select: 'slug'})
  .populate({path: 'created_by', select: 'username -_id'})
  .lean()
  .then(articles => {
    res.status(200).send({articles});
  }).catch(console.log);
};

const getArticlesByTopicID = (req, res, next) => {
  const {topic_slug} = req.params

  Article.find()
  .populate({path: 'belongs_to', select:'slug'})
  .populate({path: 'created_by', select:'username'})
  .lean()
  .then(result => {
    result = result.filter(items => {
      return items.belongs_to.slug === topic_slug
    });

    if (result.length === 0) {
     return next({status: 404, message: `There are no articles for topic ${topic_slug}.`})
    }
    res.status(200).send({result});
  }).catch(next)
}

module.exports = {getAllArticles, getArticlesByTopicID};