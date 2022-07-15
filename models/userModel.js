import mongoose from 'mongoose';
import { stringify } from 'postcss';

const userSchema = new mongoose.Schema({
    name: { //name of user
        type: String,
        required: true
    },
    email: {    //unique email of user
        type: String,
        required: true,
        unique:true,
        lowercase:true
    },
    address:{
        type:String,
        // required:true,
    },
    number:{
        type:String,
        // required:true,
    },
    role:{  //role of user (user or admin)
        type : String,
        default:'user'
    },
    avatar :{   //user's profile image link (optional??) 
        type:String,
        default : ''
    },
    wishlist:[  //array of product Id's of products user wants
        {productId:String}
    ]
},
{
    timestamps:true
}
);

let User = mongoose.models.user ||mongoose.model('user', userSchema);

export default User;