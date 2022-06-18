import connectDB from "../../../utils/connectDB";
import Product from '../../../models/productModel';

connectDB();

const getProductById = async (req, res)=>{
    if(req.method == 'GET'){
        try{
            let f_Product = await Product.findById(req.body.id);
            if (f_Product) {
                console.log(f_Product);
                res.status(201).json({
                    success:true,
                    message: "Requested product found",
                    body: f_Product
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "error occured in finding product"
                })
            }
        }
        catch(error){
            console.error("error occured in finding product :", error);
            res.status(400).json({
                success: false,
                message: "error occured in finding product"
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
export default getProductById;