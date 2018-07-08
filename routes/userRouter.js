const userRouter = require('express').Router();
const {getAllUsers, getUserByID} = require('../controllers/userController');

userRouter.route("/").get(getAllUsers);
userRouter.route("/:user_id", getUserByID);

module.exports = userRouter;