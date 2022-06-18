import connectDB from "../../../utils/connectDB";
import Product from '../../../models/productModel';

connectDB();

const createProduct = async (req, res)=>{
    if(req.method == 'POST'){
        try{
            let newProduct = await Product.create(req.body);
            if (newProduct) {
                console.log(newProduct);
                res.status(201).json({
                    success:true,
                    message: "Succesful creation of Product",
                    body: newProduct
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "error occured in creating product"
                })
            }
        }
        catch(error){
            console.error("error occured in creating product :", error);
            res.status(400).json({
                success: false,
                message: "error occured in creating product"
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
export default createProduct;