import connectDB from "../../../utils/connectDB";
import Collections from "../../../models/collectionsModel"

connectDB();

const getAllCollections = async (req,res)=>{
    if(req.method == 'GET'){
        try{
            let all_collections = await Collections.find({});
            if(all_collections){
                res.status(200).json({
                    success:true,
                    message : "All the collections retrived",
                    body: all_collections
                })
            }
            else{
                res.status(400).json({
                    success:false,
                    message : "Couldn't fetch all Collections"
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
export default getAllCollections;