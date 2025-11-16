import jwt from "jsonwebtoken";


const authSeller = async (req, res, next) => {

    const {sellerToken} = req.cookies;

    if(!sellerToken){

    }
}