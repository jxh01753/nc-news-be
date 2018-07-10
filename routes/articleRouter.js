const articleRouter = require("express").Router();
const {
  getAllArticles,
  getArticleByID,
  adjustArticleVoteCount
} = require("../controllers/articleController");
const {
  getCommentsByArticleID,
  postNewCommentByArticleID
} = require("../controllers/commentController");

articleRouter.route("/").get(getAllArticles);

articleRouter
  .route("/:article_id")
  .get(getArticleByID)
  .put(adjustArticleVoteCount);

articleRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleID)
  .post(postNewCommentByArticleID);

module.exports = articleRouter;
