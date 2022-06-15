import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema({
 Products:[    //array of productId's of user wishlist 
   {productId:String}
]
});

let WishList = mongoose.models.wishList || mongoose.model('wishList', wishListSchema);

export default WishList;