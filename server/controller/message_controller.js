import Message from "../model/message.js";

export const sendMessage = async(req,res)=>{
    try {

        console.log({ message: req.body });

        const messageData = req.body;
    
        const message = new Message(messageData);
    
        await message.save();
    
        return res.status(200).json({ msg: "Message Saved" });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Internal Server Error"})
    }
}

export const getMessage = async(req,res)=>{
    try {

        const { sender, receiver} = req.params;

        const message = await Message.find({
            $or:[
                {sender, receiver},
                {sender: receiver, receiver: sender}
            ],
        }).sort({ timestamp: 1 });

        console.log({messageget : message})

        res.status(200).json(message);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Internal Server Error"})
    }
}