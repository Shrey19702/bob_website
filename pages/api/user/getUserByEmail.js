import connectDB from "../../../utils/connectDB";
import User from '../../../models/userModel';

connectDB();

const getUserByEmail = async (req, res) => {
    if (req.method == 'POST') {
      try{
         const data = await JSON.parse(req.body);
        let f_user = await User.findOne({email:data.email});
        if (f_user) {
            // console.log(newUser);
            res.status(201).json({
                success:true,
                message: "Found requested User",
                body: f_user
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Requested user not found",
            })
        }
      }catch(error){
        res.status(400).json({
            success:false,
            message : "Error Occured"
        })
        console.error("Error in finding a user: ",error)
      }
    }
    else{
        res.status(404).json({
            success:false,
            message : "No such end point exist (Yet)"
        })
    }
}
export default getUserByEmail;