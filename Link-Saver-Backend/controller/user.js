import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async(req, res) => {
    try{
    const { email, password } = req.body;
    
    if( !email || !password ) {
        return res.status(400).json({ message: "Please fill all fields" , success: false });
    }

    const exitingUser = await User.findOne({ email});
    if(exitingUser){
        return res.status(400).json({ message: "User already exists", success: false });
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ 
        email, 
        password: hashedPassword 
    });
    
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
    });
    return res.status(201).json({
        message:"Account created successfully.",
        success:true,
        token,
        user: {
            id: newUser._id,
            email: newUser.email
        }
    })

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


export const login = async (req, res) => {
  try{
     const { email, password } = req.body;
     const user = await User.findOne({ email});
     if(!user){
        return res.status(400).json({ message: "Invalid credentials", success: false });
     };

     const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({ message: "Invalid credentials", success: false });
        };
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "1h",
        });
        return res.status(200).json({
            message:"Login successful",
            success:true,
            token,
            user: {
                id: user._id,
                email: user.email
            }
        })
    
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    };



