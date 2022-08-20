import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from "react";

const Profile = () => {
    const { data: session, status } = useSession();
    const [userData,setUserData] = useState();
    const [o_user, setO_user] = useState();

    const validate = async () => {
        if (session) {
            const response = await fetch(`${process.env.BASE_URL}api/user/getUserByEmail`, {
                method: "POST",
                body: JSON.stringify({
                    email: session.user.email
                })
            });
            let res_data = await response.json();
            setO_user(res_data.body);
            setUserData(res_data.body);
        }
    }

    useEffect(() => {
        if(!userData)
            validate();
    });

    if (status=="authenticated") {
        if(userData){
            return (
                <form 
                    onSubmit={async(e)=>{
                        e.preventDefault();
                        const response = await fetch(`${process.env.BASE_URL}api/user/updateUser`, {
                            method: "POST",
                            body: JSON.stringify({
                                name: userData.name,
                                email: userData.email,
                                number: userData.number,
                                address: userData.address,
                            })
                        });
                        let res_data = await response.json();
                        if(res_data.success){
                            alert("User info updated");
                        }
                    }}
                >
                    <div className="w-full bg-cover  bg-[url('/profile_bg.png')]" >
                        <div className="container mx-auto p-5 ">
                            <div className="md:flex no-wrap md:-mx-2 mt-36 mb-14 justify-center">
                                <div className=" flex flex-col justify-center md:h-fit lg:h-[inherit] items-center w-full md:w-3/12 bg-white p-3 rounded-sm shadow-sm md:mx-2">
                                    <div className="image overflow-hidden">
                                        <img
                                            className="h-auto w-full mx-auto"
                                            src={userData.avatar}
                                            alt={userData.name}
                                        />
                                    </div>
                                    <h1 className="text-gray-900 text-center font-bold text-xl leading-8 my-8">{userData.name}</h1>
                                </div>
                                <div className="w-full bg-white p-3 shadow-sm rounded-sm md:w-8/12 text-3xl md:text-center text-left ">
                                    <div className="space-x-2 text-center font-semibold text-gray-900 leading-8 mt-6">
                                        <span className=" tracking-wider">About</span>
                                    </div>
                                    <div className="text-gray-700 mt-6 flex flex-col text-base ">
                                        <div className="py-2 px-5 w-full flex flex-col md:flex-row justify-start md:items-center">
                                            <label className="form-label w-32  inline-block mb-2 px-4 text-gray-700">Name</label>
                                            <input 
                                                type="text"
                                                disabled={true}
                                                className="form-control w-full md:min-w-[300px] px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-30 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                                required
                                                value={userData.name}
                                                name="name" 
                                                onChange={(e) => {
                                                    let x = {...userData};
                                                    x.name = e.target.value;
                                                    setUserData(x);
                                                }}
                                            />
                                        </div>
                                        <div className="py-2 px-5 w-full flex flex-col md:flex-row justify-start md:items-center">
                                            <label className="form-label w-32 inline-block mb-2 px-4 text-gray-700">Email</label>
                                                <input 
                                                    type="email"
                                                    disabled={true}
                                                    className="form-control w-full md:min-w-[300px] px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-30 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                                    required 
                                                    value={userData.email} 
                                                    name="email" 
                                                    onChange={(e) => { 
                                                        let x = {...userData};
                                                        x.email = e.target.value;
                                                        setUserData(x);
                                                    }} 
                                                />
                                        </div>
                                        <div className="py-2 px-5 w-full flex flex-col md:flex-row justify-start md:items-center">
                                            <label className="form-label w-32 inline-block mb-2 px-4 text-gray-700">Contact</label>
                                            <input 
                                                type="tel"
                                                className="form-control w-full md:min-w-[300px] px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-30 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                                required
                                                placeholder="Phone Number"
                                                value={userData.number}
                                                name="number" 
                                                onChange={(e) => { 
                                                    let x = {...userData};
                                                    x.number = e.target.value;
                                                    setUserData(x);
                                                }} 
                                            />
                                        </div>
                                        <div className="py-2 px-5 w-full flex flex-col md:flex-row justify-start md:items-center">
                                            <label className="form-label w-32 inline-block mb-2 px-4 text-gray-700">Address</label>
                                            <textarea
                                                className="form-control w-full md:min-w-[300px] px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-30 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                                required
                                                placeholder="Address"
                                                value={userData.address} 
                                                name="address"
                                                onChange={(e) => { 
                                                    let x = {...userData};
                                                    x.address = e.target.value;
                                                    setUserData(x);
                                                }} 
                                            ></textarea>
                                        </div>
                                        
                                        <button 
                                            disabled={(o_user.address===userData.address && o_user.number==userData.number)?true:false }
                                            className="bg-sky-400 w-56 disabled:bg-transparent disabled:border-2 disabled:border-sky-600 disabled:text-sky-500 hover:bg-sky-600 text-white font-bold mx-auto my-4 py-2 px-4 rounded" type="submit">
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
        else{
            return (
                <div className=" py-96 text-center font-semibold text-2xl">
                    Loading..
                </div>
            )
        }
    }
    else if(status=="loading"){
        return (
            <div className=" py-96 text-center font-semibold text-2xl">
                Loading..
            </div>
        )
    }
    else{
        return (
            <>
                <div className=" flex-col flex h-[100vh] justify-center items-center">
                    <h1 className=" text-3xl mb-8"> User Not signed in :|</h1>
                    <button className="w-64 flex justify-center items-center text-xl bg-sky-200 p-6 h-4 border-black border-2 hover:bg-blue-300 transition duration-300" onClick={() => signIn()}>Sign in</button>
                </div>
            </>
        )
    }
}

export default Profile;

