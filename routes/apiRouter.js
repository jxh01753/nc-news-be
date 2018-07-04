const apiRouter = require('express').Router();
const {topicRouter, articleRouter, commentRouter} = require('./index')

apiRouter.get("/", (req, res, next) => {
  res.status(200).send("This is the API root folder");
});

apiRouter.use("/topics", topicRouter);
apiRouter.use("/articles", articleRouter);
apiRouter.use("/comments", commentRouter);

module.exports = {apiRouter};