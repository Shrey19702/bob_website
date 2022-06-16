import connectDB from "../../../utils/connectDB";
import Collections from "../../../models/collectionsModel"

connectDB();

const getOneCollection = async (req,res)=>{
    if(req.method == 'GET'){
        try{
            let option ={};
            if(req.body.name)
                option.name = req.body.name;
            if(req.body.id)
                option.id = req.body.id;

            let f_collection = await Collections.find(option);
            if(f_collection){
                res.status(200).json({
                    success:true,
                    message : "requested collection retrived",
                    body: f_collection
                })
            }
            else{
                res.status(400).json({
                    success:false,
                    message : "Couldn't fetch the Collection"
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
export default getOneCollection;