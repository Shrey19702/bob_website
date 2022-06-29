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
             //store data of all orders
            let orderList = [];
            for(let i=0; i<allOrders.length; i++){

                let x = {}; //store data of the order (user, product)
                x.id = allOrders[i].id;
                x.completion = allOrders[i].completion;
                x.bill = allOrders[i].bill;
                x.user = await Users.findById(allOrders[i].userId);
                
                let products=[];
                for(let j=0; j<allOrders[i].products.length; j++){
                    let product_details = {};
                    product_details.id = allOrders[i].products[j].productId;
                    product_details.quantity = allOrders[i].products[j].quantity;
                    product_details.price = allOrders[i].products[j].price;
                    product_details.current_product = await Products.findById(allOrders[i].products[j].productId);
                    // console.log("~~~~~~~~~~~~~Hello", product_details);
                    products.push(product_details);
                }
                x.products = products;
                orderList.push(x);
            }
            // console.log("orders are: ",orderList);
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