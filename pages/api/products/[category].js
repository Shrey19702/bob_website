import connectDB from "../../../utils/connectDB";
import Product from '../../../models/productModel';

connectDB();

const getProductByCategory = async (req, res)=>{
    if(req.method == 'GET'){
        try{
            let f_Products;
            if(req.query.category=='Products'){ //send all the products
                f_Products = await Product.find({});
            }
            else{   //send by category 
                let query = req.query.category.split('-').join(' ');
                f_Products = await Product.find({category: query});
            }
            if (f_Products) {
                res.status(201).json({
                    success:true,
                    message: "Requested products found",
                    body: f_Products
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "error occured in finding products"
                })
            }
        }
        catch(error){
            console.error("error occured in finding products :", error);
            res.status(400).json({
                success: false,
                message: "error occured in finding products"
            })
        }
    }
    else{
        res.status(404).json({
            success:false,
            message : "No such end point exist (Yet)"
        })
    }
}
export default getProductByCategory;