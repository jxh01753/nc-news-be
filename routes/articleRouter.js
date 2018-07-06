const articleRouter = require('express').Router();
const {getAllArticles, getArticleByID} = require('../controllers/articleController')
const {getCommentsByArticleID} = require('../controllers/commentController');

articleRouter.get("/", getAllArticles);
articleRouter.get("/:article_id", getArticleByID)
articleRouter.get("/:article_id/comments", getCommentsByArticleID)

module.exports = articleRouter;