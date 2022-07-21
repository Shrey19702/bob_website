import connectDB from "../../../utils/connectDB";
import Consultation from "../../../models/consultationModel";

connectDB();

const delete_Consultation = async (req,res)=>{
    const data = JSON.parse(req.body);
    const id = data._id;
    if(req.method == "DELETE"){
        try{
            let del_Consultation = await Consultation.findByIdAndDelete({_id:id});
            if(del_Consultation){
                res.status(200).json({
                    success:true,
                    message : "Consultation has been deleted",
                    body: del_Consultation
                })
            }
            else{
                res.status(400).json({
                    success:false,
                    message : "Couldn't delete the Consultation"
                })
                console.error("error occured :", error);
            }
        }catch(error){
            res.status(400).json({
                success:false,
                message : "Error Occured"
            })
            console.error("error occured :", error);
        }
    }
    else{
        res.status(404).json({
            success:false,
            message : "No such end point exist (Yet)"
        })
    }
}
export default delete_Consultation;