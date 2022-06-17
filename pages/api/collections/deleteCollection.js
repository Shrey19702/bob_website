import connectDB from "../../../utils/connectDB";
import Collections from "../../../models/collectionsModel"

connectDB();

const deleteCollection = async (req,res)=>{
    if(req.method == 'DELETE'){
        try{
            let del_collection = await Collections.findOneAndDelete({name: req.body.name});
            if(del_collection){
                res.status(200).json({
                    success:true,
                    message : "Collection has been deleted",
                    body: del_collection
                })
            }
            else{
                res.status(400).json({
                    success:false,
                    message : "Couldn't delete the collection"
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
export default deleteCollection;