const userRouter = require('express').Router();
const {getAllUsers, getUserByID} = require('../controllers/userController');

userRouter.get("/", getAllUsers)
userRouter.get("/:user_id", getUserByID);

module.exports = userRouter;