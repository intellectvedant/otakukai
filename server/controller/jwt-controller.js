import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const authenticateToken =(req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (token === null){
        return res.status(401).json({msg: 'Access Denied!'})
    }

    jwt.verify(token,process.env.ACCESS_SECRET_KEY,(error, user)=>{
        if(error){
            return res.status(401).json({msg: 'Invalid Token'})
        }
        res.user = user;
        next();
    })

}

