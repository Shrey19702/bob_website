import { stringify } from 'postcss';

const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
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
const consultations = mongoose.models?.consultations || mongoose.model('consultations',consultationSchema);
export default consultations;