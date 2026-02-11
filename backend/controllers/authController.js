import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "../models/userModel";

export const registerUser = async(req,res)=>{
    try{
        const {name,email,password}= req.body;
        const existingUser= await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(name, email, hashedPassword);
        res.status(201).json(newUser);
    }
    catch(error){
        res.status(500).json({ message: "Server error" });
    }
}
export const loginUser = async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await findUserByEmail(email);
        
        if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }



        const token = jwt.sign({ userId: user.id },  process.env.JWT_SECRET, { expiresIn: "1d" } );
            res.json({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
    }
    catch(error){
        res.status(500).json({ message: "Server error" });

    }
}