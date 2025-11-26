
import express from 'express'
import { addAddress } from '../controllers/addressController.jss'
import authUser from '../middleware/authUser.js'
import { getAddress } from '../controllers/addressController'

const addressRouter = express.Router()

addressRouter.post('/add', authUser, addAddress)
addressRouter.post('/get', authUser, getAddress)

export default addressRouter