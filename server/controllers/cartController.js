import User from "../models/user.js"


export const updateCart = async (req, res)=>{
    try {
        const userId = req.userid
        const {  cartItems} = req.body
        console.log(cartItems, userId)
        await User.findByIdAndUpdate(userId, {cartItems})
        res.json({success:true, message:'Cart updated'})
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})

    }
}