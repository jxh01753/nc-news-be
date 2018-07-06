const apiRouter = require('express').Router();
const {topicRouter, articleRouter, commentRouter, userRouter} = require('./index')

apiRouter.get("/", (req, res, next) => {
  res.status(200).send("This is the API root folder");
});

apiRouter.use("/topics", topicRouter);
apiRouter.use("/articles", articleRouter);
apiRouter.use("/comments", commentRouter);
apiRouter.use("/users", userRouter)

module.exports = {apiRouter};