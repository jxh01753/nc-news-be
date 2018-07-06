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

const getArticleByID = (req, res, next) => {
  Article.findById(req.params.article_id)
  .populate({path: 'belongs_to'})
  .populate({path:'created_by'})
  .lean()
  .then(article => {
    article === null
    ? next({status: 404, message: `Page not found for ${req.params.article_id}`})
    : res.status(200).send({article});
  }).catch(next);
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

const postArticleByTopicID = (req, res, next) => {
  const newArticle = new Article({...req.body, belongs_to: req.params.topic_id})
  newArticle
  .save()
  .then(result => {
    res.status(201).send({result, message: `Article posted!`})
  }).catch(next);
}

module.exports = {getAllArticles, getArticlesByTopicID, postArticleByTopicID, getArticleByID};