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

module.exports = {getAllComments, getCommentsByArticleID};

// lean just returns js object? Not mongoose object?


