const userRouter = require('express').Router();
const {getAllUsers, getUserByID} = require('../controllers/userController');

userRouter.route("/").get(getAllUsers);
userRouter.route("/:username").get(getUserByID);

module.exports = userRouter;