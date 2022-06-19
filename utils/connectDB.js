// import mongoose from "mongoose";
import {connect} from "mongoose";

const connection={};

const connectDB =  async function(){
    if(connection.isConnected){
        console.log('mongodb already connected');
        return;
    }
    try{
        // console.log(process.env.MONGO_URI)
        const db = await connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        connection.isConnected = db.connections[0].readyState;
        console.log('mongodb connection sucessfull ');    
    }
    catch(error){
        console.error('error in connecting to mongodb :',error);
    }
}

export default connectDB;