import { stringify } from 'postcss';

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true
   },
   tel:{
    type:Number,
    required:true
   },
   text:{
    type:String,
    required:true
   }
},
);
const contacts = mongoose.models?.contacts || mongoose.model('contacts',contactSchema);
export default contacts;