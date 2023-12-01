import mongoose from "mongoose";



const connection = async(USERNAME, PASSWORD)=>{
    const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@vraqblog.helb17w.mongodb.net/?retryWrites=true&w=majority`;
    try {
       await mongoose.connect(URL)
       console.log("Database connected successfully")
    } catch (error) {
        console.log("Error while connecting with the database", error)
    }
}


export default connection;