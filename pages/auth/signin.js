import { signIn,  getProviders } from 'next-auth/react'
import Image from 'next/image'
// import Header from '../../components/header'
// import styles from '../../styles/Signin.module.css'

const Signin = ({ providers }) => {
  return (
    <div  className=" bg-[url('/gvf.jpeg')] bg-cover bg-slate-200 flex flex-col justify-center items-center min-h-[80vh] w-full">
        <div className=' bg-transparent flex flex-col sm:flex-row items-center py-12'>
            {providers && 
              <>
                <button onClick={() => signIn( Object.values(providers)[1].id)} className=' transition-all w-fit bg-slate-100 hover:bg-slate-200 mx-12 my-4 rounded-md border-2 border-slate-800 shadow-sm hover:shadow-md py-4 px-12' >
                  Sign In with{' '} {Object.values(providers)[1].name}
                </button>
                <button onClick={() => signIn(Object.values(providers)[0].id)} className=' transition-all w-fit bg-slate-100 hover:bg-slate-200 mx-12 my-4 rounded-md border-2 border-slate-800 shadow-sm hover:shadow-md py-4 px-12' >
                  Sign In with{' '} {Object.values(providers)[0].name}
                </button>
              </>
            }
        </div>
    </div>
  )
}

export default Signin

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}