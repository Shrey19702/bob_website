import connectDB from "../../../utils/connectDB";
import User from '../../../models/userModel';

connectDB();

const UpdateUser = async (req, res) => {
    if (req.method == 'POST') {
      let body = JSON.parse(req.body)  
      try{
        let option ={};
        if(req.body.email){
            option.email = req.body.email;
        }
        if(req.body.id){
            option.id = req.body.id;
        }
        let f_user = await User.findOneAndUpdate(option, body);
        if (f_user) {   
            res.status(200).json({
                success: true,
                message: "User sucessfully updated"
            })
        } else {
            res.status(400).json({
                success: false,
                message: "user couldn't be found/updated",
            })
        }
      }catch(error){
        res.status(400).json({
            success:false,
            message : "Error Occured"
        })
        console.error("Error in finding/updating a user: ",error)
      }
    }
    else{
        res.status(404).json({
            success:false,
            message : "No such end point exist (Yet)"
        })
    }
}
export default UpdateUser;