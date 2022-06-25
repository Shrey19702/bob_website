import react from "react";
import { useEffect, useState } from "react";
import UpdateUser from "./UpdateUser";



const UserInfo = ()=>{
   const [user,setUser] = useState([]);
   const [flag , setFlag] = useState(true);
   const [check,setCheck] =  useState(1);
   const [email,setEmail] = useState("");
   const [name,setName] = useState("");


    const allUser = async()=>{
        const info = await fetch(`${process.env.BASE_URL}api/user/getUser`);
        const data = await info.json();
        // console.log(data);
        setUser(data.body);
    }
   
    const random = (email,name)=>{
        // setCheck(2);
        console.log(email);
      if(email&&flag) {setCheck(2);setEmail(email); setName(name) } 
      else{
        setCheck(1);
      }
    }
   

     useEffect(()=>{
             allUser();
     })

    return(
        <div className="flex justify-center">
        <ul className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">

         {
            user.map((x,idx)=>(
                <div key={idx} className="flex">
                <li className="px-6 py-2 border-b border-gray-200 w-[50%] rounded-t-lg">{x.name}</li>
                <li className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">{x.role}</li>
                <button type="button" className="my-4 h-3" onClick={(e)=>{random(x.email,x.name); setFlag(!flag)}} >{check!=2?<>✏️</>:<>❌</>}</button> 
                </div>
            ))
         }
        </ul>
        {
                    (check == 2?<UpdateUser name={name} email={email}/>:<></>)
        }      
      </div>
    )
}

export default UserInfo