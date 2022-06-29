import connectDB from "../../../utils/connectDB";
import Orders from "../../../models/orderModel";

connectDB();

const updateOrderCompletion = async (req, res)=>{
    let body = JSON.parse(req.body);
    if(req.method == 'POST'){
        try{
            let f_order = await Orders.findById(body.id);
            if (f_order) {
                // console.log(f_Product);
                f_order.completion = body.completion;
                f_order = await f_order.save();
                res.status(201).json({
                    success:true,
                    message: "order updated",
                    body: f_order
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "error occured in updating order"
                })
            }
        }
        catch(error){
            console.error("error occured in updating order :", error);
            res.status(400).json({
                success: false,
                message: "error occured in updating order",
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
export default updateOrderCompletion;