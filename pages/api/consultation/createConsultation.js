import connectDB from "../../../utils/connectDB";
import Consultation from "../../../models/consultationModel"

connectDB();

const createConsultation = async (req, res) => {
    if (req.method == 'POST') {
      try{console.log(req.body)
        const body = req.body
        console.log("###body is here :)",body)
        let newConsultation = await Consultation.create(req.body);
        if (newConsultation) {
            console.log(newConsultation);
           res.redirect(307, '/')
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
export default createConsultation;