import connectDB from "../../../utils/connectDB";
import Order from "../../../models/orderModel"
import crypto from 'crypto'
import { getSession } from "next-auth/react"

connectDB();

const verifyPayment = async (req,res)=>{   //check if logined user exist in db..if not make one
    const session = await getSession({ req });
    if (req.method == "POST") {
        if(session){
            try{
                let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
                var expectedSignature = crypto.createHmac('sha256', `${process.env.RAZORPAY_SECRET}`)
                .update(body.toString())
                .digest('hex');
                var response = {"signatureIsValid":"false"}
                if(expectedSignature === req.body.response.razorpay_signature){
                    response={"signatureIsValid":"true"}    //PAYMENT verified
                    console.log("REQUEST DATA :",req.body.NewOrder);
                    const newOrder = await Order.create(req.body.NewOrder);
                    if(newOrder){
                        console.log('NEW ORDER CREATED', newOrder);
                        res.status(201).json({
                            success:true,
                            message: "Succesful creation of new order",
                            body: newOrder
                        });
                    }
                }
            }
            catch(error){
                res.status(400).json({
                    success:false,
                    message : "Error Occured in Veifying Payment"
                })
                console.error("error occured :", error);
            }
        }
        else{
            res.status(400).json({
                success:false,
                message : "User not signed in"
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

export default verifyPayment;