import mongoose from "mongoose";

const tokenSChema = new mongoose.Schema({
    token:{
        type: String,
        required: true
    }
})

const token = mongoose.model('token', tokenSChema)
export default token;