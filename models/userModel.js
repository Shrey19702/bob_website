import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique:true,
        lowercase:true
    },

    role:{
        type : String,
        default:'user'
    },

    avatar :{
        type:String,
        default : ''
    },
},
{
    timestamps:true
}
);

let User = mongoose.models.user ||mongoose.model('user', userSchema);

export default User;