const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { //name of product
        type: String,
        required: true
    },
    description: {  //lines describing the product
        type: String,
        required: true
    },
    collections:{    //the collection it belongs to (fashion, funrniture..)
        type: String,
        required: true
    },
    category:{  //the category it belongs to (footwear, ..)
        type: String,
        required: true
    },
    images:[    //array of image links of the product
        {link:String}
    ],
    stock:{ //current quantity of the product 
        type:Number,
        default:0
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
    options: new mongoose.Schema({  //product specific details
        colors: [
            {
                color:String,   //name of the color
                image:String,   //image of product in this color
            }
        ],
        size: [
            {
                size:String,    //size of the product (dimensions/clothes size) 
            }
        ],
        age: [
            {
                age:String,     //age to differentiate (synomyn of size ) 
            }
        ]
    })
},
{
    timestamps:true
}
);
const Product = mongoose.models.product || mongoose.model('product',ProductSchema);
export default Product;