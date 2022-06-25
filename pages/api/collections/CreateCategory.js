import connectDB from "../../../utils/connectDB";
import Collections from "../../../models/collectionsModel"

connectDB();

const createCollection = async (req, res) => {
    if (req.method == 'POST') {
      try{  //category name, collection name to be given in req.body
        let f_Collection = await Collections.findOne({name: req.body.collection});
        if (f_Collection) {
            console.log(f_Collection);
            f_Collection.categories.push(req.body.category);
            f_Collection = await f_Collection.save();
            res.status(201).json({
                success:true,
                message: "Succesful creation of Category",
                body: f_Collection
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
    else{
      res.status(404).json({
          success:false,
          message : "No such end point exist (Yet)"
      })
    }
}
export default createCollection;