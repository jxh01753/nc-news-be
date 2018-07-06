const {Comment} = require('../models/index');

const getAllComments = (req, res, next) => {
  Comment.find()
  .populate({path: 'belongs_to', select: '_id'})
  .populate({path: 'created_by', select: 'username -_id'})
  .lean()
  .then(comments => {
    res.status(200).send({comments});
  }).catch(console.log);
}

const getCommentsByArticleID = (req, res, next) => {
  Comment.find({belongs_to: req.params.article_id})
  .populate({path: 'created_by', select: 'username'})
  .lean()
  .then(comments => {
    comments.length === 0
    ? next({status: 404, message: `Comments not found for article ${req.params.article_id}. That article probably doesn't exist.`})
    : res.status(200).send({comments})
  }).catch(next);
}

const postNewCommentByArticleID = (req, res, next) => {
  const newComment = new Comment({...req.body, belongs_to: req.params.article_id})
  newComment.save()
  .then(result => {
    res.status(201).send({result, message: `Comment posted!`})
  })
}

const deleteCommentByID = (req, res, next) => {
  Comment.findByIdAndRemove(req.params.comment_id)
  .then(comment => {
    res.status(200).send({message: 'Comment has been deleted.'});
  }).then(next)
};

module.exports = {getAllComments, getCommentsByArticleID, postNewCommentByArticleID, deleteCommentByID};



