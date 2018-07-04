const articleRouter = require('express').Router();
const {getAllArticles} = require('../controllers/articleController')

articleRouter.get("/", (req, res, next) => {
  getAllArticles(req, res);
});

module.exports = articleRouter;