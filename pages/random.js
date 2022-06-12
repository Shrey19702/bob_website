
const profiles = [
    {
      user_pic:'/favicon.ico',
      name: 'Shrey',
      email: 'shreydev@gmail.com',
      number:'9876543210'
    },
]
function About(){
    return(
        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
    )
}



const Profile=(profile)=>{
    return(
    <>

    <div className="container mx-auto p-5 ">
        <div className="md:flex no-wrap md:-mx-2 mt-36 mb-14">
          
            <div className="w-full md:w-3/12 md:mx-2">
            
                <div className="bg-white p-3 border-t-4 border-green-400 h-96">
                    <div className="image overflow-hidden h-80">
                        <img className="h-auto w-full mx-auto"
                            src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                            alt="" />
                    </div>
                    <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">Jane Doe</h1>
                
                </div>
        
            </div>
       
            <div className="w-full md:w-9/12 text-3xl ">
             
                <div className="h-fit bg-white p-3 shadow-sm rounded-sm">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mt-6">
                        <span clas="text-green-500">
                           {/* <About /> */}
                        </span>
                        <span className="tracking-wide">About</span>
                    </div>
                    <div className="text-gray-700 mt-6">
                        <div className="grid md:grid-cols-2 text-xl">
                            <div className="mt-8 grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">First Name</div>
                                <div className="px-4 py-2">Jane</div>
                            </div>
                            <div className="mt-8 grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Last Name</div>
                                <div className="px-4 py-2">Doe</div>
                            </div>
                            <div className="mt-8 grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Gender</div>
                                <div className="px-4 py-2">Female</div>
                            </div>
                            <div className="mt-8 grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Contact No.</div>
                                <div className="px-4 py-2">+11 998001001</div>
                            </div>
                            
                            <div className="mt-8 grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Permanant Address</div>
                                <div className="px-4 py-2">Arlington Heights, IL, Illinois</div>
                            </div>
                            <div className="mt-8 grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Email.</div>
                                <div className="px-4 py-2">
                                    <a className="text-blue-800" href="mailto:jane@example.com">jane@example.com</a>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                  
                </div>
     

                <div className="my-4"></div>

 
              
           
            </div>
        </div>
    </div>

    </>
        
    )
}



export default Profile;
