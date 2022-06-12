const Profile=()=>{
    return(
    <>
    <div className="w-full h-[100vh] bg-cover  bg-[url('/profile_bg.png')]" >
        <div className="container mx-auto p-5 ">
            <div className="md:flex no-wrap md:-mx-2 mt-36 mb-14 justify-center">
            
                <div className=" flex flex-col justify-center md:h-fit lg:h-[inherit] items-center w-full md:w-3/12 bg-white p-3 rounded-sm shadow-sm md:mx-2">
                    <div className="image overflow-hidden">
                        <img 
                            className="h-auto w-full mx-auto"
                            src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                            alt=""
                        />
                    </div>
                    <h1 className="text-gray-900 text-center font-bold text-xl leading-8 my-8">Jane Doe</h1>
                </div>
        
                <div className="w-full bg-white p-3 shadow-sm rounded-sm md:w-8/12 text-3xl text-center sm:text-left ">
                    <div className="space-x-2 font-semibold text-gray-900 leading-8 mt-6">
                        <span className=" tracking-wider">About</span>
                    </div>
                    <div className="text-gray-700 mt-6 grid lg:grid-cols-2 text-xl">
                        <div className="mt-2 flex flex-col flex-wrap w-full">
                            <div className="px-4 py-2 font-semibold">First Name</div>
                            <div className="px-8 pt-1 pb-2">Jane</div>
                        </div>
                        <div className="mt-2 flex flex-col flex-wrap w-full">
                            <div className="px-4 py-2 font-semibold">Last Name</div>
                            <div className="px-8 pt-1 pb-2">Doe</div>
                        </div>
                        <div className="mt-2 flex flex-col flex-wrap w-full">
                            <div className="px-4 py-2 font-semibold">Gender</div>
                            <div className="px-8 pt-1 pb-2">Female</div>
                        </div>
                        <div className="mt-2 flex flex-col flex-wrap w-full">
                            <div className="px-4 py-2 font-semibold">Contact No.</div>
                            <div className="px-8 pt-1 pb-2">+11 998001001</div>
                        </div>
                        
                        <div className="mt-2 flex flex-col flex-wrap w-full">
                            <div className="px-4 py-2 font-semibold">Permanant Address</div>
                            <div className="px-8 pt-1 pb-2">Arlington Heights, IL, Illinois</div>
                        </div>
                        <div className="mt-2 flex flex-col flex-wrap w-full">
                            <div className="px-4 py-2 font-semibold">Email.</div>
                            <div className="px-8 pt-1 pb-2">
                                <a className="text-blue-800" href="mailto:jane@example.com">jane@example.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </>
        
    )
}

export default Profile;
