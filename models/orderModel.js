import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    completion: {
        type:String     //3 options (Canclled)/(Delivered)/(Order Placed)
    },
    userId: {   //user ordering this product
        type: String,
    },
    products: [{      //array of products with their quantity and net price 
        productId: {
            type: String,
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.']
        },
        price: Number
    }],
    bill: {      //total cost of all the products to buy
        type: Number,
        required: true
    },
},
{
    timestamps:true //time when this order was made
}
);

module.exports = Order = mongoose.model('order',OrderSchema);