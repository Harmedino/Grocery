import jwt from "jsonwebtoken";


const authSeller = async (req, res, next) => {

    const {sellerToken} = req.cookies;

    if(!sellerToken){
        return res.json({success:false, message: "Not autorized"})
        
    }
    try {
        
    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
       if (decoded.email === process.env.SELLER_EMAIl) {
       next();
       } else {
         return res
           .status(401)
           .json({ success: false, message: "Unauthorized: Invalid token" });
       }
       
     } catch (error) {
       console.error("Auth User Error:", error);
       res
         .status(401)
         .json({ success: false, message: "Unauthorized: Invalid token" });
     }
}

export default authSeller;