import connectDB from "./../../../utils/connectDB";
import Contact from "./../../../models/contactModel";

connectDB();

const createContact = async (req, res) => {
    if (req.method == 'POST') {
      try{console.log(req.body)
        const body = req.body
        console.log("###body is here :)",body)
        let newContact = await Contact.create(req.body);
        if (newContact) {
            console.log(newContact);
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
export default createContact;