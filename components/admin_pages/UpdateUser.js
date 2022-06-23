import { useEffect, useState } from "react";

const UpdateUser = ({email,name}) =>{
    const [role,setRole] = useState("");

    return(
        <form className='flex flex-col' action={`${process.env.BASE_URL}api/user/updateUser`} method='POST'> 
        <input type="text" value={name} id="name" name="name" />
        <input type="text" value={email} id="email" name="email" />
        <input placeholder="Define role user/admin" type="text" value={role} id="role" name="role" onChange={(e)=>setRole(e.target.value)} />         
       <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' type="submit"> submit</button>
         </form>
    )
}
export default UpdateUser;