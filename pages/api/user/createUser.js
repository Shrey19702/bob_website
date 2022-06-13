import connectDB from "../../../utils/connectDB";
import User from '../../../models/userModel'

connectDB()
const createUser = async (req, res) => {
    if (req.method == 'POST') {
      try{
        let newUser = await User.create(req.body);
        if (newUser) {
            console.log(newUser);
            res.status(201).json({
                success:true,
                message: "Succesful creation of User",
                body: newUser
            });
        } else {
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
export default createUser