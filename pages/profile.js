const profiles = [
    {
      user_pic:'/favicon.ico',
      name: 'Shrey',
      email: 'shreydev@gmail.com',
      number:'9876543210'
    },
]


const Profile=(profile)=>{
    return(
        <div className="flex justify-center items-center w-[99.4vw] h-[100vh] bg-cover  bg-[url('/profile_bg.png')]">
            <div className=" flex flex-col sm:flex-row">
            <div className="bg-slate-50 h-[17rem] sm:h-[70vh]  flex justify-center items-start w-[14vw] min-w-[15rem]"><img className="h-64 pt-8 shadow-2xl rounded-full" src="/favicon.ico" alt="user_pic" /></div>
            
            <div className="h-[70vh] min-w-[15rem] w-[45vw] bg-slate-50 flex justify-around items-center shadow-xl flex-col">
                <div className="flex items-center flex-col sm:flex-row w-[40vw]"><h2 className="w-[20vw] font-sans font-semibold text-lg ">Name</h2>
                <h2 className="w-[20vw]   font-sans font-semibold text-4xl ">Shrey</h2></div>
                <div className="flex sm:flex-row items-center flex-col justify-around w-[40vw]"><h2 className="w-[20vw] font-sans font-semibold text-lg ">E-Mail</h2>
                <h2 className="w-[20vw] font-sans font-semibold text-2xl ">email@gmail.com</h2></div>
                <div className="flex sm:flex-row items-center flex-col justify-around w-[40vw]"> <h2 className="w-[20vw] font-sans font-semibold text-lg ">Address</h2>
                <h2 className="w-[20vw] font-sans font-semibold text-lg ">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem, doloribus!3</h2></div>
                <div className="flex sm:flex-row items-center flex-col justify-around w-80vw sm:w-[40vw]"><h2 className="w-[20vw] font-sans font-semibold text-lg ">Mobile Number</h2>
                <h2 className="w-[20vw] font-sans font-semibold text-lg ">9876543210</h2></div>
            
            
            </div>
            </div>
            
        </div>
        
    )
}
export default Profile;