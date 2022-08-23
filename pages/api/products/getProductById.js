import connectDB from "../../../utils/connectDB";
import Product from '../../../models/productModel';

connectDB();

const getProductById = async (req, res)=>{
    let req_id;
    if(typeof(req.body)==='string'){
        let x = JSON.parse(req.body);
        req_id = x.id;
    }
    else
        req_id=req.body.id;

    // console.log('->>>>',typeof(req.body));
    if(req.method == 'POST'){
        try{

            let f_Product = await Product.findById(req_id);
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
                message: "error occured in finding product",
                error: error
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