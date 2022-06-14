import connectDB from "../../../utils/connectDB";
import Cart from "../../../models/cartModel";

connectDB();

const createCart = async (req, res) => {
  if (req.method == "POST") {
    try {
      let newCart = await Cart.create(req.body);
      if (newCart) {
        res.status(201).json({
          success: true,
          message: "Succesful creation of Cart",
          body: newCart,
        });
      } else {
        res.status(400).json({
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Error Occured",
      });
    }
  }
};
export default createCart