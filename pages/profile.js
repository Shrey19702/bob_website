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
            <div className="bg-slate-50 h-[70vh] flex justify-center items-start w-[14vw]"><img className="h-[28vh] pt-8 shadow-2xl rounded-full" src="/favicon.ico" alt="user_pic" /></div>
            
            <div className="h-[70vh] w-[45vw] bg-slate-50 flex justify-around items-center shadow-xl flex-col">
                <div className=" items-center flex justify-around w-[40vw]"><h2 className="w-[20vw] font-sans font-semibold text-lg ">Name</h2>
                <h2 className="w-[20vw]   font-sans font-semibold text-lg ">Shrey</h2></div>
                <div className=" items-center flex justify-around w-[40vw]"><h2 className="w-[20vw] font-sans font-semibold text-lg ">E-Mail</h2>
                <h2 className="w-[20vw] font-sans font-semibold text-lg ">email@gmail.com</h2></div>
                <div className=" items-center flex justify-around w-[40vw]"> <h2 className="w-[20vw] font-sans font-semibold text-lg ">Address</h2>
                <h2 className="w-[20vw] font-sans font-semibold text-lg ">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem, doloribus!3</h2></div>
                <div className=" items-center flex justify-around w-[40vw]"><h2 className="w-[20vw] font-sans font-semibold text-lg ">Mobile Number</h2>
                <h2 className="w-[20vw] font-sans font-semibold text-lg ">9876543210</h2></div>
            
            
            </div>
        </div>
        
    )
}
export default Profile;