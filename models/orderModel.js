const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    completion: {
        type:String     //3 options (Cancled)/(Delivered)/(Order Placed)
    },
    userId: {   //user ordering this product
        type: String,
    },
    products: [{      //array of products with their quantity and net price 
        productId: {
            type: String,
        },
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
const Order = mongoose.models?.order || mongoose.model('order',OrderSchema);
export default Order;