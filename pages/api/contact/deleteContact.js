import connectDB from "./../../../utils/connectDB"
// import Contact from "../../../models/ContactModel";
import contact from "./../../../models/contactModel";

connectDB();

const delete_Contact = async (req,res)=>{
    const data = JSON.parse(req.body);
    console.log(data.name);
    if(req.method == "DELETE"){
        try{
            let del_Contact = await contact.findOneAndDelete({name: data.name});
            if(del_Contact){
                res.status(200).json({
                    success:true,
                    message : "Contact has been deleted",
                    body: del_Contact
                })
            }
            else{
                res.status(400).json({
                    success:false,
                    message : "Couldn't delete the Contact"
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
export default delete_Contact;