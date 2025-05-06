
import jwt from "jsonwebtoken";
import {User } from "../models/user.js"; 
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      message: "Access denied. No token provided", 
      success: false 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ 
        message: "User not found", 
        success: false 
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(400).json({ 
      message: "Invalid token", 
      success: false 
    });
  }
};

export default authMiddleware;