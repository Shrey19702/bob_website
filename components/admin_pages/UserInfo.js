import react from "react";
import { useEffect, useState } from "react";



const UserInfo = ()=>{
   
   

    const allUser = async()=>{
        const info = await fetch(`${process.env.BASE_URL}api/user/getUser`);
        const data = await info.json();
         
    }

     useEffect(()=>{
             allUser();
     },[])

    return(
       <>
       </>
    )
}

export default UserInfo