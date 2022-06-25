import connectDB from "../../../utils/connectDB";
import Cart from '../../../models/CartModel';

connectDB();

const getCart = async (req, res)=>{
    
    if(req.method == 'GET'){
        try{
            let f_Cart = await Cart.find();
            if (f_Cart) {
                res.status(201).json({
                    success:true,
                    message: "Requested Cart found",
                    body: f_Cart
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "error occured in finding Cart"
                })
            }
        }
        catch(error){
            console.error("error occured in finding Cart :", error);
            res.status(400).json({
                success: false,
                message: "error occured in finding Cart"
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
export default getCart;