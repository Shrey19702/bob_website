import mongoose from "mongoose"


const wishListSchema = new mongoose.Schema({
 wishedProducts:{
    type:Array
 }
})

let WishList = mongoose.models.wishList ||mongoose.model('wishList', wishListSchema)

export default WishList