// Import necessary modules and dependencies
import User from "../models/user.js";         // Mongoose User model
import bcrypt from "bcryptjs";                // Library for password hashing
import jwt from "jsonwebtoken";               // Library for creating JSON Web Tokens (JWT)

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
export const Register = async (req, res) => {
  try {
    // Destructure values from the request body
    const { name, email, password } = req.body;

    // 1️⃣ Validate input fields
    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    // 2️⃣ Check if a user already exists with the same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    // 3️⃣ Hash the password before saving (10 = salt rounds)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create a new user document using the Mongoose model
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // 5️⃣ Save the new user to the database
    await newUser.save();

    // 6️⃣ Create a JWT token for authentication
    const token = jwt.sign(
      { id: newUser._id },          // payload
      process.env.JWT_SECRET,       // secret key from .env
      { expiresIn: "7d" }           // token expires in 7 days
    );

    // 7️⃣ Store the JWT token inside a secure HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,                                    // prevents client-side JS access
      secure: process.env.NODE_ENV === "production",      // only use HTTPS in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // handle cross-site cookie policy
      maxAge: 7 * 24 * 60 * 60 * 1000,                   // 7 days in milliseconds
    });

    // 8️⃣ Return a success response (no password or token in body)
    return res.json({
      success: true,
      user: {
        email: newUser.email,
        name: newUser.name,
        cartItems: newUser.cartItems, 
      },
    });
  } catch (error) {
    // 9️⃣ Handle any unexpected server errors
    console.error("Register Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// Login user 

export const Login = async (req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password){
            return res.json({success:false, message: 'Email and password required'})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.json({success:false, message:"Invalid email or password"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success:false, message:"Invalid email or password"})
        }
         // 6️⃣ Create a JWT token for authentication
    const token = jwt.sign(
      { id: user._id },          // payload
      process.env.JWT_SECRET,       // secret key from .env
      { expiresIn: "7d" }           // token expires in 7 days
    );

    // 7️⃣ Store the JWT token inside a secure HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,                                    // prevents client-side JS access
      secure: process.env.NODE_ENV === "production",      // only use HTTPS in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // handle cross-site cookie policy
      maxAge: 7 * 24 * 60 * 60 * 1000,                   // 7 days in milliseconds
    });
     return res.json({
      success: true,
      user: {
        email: user.email,
        name: user.name,
        cartItems: user.cartItems, 
      },
    });

    } catch (error) {
        console.error("Register Error:", error);
    res.json({ success: false, message: error.message });
    }
}

// check auth
export const isAuth = async (req, res) => {
  try {
    const userId = req.userId; // comes from middleware

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// log out user

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", 
    {  httpOnly:true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"}
    )
      return res.json({success:true, message:"Logged out successfully"})

  } catch (error) {
     return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

