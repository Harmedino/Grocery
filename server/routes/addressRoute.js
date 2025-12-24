
import express from 'express'
import { addAddress } from '../controllers/addressController.js'
import authUser from '../middleware/authUser.js'
import { getAddress } from '../controllers/addressController.js'

const addressRouter = express.Router()

addressRouter.post('/add', authUser, addAddress)
addressRouter.get('/get', authUser, getAddress)

export default addressRouter