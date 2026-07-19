import User from '../models/user.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export async function createUser(req,res) {

    try {

        const Password = req.body.Password;
        const Passwordhash = bcrypt.hashSync(Password,10);

        const user = new User(
            {
                email : req.body.email,
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                Password : Passwordhash

            }
        );

        await user.save();

        res.json({Message: "User Created Successfully"});

    }catch (error) {
        console.error("Errort Creating User", error);
        return res.json({Message:"Internal Server Error"});
    }
}

export async function loginUser(req,res){
    try{
        const email = req.body.email;
        const Password = req.body.Password;

        const user = await User.findOne({email: email});

        if(user == null){
            res.status(404).json({Message: "User not found"});
            return;
        }
        const isPasswordMatching = bcrypt.compareSync(Password, user.Password);

        if(isPasswordMatching){

            const userInfo = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                isAdmin: user.isAdmin,
                image: user.image,
                emailVerified: user.isEmailVerified,
                isBlocked: user.isBlocked
            }

            const token = jwt.sign(userInfo, process.env.JWT_SECRET);

            res.json({token : token , isAdmin : user.isAdmin});

        } else {
            res.status(401).json({Message:"Invalid Password"});
        }

    }catch (error) {
        console.error("Error  loging in User", error);
        return res.status(500).json({Message: "Internal Server error"});
    }
}


export function isAdmin(req){
    if(req.user == null){
        return false
    }

    if(!req.user.isAdmin){
        return false
    }
    return true
}