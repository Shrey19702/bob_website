import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique:true
    },

    role:{
        type : String,
        default:'user'
    },

    avatar :{
        type:String,
        default : ''
    }


})

let User = mongoose.models.user ||mongoose.model('user', userSchema)

export default User