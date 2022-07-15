import connectDB from "../../../utils/connectDB";
import { getSession } from "next-auth/react"
import User from '../../../models/userModel';
import Order from '../../../models/orderModel'
import Products from '../../../models/productModel'
connectDB();

const getUsersOrders= async (req, res) => {
    if (req.method == 'GET') {
        const session = await getSession({ req });
        if(session){    //user is logged in
            try{
                let f_user = await User.findOne({email: session.user.email});
                if(f_user){
                    let orderList=[];
                    let userOrders = await Order.find({userId: f_user._id});
                    for(let order of userOrders){
                        let products=[];
                        for(let product of order.products){
                            let newProduct = {
                                id: product.productId,
                                quantity: product.quantity,
                                price: product.price,
                                product: {}, 
                            };
                            newProduct.product = await Products.findById(product.productId);
                            products.push(newProduct);
                        }
                        let newOrder = {
                            id: order._id,
                            completion: order.completion,
                            userId: order.userId,
                            products: products,
                            bill: order.bill,
                            updatedAt: order.updatedAt,
                            createdAt: order.createdAt,
                        };
                        orderList.push(newOrder);
                    }
                    res.status(201).json({
                        success:true,
                        message: "user order history",
                        body: orderList
                    })
                }
                else{
                    res.status(400).json({
                        success: false,
                        message: "user couldn't be found",
                    })
                }
            }
            catch(error){
                console.error("error in finding user: ", error);
                res.status(400).json({
                    success:false,
                    message : "Error Occured"
                })
            }
        }
        else{   //no user logged in
            res.status(403).json({
                success: false,
                message: "There is no logged in user"
            })
        }
    }else{
        res.status(404).json({
            success:false,
            message : "No such end point exist (Yet)"
        })
    }
}
export default getUsersOrders;