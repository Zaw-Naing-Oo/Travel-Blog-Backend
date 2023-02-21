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

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, process.env.SECRET, { expiresIn: "1h"});

        return res.status(200).json({ result: oldUser, token });


    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const googleLogin = async (req,res) => {
    const { email, name, sub } = req.body;
    console.log(req.body);

    try {
        const oldUser = await User.findOne({ email });

        // if(oldUser) {
        //     const result = { email, name, _id: oldUser._id.toString()};
        //      const token = jwt.sign({ email: result.email, name: result.name, _id: result._id }, process.env.SECRET, { expiresIn: "1h"});
        //     return res.status(200).json({ result, token })
        // }

        if(oldUser) {
            const result = { email, name, _id: oldUser._id};
            console.log(typeof(_id));
            const token = jwt.sign( { result, sub}, process.env.SECRET, { expiresIn: "1h"})
            return res.status(200).json({ result, token })
        }

        const newUser = await User.create({
            name,
            email,
            googleId: sub,
        });
        // const token = jwt.sign(
        //     { email: newUser.email, name: newUser.name, _id: newUser._id,  },
        //     process.env.SECRET,
        //     { expiresIn: "1h" }
        //   );
        const token = jwt.sign(
            { email: newUser.email, name: newUser.name, _id: newUser._id, sub: newUser?.googleId  },
            process.env.SECRET,
            { expiresIn: "1h" }
          );
        return res.status(200).json({ result: newUser, token });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
// const token = jwt.sign({ email: result.email, name: result.name, _id: result._id }, process.env.SECRET, { expiresIn: "1h"});
