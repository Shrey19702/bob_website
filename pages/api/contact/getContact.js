import connectDB from "./../../../utils/connectDB";
// import Contact from "./../../../models/ContactModel";
import contact from "./../../../models/contactModel";


connectDB();

const getContactList = async (req, res)=>{
    
    if(req.method == 'GET'){
        try{
            
            let f_Contact = await contact.find();
            if (f_Contact) {
                res.status(201).json({
                    success:true,
                    message: "Requested Contact found",
                    body: f_Contact
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "error occured in finding Contact"
                })
            }
        }
        catch(error){
            console.error("error occured in finding Contact :", error);
            res.status(400).json({
                success: false,
                message: "error occured in finding Contact"
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
export default getContactList;