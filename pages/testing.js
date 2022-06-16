import { useSession, signIn, signOut } from "next-auth/react"
// import Gethref from "./api/auth/Gethref"

export default function Component() {
  const { data: session , status } = useSession()
  if (session) {
    return (
    <>
        <div className=" p-96">
            {/* <p>{process.env.CurrentHost}</p> */}
            <p>{status}</p>
            <div>
                <p>{session.user.email}</p>
                <p>{session.user.image}</p>
                <p>{session.user.name}</p>
            </div>
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
        </div>
        <img src={session.user.image} alt="user_img" />
    </>
    )
  }
  else{
    console.log(process.env.BASE_URL);
  }
  return (
    <>
        {/* <p><Gethref/></p> */}

        <div className="p-96 bg-green-300">
            Not signed in
            <br />
            <button className=" bg-slate-300 p-6 border-black border-4" onClick={() => signIn()}>Sign in</button>
        </div>
        <p>{process.env.BASE_URL}</p>
    </>
  )
}