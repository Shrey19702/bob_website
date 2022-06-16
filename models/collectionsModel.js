const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    name: { //Collection name
        type: String,
        required: true
    },
    categories: [    //categories in collection
        {
            type:String
        }
    ]
},
);
const Collections = mongoose.models.collections || mongoose.model('collections',collectionSchema);
export default Collections;