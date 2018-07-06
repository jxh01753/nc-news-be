const commentRouter = require('express').Router();
const {getAllComments, deleteCommentByID} = require('../controllers/commentController');

commentRouter.get("/", (req, res, next) => {
  getAllComments(req, res);
});

commentRouter.delete("/:comment_id", deleteCommentByID)

module.exports = commentRouter;