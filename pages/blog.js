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
<<<<<<< HEAD
    <div className="pt-16 bg-[url('/blog_bg.jpeg')] bg-cover">
          <h1 className="mt-16 flex justify-center text-4xl text-white">Blogs</h1>
      {blogs.map((blog, index)=>(
          <main key={index} className="py-6 px-4 sm:p-6 md:py-10 md:px-8 ">
          <div className="max-w-4xl my-8 mx-auto grid grid-cols-1 lg:max-w-5xl lg:gap-x-20 lg:grid-cols-2 bg-white p-8 shadow-md ">
=======
    <div className="pt-16">
          <h1 className="mt-16 flex justify-center text-4xl">Blogs</h1>
      {blogs&&blogs.map((blog, index)=>(
          <main key={index} className="py-6 px-4 sm:p-6 md:py-10 md:px-8">
          <div className="max-w-4xl my-8 mx-auto grid grid-cols-1 lg:max-w-5xl lg:gap-x-20 lg:grid-cols-2 bg-white p-8 shadow-md">
>>>>>>> ca26a712f570ef7ac2811eeccda1a1430d028f9d
            <div className="relative p-3 col-start-1 row-start-1 flex flex-col rounded-lg bg-gradient-to-t from-black/75 via-black/0 sm:bg-none sm:row-start-2 sm:p-0 lg:row-start-1">
              <h1 className="mt-1 text-lg sm:font-semibold font-normal text-white sm:text-slate-900 md:text-xl md:my-4 absolute md:top-2 sm:top-6 top-44">
                {blog.title}
              </h1>
              <h1 className="mb-4">{blog.author}</h1>
            </div>
            <div className="grid my-auto gap-4 col-start-1 col-end-3 row-start-1 sm:mb-6 sm:grid-cols-4 lg:gap-6 lg:col-start-2 lg:row-end-6 lg:row-span-6 lg:mb-0">
           
                <Image
                src={blog.blogPic}
                alt="blog image"                
                className="w-full h-full object-center select-none object-contain"
                height={600}
                width={450}
                priority
              />
            </div>
    
            <p className="mt-4 flex flex-wrap text-sm leading-6 col-start-1 sm:col-span-2 lg:mt-6 lg:row-start-4 lg:col-span-1 dark:text-slate-400">
              {blog.content}
            </p>
          <h4 className="hidden md:visible">{blog.postTime}</h4>

          </div>
        </main>
      ))}
    </div>
    
  )
};
export default Blogs;
