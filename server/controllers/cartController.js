import User from "../models/user.js"


export const updateCart = async (req, res)=>{
    try {
        const {userId,  cartItems} = req.body
        await User.findByIdAndUpdate(userId, {cartItems})
        res.json({success:true, message:'Cart updated'})
    } catch (error) {
        console.lof(error.message)
        res.json({success:false, message:error.mrssage})

    }
}