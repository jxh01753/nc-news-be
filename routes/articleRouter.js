const articleRouter = require('express').Router();
const {getAllArticles} = require('../controllers/articleController')

articleRouter.get("/", getAllArticles);

module.exports = articleRouter;