import connectDB from "../../../utils/connectDB";
import Collections from "../../../models/collectionsModel"
import Products from "../../../models/productModel"
import { stringify } from "postcss";

connectDB();

const deleteCategoryFromColllection = async (req,res)=>{
    // console.log('here is delete api log ',typeof(req.body.name))
    if(req.method == "DELETE"){
        try{
            let f_products = await Products.find({category: req.body.category});
            if( f_products && f_products.length==0){
                //remove the category from collection
                let f_collection = await Collections.findOne({name: req.body.collection});
                f_collection.categories=f_collection.categories.filter((e)=>(e!=req.body.category));
                f_collection = await f_collection.save();
                res.status(200).json({
                    success:true,
                    message : "Category has been deleted",
                    body: f_collection
                })
            }
            else{
                res.status(400).json({
                    success:false,
                    message : "Couldn't delete the collection"
                })
                console.error("error occured :", error);
            }
        }catch(error){
            res.status(400).json({
                success:false,
                message : "Error Occured"
            })
            console.error("error occured :", error);
        }
    }
    else{
        res.status(404).json({
            success:false,
            message : "No such end point exist (Yet)"
        })
    }
}
export default deleteCategoryFromColllection;