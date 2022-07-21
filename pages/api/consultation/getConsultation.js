import connectDB from "../../../utils/connectDB";
import Consultation from '../../../models/consultationModel';

connectDB();

const getConsultationList = async (req, res)=>{
    
    if(req.method == 'GET'){
        try{
            
            let f_Consultation = await Consultation.find();
            if (f_Consultation) {
                res.status(201).json({
                    success:true,
                    message: "Requested Consultation found",
                    body: f_Consultation
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "error occured in finding Consultation"
                })
            }
        }
        catch(error){
            console.error("error occured in finding Consultation :", error);
            res.status(400).json({
                success: false,
                message: "error occured in finding Consultation"
            })
        }
    }
    else{
        res.status(404).json({
            success:false,
            message : "No such end point exist (Yet)"
        })
    }
}
export default getConsultationList;