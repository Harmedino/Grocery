import express from 'express';
import { isAuth, Login, logout, Register } from '../controllers/userController.js';
import authUser from '../middleware/authUser.js';


const userRouter = express.Router();

userRouter.post('/register', Register)
userRouter.post('/login', Login);
userRouter.get('/is-auth',authUser, isAuth);
userRouter.get('/logout',authUser, logout);

export default userRouter