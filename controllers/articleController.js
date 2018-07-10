const { Article, Topic, Comment } = require("../models/index.js");

const getAllArticles = (req, res, next) => {
  Article.find()
    .populate("created_by", "username")
    .lean()
    .then(articles => {
      const commentCounter = articles.map(article => {
        return Comment.count({ belongs_to: article._id });
      });
      return Promise.all([articles, ...commentCounter]);
    })
    .then(([articles, ...count]) => {
      articles.forEach((article, i) => {
        article.comments = count[i];
      });
      res.status(200).send({ articles });
    })
    .catch(next);
};

const getArticleByID = (req, res, next) => {
  Article.findById(req.params.article_id)
    .populate({ path: "belongs_to" })
    .populate({ path: "created_by" })
    .lean()
    .then(article => {
      article === null
        ? next({ status: 404, message: `Page not found for ${req.params.article_id}` })
        : res.status(200).send({ article });
    })
    .catch(next);
};

const getArticlesByTopicID = (req, res, next) => {
  Article.find({ belongs_to: { _id: req.params.topic_id } })
    .populate({ path: "belongs_to" })
    .populate({ path: "created_by", select: "username" })
    .lean()
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

const postArticleByTopicID = (req, res, next) => {
  Topic.findById(req.params.topic_id)
    .lean()
    .then(topic => {
      if (topic === null) {
        next({ status: 404, message: `Adding new article failed. Topic does not exist.` });
      } else {
        const newArticle = new Article({ ...req.body, belongs_to: req.params.topic_id });
        newArticle
          .save()
          .then(result => {
            res.status(201).send({ result, message: `Article posted!` });
          })
          .catch(next);
      }
    })
    .catch(next);
};

const adjustArticleVoteCount = (req, res, next) => {
  if (req.query.vote === "up") {
    Article.findOneAndUpdate({ _id: req.params.article_id }, { $inc: { votes: 1 } })
      .then(result => {
        res.status(200).send("upvoted!");
      })
      .catch(next);
  } else if (req.query.vote === "down") {
    Article.findOneAndUpdate({ _id: req.params.article_id }, { $inc: { votes: -1 } })
      .then(result => {
        res.status(200).send("downvoted!");
      })
      .catch(next);
  } else {
    next({ status: 400, message: "That is an invalid query" });
  }
};

module.exports = {
  getAllArticles,
  getArticlesByTopicID,
  postArticleByTopicID,
  getArticleByID,
  adjustArticleVoteCount
};
