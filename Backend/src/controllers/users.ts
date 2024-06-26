import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import userModel from "../models/user";


export const getAuthentcatedUser: RequestHandler = async(req,res,next)=>{
  

    try {
        const user = await userModel.findById(req.session.userId).select("+email").exec();
        res.status(200).json(user);
    } catch (error) {
       next(error); 
    }
}
interface SignUpBody{
    username?:string,
    email?:string,
    password?:string,
}

export const signUp : RequestHandler<unknown,unknown,SignUpBody,unknown>= async(req,res,next)=>{
     const username = req.body.username;
     const email = req.body.email;
     const passwordRaw = req.body.password;

        try {
            if(!username || !email || !passwordRaw){
                throw createHttpError(400, "Parameters missing");
            }

        const existingUserName = await userModel.findOne({username:username}).exec();
        
        if(existingUserName){
            throw createHttpError(409, "Username already taken, please choose another one.");
        }
            const existingEmail = await userModel.findOne({email:email}).exec();
            if(existingEmail){
                throw createHttpError(409,"email already exists");
            }

     const passwordHashed = await bcrypt.hash(passwordRaw,10);

     const newUser = await userModel.create({
        username:username,
        email: email,
        password:passwordHashed,
     });

     req.session.userId = newUser._id;

     res.status(201).json(newUser);
     } catch (error) {
      next(error);  
     }

};

interface loginBody{
    username?:string,
    password?:string,
}

export const login :RequestHandler<unknown,unknown,loginBody,unknown> =async (req,res,next) =>{
   const username = req.body.username;
   const password = req.body.password;


   try {
      if(!username || !password){
        throw createHttpError(400, "Parameters missing");
      }
      const user = await userModel.findOne({username: username}).select("+password +email").exec();

      if(!user){
        throw createHttpError(401,"Invalid credentials");
      }

      const passwordMatch = await bcrypt.compare(password,user.password);
      if(!passwordMatch){
        throw createHttpError(401,"Invalid credentials");
      }

      req.session.userId = user._id;
      res.status(201).json(user);
   } catch (error) {
     next(error);
   }
};

export const logout : RequestHandler = (req,res,next) =>{
   req.session.destroy(error => {
    if(error){
        next(error);
    }else{
        res.sendStatus(200);
    }
   });
}
