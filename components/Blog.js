import Link from 'next/link'
import { useEffect, useState } from 'react';
import mainImg from '../public/main.jpg';
import connectDB from '../utils/connectDB';
import Image from "next/image";

connectDB();
  
const Blog = ()=>{
  const [BlogData, setBlogData] = useState(null);
  useEffect(()=>{
    if(!BlogData){
      (async ()=>{  //fetch data using api 
        let data = await fetch(`${process.env.BASE_URL}api/blogs/getBlog`)
        let f_blogs = await data.json();
        setBlogData(f_blogs.body[0]);
      })();
    }
    return ()=>{};
  });
  if(BlogData){
    return(
      <section className=" pt-20 px-8 bg-white">
          <div className="container justify-center mx-auto flex flex-wrap ">
            {/* blog image */}
            <div className="w-full flex justify-center items-center px-4 mb-14 lg:mb-0 lg:w-1/3 ">
              <div className=" relative md:h-[600px] md:w-[450px]">
                <Image
                  src={BlogData.blogPic}
                  alt="blog image"                
                  className=" object-center object-cover md:object-contain"
                  height={600}
                  width={450}
                  priority
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2 px-4">
              <div className="max-w-lg mx-auto">
                {/* Title */}
                <h2 className="font-heading text-4xl sm:text-5xl mb-10">
                  <span>{BlogData.title}</span>
                </h2>
                {/* content */}
                <p className="max-w-md font-light mb-8">{BlogData.content}</p>
                {/* link for all blogs */}
                <Link href="/blog">
                  <a className="inline-block w-full sm:w-auto px-7 py-4 text-center font-medium bg-sky-500 hover:bg-sky-600 text-white rounded transition duration-250">
                    Read more Blogs like this
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </section>
    );
  }
  else{
    return(
        <section className=" pt-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto">
            <div className="flex flex-wrap  mx-4">

              <div className="w-full flex justify-center items-center lg:w-1/2 px-4 mb-14 lg:mb-0">
                <img className="block md:w-6/12 lg:w-9/12 rounded-md" src="./main.jpg" alt=""/>
              </div>
              <div className="w-full lg:w-1/2 px-4">
                <div className="max-w-lg mx-auto">
                  <div className="mb-12">
                    <span className="inline-block px-5 py-2 mr-6 text-sm bg-gray-200 rounded-full">Blogs</span>
                    {/* <span className="font-light text-sm text-gray-700">January 13, 2022</span> */}
                  </div>
                  <h2 className="font-heading text-4xl sm:text-5xl mb-10">
                    <span>Your home:</span>
                    <span>Designed by experts, inspired by real life</span>
                  </h2>
                  <p className="max-w-md font-light mb-8">The house by the pond cras ornare, some chords for a three moments, like a sense of truth.</p>
                  <Link href="/blog">
                    <a className="inline-block w-full sm:w-auto px-7 py-4 text-center font-medium bg-sky-500 hover:bg-sky-600 text-white rounded transition duration-250">
                      Read More
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
    );
  }
}

export default Blog;

