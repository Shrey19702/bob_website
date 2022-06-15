import mongoose, { mongo } from "mongoose";

const cartSchema = new mongoose.Schema({
    userId:{    //user ordering this product
      type:String,
    },
    products: [{    //array of products with their quantity and net price 
        productId: String,
        name: String,
        quantity:{
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.'],
            default: 1
        },
        price: Number
    }],
    bill: {     //total cost of all the products to buy
        type: Number,
        required: true,
        default: 0
    }
});

let Cart = mongoose.model.cart || mongoose.model('cart',cartSchema);
export default Cart;