import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../Model/user-model.js"

export const signUp = async (req,res) => {
    const { firstName, lastName, email, password} = req.body;
    try {

        const oldUser =  await User.findOne({ email });
        if(oldUser) {
           return res.status(409).json({ message: "User already exist"})
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const result = await User.create({
            name : `${firstName} ${lastName}`,
            email: email,
            password: hashPassword,
        })

        const token = jwt.sign({ email: result.email, id: result._id}, process.env.SECRET, { expiresIn: "1h"})
        return res.status(201).json({ result, token});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const signIn = async (req,res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await User.findOne({ email });
        if(!oldUser) return res.status(404).json({ message: "User does not exit"});

        const isPasswordMatch = await bcrypt.compare(password, oldUser.password);
        if(!isPasswordMatch) return res.status(400).json({ message: "Password does not match"});

        const token = jwt.sign({ email: oldUser.email }, process.env.SECRET, { expiresIn: "1h"});

        return res.status(200).json({ result: oldUser, token });


    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const googleLogin = async (req,res) => {
    const { email, name, jti: token, sub: googleId } = req.body;
    try {
        const oldUser = await User.findOne({ email });

        if(oldUser) {
            const result = { email, name, _id: oldUser._id.toString()};
            return res.status(200).json({ result, token })
        }

        const result = await User.create({
            name,
            email,
            googleId,
        });
        return res.status(200).json({ result, token });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}