import connectDB from "../../../utils/connectDB";
import Product from '../../../models/productModel';

connectDB();

const getProductByCategory = async (req, res)=>{
    if(req.method == 'GET'){
        try{
            // let body = JSON.parse(req.body)
            let query = req.query.category.split('-').join(' ');
            // console.log(query);
            let f_Products = await Product.find({category: query});
            if (f_Products) {
                // console.log(f_Products);
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