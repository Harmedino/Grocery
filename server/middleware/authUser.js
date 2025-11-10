

const authUser = async(req, res, next) => {
    try {
        const {token} = req.cookies ;
        if(!token){
            return res.status(401).json({success:false, message:"Unauthorized: No token provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error("Auth User Error:", error);
        res.status(401).json({success:false, message:"Unauthorized: Invalid token"})
    }