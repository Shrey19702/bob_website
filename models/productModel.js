const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { //name of product
        type: String,
        required: true
    },
    price:{ //set price of the product
        type: Number,
        required: true
    },
    discount: new mongoose.Schema({ //if there is a discount and discounted new selling price
        applicable:{ //if a discount exist
            type: Boolean,
            required: true
        },
        newAmount:{ //new discounted selling  price
            type:Number,
            default:0,
        }
    }),
    href:{
        type:String,
        required:true,
    },
    colors:[
        {
            color:String,
            images:Array
        }
    ],
    sizes: [
        {
            size:String,
            inStock:Boolean
        }
    ],
    description: {  //lines describing the product
        type: String,
        required: true
    },
    highlights:{
        type:Array
    },
    details:{
        type:String
    },
    collections:{    //the collection it belongs to (fashion, funrniture..)
        type: String,
        required: true
    },
    category:{  //the category it belongs to (footwear, ..)
        type: String,
        required: true
    },
    trending:{
        type: Boolean,
        default: false
    },
    stock:{ //current quantity of the product 
        type:Number,
        default:0
    },
},
{
    timestamps:true
}
);
const Product = mongoose.models?.product || mongoose.model('product',ProductSchema);
export default Product;