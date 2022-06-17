import connectDB from "../../../utils/connectDB";
import User from '../../../models/userModel';

connectDB();

const getUser = async (req, res) => {
    if (req.method == 'GET') {
      try{
        let option ={};
        if(req.body.email){
            option.email = req.body.email;
        }
        if(req.body.id){
            option.id = req.body.id;
        }
        let f_user = await User.find(option);
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
export default getUser;