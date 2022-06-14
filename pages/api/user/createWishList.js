import connectDB from "../../../utils/connectDB";
import WishList from "../../../models/WishListModel";

connectDB();

const createWishList = async (req, res) => {
  if (req.method == "POST") {
    try {
      let newWishList = await WishList.create(req.body);
      if (newWishList) {
        res.status(201).json({
          success: true,
          message: "Succesful creation of WishList",
          body: newWishList,
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
export default createWishList