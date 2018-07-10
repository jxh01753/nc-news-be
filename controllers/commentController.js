const {Comment} = require('../models/index');
const {Article} = require('../models/index');

const getAllComments = (req, res, next) => {
  Comment.find()
  .populate('belongs_to')
  .populate('created_by', 'username -_id')
  .lean()
  .then(comments => {
    res.status(200).send({comments});
  }).catch(next);
};

const getCommentByID = (req, res, next) => {
  Comment.findById(req.params.comment_id)
  .populate('created_by', select: 'username -_id')
  .populate('belongs_to')
  .lean()
  .then(comment => {
    res.status(200).send({comment})
  }).catch(next);
};

const getCommentsByArticleID = (req, res, next) => {
  Comment.find({belongs_to: req.params.article_id})
  .populate('created_by', select: 'username')
  .populate('belongs_to')
  .lean()
  .then(comments => {
    comments.length === 0
    ? next({status: 404, message: `Comments not found for article ${req.params.article_id}. That article probably doesn't exist.`})
    : res.status(200).send({comments})
  }).catch(next);
};

const postNewCommentByArticleID = (req, res, next) => {
  Article.findById(req.params.article_id)
  .lean()
  .then(article => {
    if (article === null) {
      next({status: 404, message: `That article does not exist.`})
    } else {
      const newComment = new Comment({...req.body, belongs_to: req.params.article_id})
      newComment.save()
      .then(result => {
      res.status(201).send({result, message: `Comment posted!`})
      }).catch(next)
    }
  }).catch(next);
};

const deleteCommentByID = (req, res, next) => {
  Comment.findById(req.params.comment_id)
  .then(comment => {
    if (comment === null) {
      next({status: 404, message: `That comment does not exist.`})
    } else {
      Comment.findByIdAndRemove(req.params.comment_id)
      .then(comment => {
      res.status(200).send({message: 'Comment has been deleted.'});
      }).catch(next);
    }
  }).catch(next);
};

const adjustCommentVoteCount = (req, res, next) => {
  if (req.query.vote === "up") {
    Comment.findOneAndUpdate({_id: req.params.comment_id}, {$inc: {votes: 1}})
    .then(result => {
      res.status(200).send('upvoted!')
    }).catch(next);
  } else if (req.query.vote === "down") {
    Comment.findOneAndUpdate({_id: req.params.comment_id}, {$inc: {votes: -1}})
    .then(result => {
      res.status(200).send('downvoted!');
    }).catch(next);
  } else {
    next({status: 400, message: `That is an invalid query`});
  };
};

module.exports = {getAllComments, getCommentByID, getCommentsByArticleID, postNewCommentByArticleID, deleteCommentByID, adjustCommentVoteCount};



