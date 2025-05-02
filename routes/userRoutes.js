const express = require('express');
const { getUser, updateUser, getAllUsers, getUserById, updateUserById, deleteUserById } = require('../controllers/userController');
const { verifyToken, allowRoles } = require('../middlewares/auth');

const userRouter = express.Router();

userRouter.get('/profile', verifyToken, getUser);
userRouter.put('/profile', verifyToken, updateUser);

// admin routes
userRouter.get('/', verifyToken, allowRoles(['admin']), getAllUsers);
userRouter.get('/:id', verifyToken, allowRoles(['admin']), getUserById);
userRouter.put('/:id', verifyToken, allowRoles(['admin']), updateUserById);
userRouter.delete('/:id', verifyToken, allowRoles(['admin']), deleteUserById);

module.exports = userRouter;