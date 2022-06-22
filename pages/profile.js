import { useSession, signIn, signOut } from "next-auth/react"
import { useState ,useEffect} from "react";

const Profile=()=>{
    let foundUser;
  const { data: session , status } = useSession();
//   const [user,setUser] = useState()
  const [name , setName] = useState("");
  const [email,setEmail] = useState("");
  const [avatar,setAvatar] = useState("");
  const [mobno,setMobNo]   = useState("");
  const [address,setAddress]   = useState("");


  const validate = async () => {
    if(session)
    {
        
        const data = await fetch(`${process.env.BASE_URL}api/user/getUserByEmail`, {
            method: "POST",
            body: JSON.stringify({
                email: session.user.email
            })
        }); 
        
        foundUser = await data.json();
          
       

        
        setName(foundUser.body.name);
        setAvatar(foundUser.body.avatar);
        setMobNo(foundUser.body.number);
        setAddress(foundUser.body.address);
        setEmail(foundUser.body.email);  
    }
 
   
}

useEffect(()=>{
    validate();
})

if (session) 
{
 
        return (
           <form action={`${process.env.BASE_URL}api/user/updateUser`} method ="POST">
 
            <div className="w-full bg-cover  bg-[url('/profile_bg.png')]" >
            <div className="container mx-auto p-5 ">
                <div className="md:flex no-wrap md:-mx-2 mt-36 mb-14 justify-center">
                
                    <div className=" flex flex-col justify-center md:h-fit lg:h-[inherit] items-center w-full md:w-3/12 bg-white p-3 rounded-sm shadow-sm md:mx-2">
                        <div className="image overflow-hidden">
                            <img 
                                className="h-auto w-full mx-auto"
                                src={avatar}
                                alt=""
                            />
                        </div>
                        <h1 className="text-gray-900 text-center font-bold text-xl leading-8 my-8">{name}</h1>
                    </div>
            
                    <div className="w-full bg-white p-3 shadow-sm rounded-sm md:w-8/12 text-3xl text-center sm:text-left ">
                        <div className="space-x-2 font-semibold text-gray-900 leading-8 mt-6">
                            <span className=" tracking-wider">About</span>
                        </div>
                        <div className="text-gray-700 mt-6 grid lg:grid-cols-2 text-xl">
                            <div className="mt-2 flex flex-col flex-wrap w-full">
                                <div className="px-4 py-2 font-semibold"> Name</div>
                              <input type="text" value={name} id='name' name="name" onChange={e=>{setName(e.target.value)}}/>
                            </div>
                            <div className="mt-2 flex flex-col flex-wrap w-full">
                                <div className="px-4 py-2 font-semibold">Contact No.</div>
                                <input type="text" value={mobno} id='number' name="number" onChange={e=>{setMobNo(e.target.value)}}/>

                            </div>
                            
                            <div className="mt-2 flex flex-col flex-wrap w-full">
                                <div className="px-4 py-2 font-semibold">Permanant Address</div>
                                <input type="text" value={address} id='address' name="address" onChange={e=>{setAddress(e.target.value)}}/>
                            </div>

                            <div className="mt-2 flex flex-col flex-wrap w-full">
                                <div className="px-4 py-2 font-semibold">Email.</div>
                                <div className="px-8 pt-1 pb-2">
                                <input type="text" value={email} id='email' name="email" onChange={e=>{setName(e.target.value)}}/>
                                </div>
                            </div>

                            <div className="mt-2 flex flex-col flex-wrap w-full">
                                <div className="px-4 py-2 font-semibold">Profile Pic</div>
                                <div className="px-8 pt-1 pb-2">
                                <input type="text" value={avatar} id='avatar' name="avatar" onChange={e=>{setAvatar(e.target.value)}}/>
                                </div>
                            </div>

                                   
           <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
   Save Changes
</button>
                        </div>
                    </div>
                </div>
            </div>
           </div>           
     
           </form>
        )
    
  
}

else 
{
    return (
        <>
            <div className="p-96 bg-green-300">
                Not signed in
                <br />
                <button className=" bg-slate-300 p-6 border-black border-4" onClick={() => signIn()}>Sign in</button>
            </div>
        </>
    )
}

}

export default Profile;

