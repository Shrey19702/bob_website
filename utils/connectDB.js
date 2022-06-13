const mongoose = require("mongoose");

const connection={};

const connectDB =  async function(){
    if(connection.isConnected){
        console.log('mongodb already connected');
        return;
    }
    try{
        const db = await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        connection.isConnected = db.connections[0].readyState;
        console.log('mongodb connection sucessfull ');    
    }
    catch(error){
        console.log('error in connecting to mongodb :',error);
    }
}

export default connectDB;