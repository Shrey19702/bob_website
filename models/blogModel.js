import mongoose from "mongoose"
import { Stringify } from "postcss"

const blogSchema = new mongoose.Schema({
title : {
    type: String,
    required:true
},
content:{
    type: String,
    required: true,

},
blogPic:{
    type: String,
    required: true,
},
postTime : {
    type: Date,
} ,
nLikes : {
    type: Number,
},
author : { 
      UserId : String,
      ProfilePic : String, 
      Name : String
}
})

let Blog = mongoose.models.blog ||mongoose.model('blog', blogSchema)

export default Blog