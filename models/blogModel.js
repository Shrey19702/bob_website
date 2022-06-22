import mongoose from "mongoose"

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
author : { 
      type:String
},
postTime : {
    type: Date,
} ,
})

let Blog = mongoose.models.blog ||mongoose.model('blog', blogSchema)

export default Blog