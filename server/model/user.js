import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    eienyo: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false,
    },
});


const user = mongoose.model('user', userSchema);

export default user;