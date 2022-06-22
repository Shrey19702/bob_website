import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import PostBlog from '../../components/admin_pages/PostBlog'

import ProductControl from '../../components/admin_pages/ProductControl';





const admin = () => {

    const { data: session, status } = useSession();
    let [auth,setAuth] = useState(false)
    let foundUser;
    const validate = async () => {

        if(session)
        {
             console.log(session.user);
            const data = await fetch(`${process.env.BASE_URL}api/user/getUserByEmail`, {
                method: "POST",
                body: JSON.stringify({
                    email: session.user.email
                })
            }); 
            
            foundUser = await data.json();

            
            console.log(foundUser);
    
            (foundUser.body.role === 'admin'?setAuth(true):setAuth(false));
        }
        else{
            setAuth(false);
        }
    }

    useEffect(()=>{
        validate();
    })
    if (session) {
        if (auth) {
            return (
                <div className='flex'>
                <div class="w-60 h-[95vh] py-20 shadow-md bg-white px-1 ">
                    <ul class="relative">
                        <li class="relative">
                            <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark" >USERS</a>
                        </li>
                        <li class="relative">
                            <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark" >PRODUCT</a>
                        </li>
                        <li class="relative">
                            <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark" >ORDER</a>
                        </li>
                        <li class="relative">
                            <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark" >BLOG</a>
                        </li>
                    </ul>
                    
                </div>

                <div className='flex  justify-center item-center w-full py-20 px-5'>                          
                         {/* <PostBlog/> */}
                         <ProductControl/>
                </div>
                
              </div>

            )
        }
        else {

            return (
                <h1 className='h-20 py-20'>
                    NOT ACCESS TO THE ADMIN PAGE :( 
                </h1>
            )
        }
    }

    else {
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

export default admin;