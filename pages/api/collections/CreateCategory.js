import connectDB from "../../../utils/connectDB";
import Collections from "../../../models/collectionsModel"

connectDB();

const createCollection = async (req, res) => {
    if (req.method == 'POST') {
      try{
        let f_Collection = await Collections.create(req.body.collection);
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
}
export default createCollection;