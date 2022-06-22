import React, { useEffect, useState } from "react";

const Blogs=()=>{
  const [blogs,setBlogs] = useState([]);

   const getBlog = async()=>{
           const data = await fetch(`${process.env.BASE_URL}api/blogs/getBlog`);
           const info = await data.json();
           setBlogs(info.body);
   }
   useEffect(()=>{
    getBlog();
   })
  return(
    <div className="pt-16">
          <h1 className="mt-16 flex justify-center text-4xl">Blogs...</h1>
      {blogs.map((blog, index)=>(
          <main key={index} className="py-6 px-4 sm:p-6 md:py-10 md:px-8">
          <div className="max-w-4xl my-8 mx-auto grid grid-cols-1 lg:max-w-5xl lg:gap-x-20 lg:grid-cols-2 bg-white p-8 shadow-md">
            <div className="relative p-3 col-start-1 row-start-1 flex flex-col rounded-lg bg-gradient-to-t from-black/75 via-black/0 sm:bg-none sm:row-start-2 sm:p-0 lg:row-start-1">
              <h1 className="mt-1 text-lg sm:font-semibold font-normal text-white sm:text-slate-900 md:text-2xl ">
                {blog.title}
              </h1>
              <h1>{blog.author}</h1>
            </div>
            <div className="grid my-auto gap-4 col-start-1 col-end-3 row-start-1 sm:mb-6 sm:grid-cols-4 lg:gap-6 lg:col-start-2 lg:row-end-6 lg:row-span-6 lg:mb-0">
              <img
                src={blog.image}
                alt="blog image"
                className="w-full h-60 object-cover rounded-lg sm:h-52 sm:col-span-2 lg:col-span-full"
                loading="lazy"
              />
            </div>
    
            <p className="mt-4 text-sm leading-6 col-start-1 sm:col-span-2 lg:mt-6 lg:row-start-4 lg:col-span-1 dark:text-slate-400">
              {blog.content}
            </p>
          <h4>{blog.postTime}</h4>

          </div>
        </main>
      ))}
    </div>
    
  )
};
export default Blogs;