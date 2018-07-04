const commentRouter = require('express').Router();
const {getAllComments} = require('../controllers/commentController');

commentRouter.get("/", (req, res, next) => {
  getAllComments(req, res);
});

module.exports = commentRouter;