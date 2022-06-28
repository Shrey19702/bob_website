import connectDB from "../../../utils/connectDB";
import Orders from "../../../models/orderModel";
import Users from "../../../models/userModel";
import Products from "../../../models/productModel";
connectDB();

const getAllOrders = async (req, res) => {
    if (req.method == 'GET') {
      try{
        let allOrders = await Orders.find({});
        if (allOrders) {
            // console.log("Current order list :",newOrder);
            var orderList = []; //store data of all orders
            // console.log("all orders: ",allOrders);
            allOrders.map(async(order)=>{
                var x = {}; //store data of the order (user, product)
                x.id = order._id;
                x.completion = order.completion;
                x.user = await Users.findById(order.userId);
                x.bill = order.bill;
                
                var products=[{},{}];
                // console.log("order products :",order.products);
                var product_details = {};
                order.products.map(async(product, idx)=>{
                    product_details.id = product.productId;
                    product_details.quantity = product.quantity;
                    product_details.price = product.price;
                    product_details.current_product = await Products.findById(product.productId);
                    
                    products.push(product_details);
                    console.log("Length = ",products.length, products);
                })
                console.log("products ",products, products.length);
                orderList.push(x);
            })
            console.log(orderList);
            res.status(200).json({
                success: true,
                message: "sucessfully found all the orders",
                body: orderList, 
            })
        }
        else {
            res.status(400).json({
                success: false
            })
        }
      }catch(error){
        res.status(400).json({
            success:false,
            message : "Error Occured"
        })
        console.log(error)
      }
    }
}
export default getAllOrders;