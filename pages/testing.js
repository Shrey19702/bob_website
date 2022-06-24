// import { useSession, signIn, signOut } from "next-auth/react"
// import Products from '../components/Products' 
// import Products from '../components/Products'
// import Gethref from "./api/auth/Gethref"

import { useEffect, useState } from "react"
// import Test from "../components/Test";


export default function Component() {


  return (
    <div className="p-96">
      <div 
        onClick={()=>{makePayment()}}
        className=" relative top-3/4 h-8 cursor-pointer bg-slate-600 text-white ">
        PAYMENT BUTTON
      </div>
    </div>
  )
}