import React, { useEffect, useState } from "react";
import Image from "next/image"

const Blogs=()=>{
  const [blogs,setBlogs] = useState(null);

   const getBlog = async()=>{
           const data = await fetch(`${process.env.BASE_URL}api/blogs/getBlog`);
           const info = await data.json();
           setBlogs(info.body);
           console.log(info.body);
   }
   useEffect(()=>{
    if(!blogs)
    getBlog();
   })
  return(
    <div className="pt-16 bg-[url('/blog_bg.jpeg')] bg-cover">
      <h1 className="mt-16 mb-10 text-center text-4xl font-medium text-white">Blogs</h1>
      <div className=" mx-10 p-10 flex flex-col items-center">
        {blogs && blogs.map((blog, index)=>(
          <>
            <div key={index}  className=" md:p-4 max-w-[300px] md:max-w-[100%] bg-white">

              <div className="md:flex md:flex-row flex-wrap justify-around items-center ">
                
                <div className=" hidden md:block w-[50%] my-6">
                  <h1 className=" text-2xl font-medium">{blog.title}</h1>
                  <h1 className=" ml-4 text-lg font-normal">-{blog.author}</h1>
                  <p className="py-4">
                    {blog.content}
                  </p>
                </div>

                <div className=" relative md:h-[360px] md:w-[270px]">
                  <Image
                    src={blog.blogPic}
                    alt="blog image"                
                    className=" object-center object-cover md:object-contain"
                    height={600}
                    width={450}
                    priority
                  />
                </div>

                <div className=" md:hidden w-full p-3">
                  <h1 className=" text-2xl font-medium">{blog.title}</h1>
                  <h1 className=" ml-4 text-lg font-normal">-{blog.author}</h1>
                  <p className="py-4 sm:text-base text-sm font-light">
                    {blog.content}
                  </p>
                </div>

              </div>

            </div>
          </>
        ))}
      </div>
    </div>
    
  )
};
export default Blogs;
