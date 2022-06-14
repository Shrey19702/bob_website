import mongoose, { mongo } from "mongoose";

const cartSchema = new mongoose.Schema({
    userID:{
      type:String,
    
    },
    
    selectedProductsToBuy:{
        type:Array,
        required:true
    },

    total:{
        type:Number,
        default:0
    }

})

let Cart = mongoose.model.cart || mongoose.model('cart',cartSchema);
export default Cart