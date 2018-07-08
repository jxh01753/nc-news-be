const commentRouter = require('express').Router();
const {getAllComments, getCommentByID, deleteCommentByID, adjustCommentVoteCount} = require('../controllers/commentController');

commentRouter.get("/", getAllComments);

commentRouter.route("/:comment_id").get(getCommentByID).delete(deleteCommentByID).put(adjustCommentVoteCount);

module.exports = commentRouter;