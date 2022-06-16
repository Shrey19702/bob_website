import connectDB from "../../../utils/connectDB";
import User from '../../../models/userModel'
import { getSession } from "next-auth/react"

connectDB()

const verifyUser = async (req,res)=>{   //check if logined user exist in db..if not make one
    const session = await getSession({ req });
    if(session){
        //signed in session.user={name, email, image}
        try{
            let f_user = await User.findOne({email: session.user.email});
            if(f_user){
                //user already exist in database return 200
                res.redirect(307, '/');
            }
            else{
                //user not there in database make one
                try{
                    let new_user = await User.create(
                        {
                            name: session.user.name,
                            email: session.user.email,
                            avatar: session.user.image
                        }
                    );
                    if(new_user){
                        //new user created return 201
                        res.redirect(201, '/');
                    }
                    else{
                        //couldn't make one return 400
                        res.redirect(400, '/');
                    }
                }
                catch(error){
                    console.error('error in creating user: ',error);
                }
            }
        }
        catch(error){
            console.error('error in finding user: ', error);
        }
        
    }
    else{
        //not signed in return 400
        res.redirect(400, '/');

    }
}

export default verifyUser