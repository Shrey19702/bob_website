// import { useSession, signIn, signOut } from "next-auth/react"
// import Products from '../components/Products' 
// import Products from '../components/Products'
// import Gethref from "./api/auth/Gethref"

import { useEffect, useState } from "react"
// import Test from "../components/Test";


export default function Component() {

  // const { data: session , status } = useSession()
  // if (session) {
  //   return (
  //   <>
  //       <div className=" p-96">
  //           {/* <p>{process.env.CurrentHost}</p> */}
  //           <p>{status}</p>
  //           <div>
  //               <p>{session.user.email}</p>
  //               <p>{session.user.image}</p>
  //               <p>{session.user.name}</p>
  //           </div>
  //           Signed in as {session.user.email} <br />
  //           <button onClick={() => signOut()}>Sign out</button>
  //       </div>
  //       <img src={session.user.image} alt="user_img" />
  //   </>
  //   )
  // }
  // else{
  //   console.log(process.env.BASE_URL);
  // }
  // return (
  //   <>
  //       {/* <p><Gethref/></p> */}

  //       <div className="p-96 bg-green-300">
  //           Not signed in
  //           <br />
  //           <button className=" bg-slate-300 p-6 border-black border-4" onClick={() => signIn()}>Sign in</button>
  //       </div>
  //       <p>{process.env.BASE_URL}</p>
  //   </>
  // )

  // const [test, sethtest] = useState();
  const [data, setdata] = useState([]);
  const [times, settimes] = useState([]);

  const handleChange = (event, func)=>{
    func(event.target.value);
  }
  const updateval = (event, element, key)=>{
    event.preventDefault();
    let x= [...data];
    console.log(x);

    x[element][key] = event.target.value;
    setdata(x);
    console.log(x);
  }
  useEffect(()=>{
    console.log("Data is :", data);
  }, [times])
  return (
    <div>
      <form className="p-20" action="" method="post">
        <input type="text" placeholder="Hello" onChange={(e)=>{handleChange(e, sethello)}} />

        <div>
          {times.map((element)=>{
            return(
             <input className="block w-36 h-6" key={element} onChange={(e)=>{updateval(e, element, 'testkey')}} type="text" />
            )
          })}
        </div>

        <input 
          type="button" 
          className="block p-10 bg-slate-400" 
          onClick={
            ()=>{ 
              let x= [...times];
              x.push(x.length);
              console.log(times);
              settimes(x);
              let y = [...data];
              y.push({});
              setdata(y);
            }
          } 
          value={times.length}
        />

        <input type="submit" value="Submit"/>
      </form>
    </div>
  )
}