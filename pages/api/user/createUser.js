import connectDB from "../../../utils/connectDB";
import User from '../../../models/userModel';

connectDB();

const createUser = async (req, res) => {
    if (req.method == 'POST') {
      try{
        let newUser = await User.create(req.body);
        if (newUser) {
            console.log(newUser);
            res.status(201).json({
                success:true,
                message: "Succesfull creation of User",
                body: newUser
            });
        } else {
            res.status(400).json({
                success: false,
                message: "User couldn't be created / User already existed",
            })
        }
      }catch(error){
        res.status(400).json({
            success:false,
            message : "Error Occured"
        })
        console.log(error)
      }
    }else{
      res.status(404).json({
        success:false,
        message : "No such end point exist (Yet)"
      })
    }
}
export default createUser;