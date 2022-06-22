import connectDB from "../../../utils/connectDB";
import Blog from "../../../models/blogModel";

connectDB();

const createBlog = async (req, res) => {
  if (req.method == "POST") {

    try {
      let newBlog = await Blog.create(req.body);

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
export default createBlog