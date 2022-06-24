import { useEffect, useState } from 'react';
import { useSession} from "next-auth/react"
import PostBlog from '../components/admin_pages/PostBlog'

import ProductControl from '../components/admin_pages/ProductControl';
import UserInfo from '../components/admin_pages/UserInfo';
import OrderInfo from '../components/admin_pages/OrderInfo';
import DeleteBlog from '../components/admin_pages/DeleteBlog';

const admin = () => {

    const { data: session, status } = useSession();
    let [auth,setAuth] = useState(false)
    let [check,setCheck] = useState(1);
    let foundUser;

    const validate = async () => {
        if(session)
        {
            // console.log(session.user);
            const data = await fetch(`${process.env.BASE_URL}api/user/getUserByEmail`, {
                method: "POST",
                body: JSON.stringify({
                    email: session.user.email
                })
            }); 
            foundUser = await data.json();
            // console.log(foundUser);
    
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
                    <div className="w-60 h-auto py-20 shadow-inner bg-white px-1 ">
                        <ul className="relative">
                            <li className="relative border-b">
                                <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" onClick={()=>setCheck(1)}>USERS</a>
                            </li>
                            <li className="relative border-b">
                                <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" onClick={()=>setCheck(2)}>PRODUCT</a>
                            </li>
                            <li className="relative border-b">
                                <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!"onClick={()=>setCheck(3)} >ORDER</a>
                            </li>
                            <li className="relative border-b">
                                <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" onClick={()=>setCheck(4)}>CREATE BLOG</a>
                            </li>
                            <li className="relative border-b">
                                <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" onClick={()=>setCheck(5)}>DELETE BLOG</a>
                            </li>
                        </ul>
                    </div>

                <div className='flex  justify-center item-center w-full py-20 px-5'>                          
                    {/* <PostBlog/>
                    <ProductControl/> */}
                 {
                    (check == 4?<PostBlog/>:check == 2?<ProductControl/>:check == 1?<UserInfo/>:check == 3?<OrderInfo/>:check==5?<DeleteBlog/>:<ProductControl/>)
                 }

                </div>
              </div>
            )
        }
        else { //user doesn't has a admin role
            return (
                <div className='w-fit m-auto py-[40vh] text-2xl' >
                    ACCESS DENIED :( 
                </div>
            )
        } 
    }
    else {  //NO loged in user
        return (
            <>
                <div className='w-fit m-auto py-[40vh] text-2xl' >
                    NO SIGNED IN USER
                </div>
            </>
        )
    }
}

export default admin;