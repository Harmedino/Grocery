import express from 'express'
import authUser from '../middleware/authUser.js'
import authSeller from '../middleware/authSeller.js'
import { getAllOrders, getUserOrders, placeOrderCod, placeOrderStripe, updateOrderStatus } from '../controllers/orderController.js'

const orderRouter = express.Router()

orderRouter.post('/cod',authUser, placeOrderCod)
orderRouter.get('/user',authUser, getUserOrders)
orderRouter.get('/seller',authSeller, getAllOrders)
orderRouter.post('/stripe',authUser, placeOrderStripe)
orderRouter.post('/status',authSeller, updateOrderStatus)

export default orderRouter