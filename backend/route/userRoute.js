import express from 'express'
import { getUser, loginUser, registerUser } from '../controller/userController.js'
import { authMiddleWare } from '../middleWares/auth.js'

export const userRouter = express.Router()
userRouter.post('/login', loginUser)
userRouter.post('/register', registerUser)
userRouter.get('/get:id', authMiddleWare, getUser)