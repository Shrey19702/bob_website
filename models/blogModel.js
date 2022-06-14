import mongoose from "mongoose"
import { stringify } from "postcss"

const blogSchema = new mongoose.Schema({
title : {
    type: string,
    required:true
},
content:{
    type: string,
    required: true,

},
blogPic:{
    type: string,
    required: true,
},
postTime : {
    type: Date,
} ,
nLikes : {
    type: Number,
},
author : { 
      UserId : string,
      ProfilePic : string, 
      Name : string
}
})