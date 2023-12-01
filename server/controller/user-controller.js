import user from "../model/user.js";
import User from "../model/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Token from "../model/token.js";
import jwt from "jsonwebtoken";
import {body, validationResult} from 'express-validator'


dotenv.config();

export const signupuser = async (req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }

  try {

    console.log(req.body)
    // const salt= await bcrypt.genSalt(10); // older syntax
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      name: req.body.name,
      username: req.body.username,
      eienyo: req.body.eienyo,
      password: hashedPassword,
      picture: req.body.picture
    };
    const newUser = new User(user);

    console.log(newUser)

    await newUser.save();
    return res.status(200).json({ msg: "SignUp Successful" });
  } catch (error) {
    if (error.name === "ValidationError") {
    }
    console.error(error);
    res.status(500).send("Internal Server error");
  }
};

export const loginuser = async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).json({ msg: "Username doesn't exists" });
  }
  try {
    let match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );

      const newToken = new Token({ token: refreshToken });

      await newToken.save();

      return res
        .status(200)
        .json({
          accessToken: accessToken,
          refreshToken: refreshToken,
          _id: user._id,
          name: user.name,
          username: user.username,
          eienyo: user.eienyo,
          picture: user.picture
        });
    } else {
      res.status(400).json({ msg: "Username or Password Doesn't Match" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server error");
  }
};

export const updateeienyo = async (req, res) => {
  try {
    let eienyo = await User.findById(req.params.id);

    if (!eienyo) {
      res.status(404).json({ msg: "Eienyo not found" });
    }

    await User.findByIdAndUpdate(req.params.id, { $set: req.body });

    return res.status(200).json({ msg: "Eienyo updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server error" });
  }
};

export const updatename = async(req,res)=>{
  try {

    let name = await User.findById(req.params.id)

    if(!name){
      res.status(404).json({ msg: "Eienyo not found" });
    }

    await User.findByIdAndUpdate(req.params.id, {$set: req.body})

    return res.status(200).json({ msg: "Eienyo updated successfully" });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server error" });
  }
}

export const getprofile = async(req,res)=>{
  try {
    let profile = await User.findOne({username: req.params.username})
    if(!profile){
      res.status(404).json({ msg: "profile not found" });
      
    }
    return res.status(200).json(profile);



  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server error" });
  }
}






// for oauth2
// export const addUser = async(req,res)=>{
//   try {
//     let exist = await GoogleUser.findOne({sub: req.body.sub})

//     if(exist){
//       return res.status(200).json({msg: "User already exits"})
//     }

//     const newgoogleUser = new GoogleUser(req.body)
//     await newgoogleUser.save()
//     return res.status(200).json(newgoogleUser);

    
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Internal Server error" });
//   }
// }