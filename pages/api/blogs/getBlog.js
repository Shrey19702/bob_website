import connectDB from "../../../utils/connectDB";
import Blog from "../../../models/blogModel";

connectDB();

const getBlog = async (req, res) => {
  if (req.method == "GET") {

    try {
      let newBlog = await Blog.find();

      if (newBlog) {
        res.status(201).json({
          success: true,
          message: "Succesful creation of Blog",
          body: newBlog,
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
export default getBlog