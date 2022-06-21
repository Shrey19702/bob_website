import React from "react";

const blogItem  = function({ title, author, image, content, index }) {
  return (
    <main key={index} className="py-6 px-4 sm:p-6 md:py-10 md:px-8">
      <h1 className="mt-16 flex justify-center text-4xl">Blogs...</h1>
      <div className="max-w-4xl my-8 mx-auto grid grid-cols-1 lg:max-w-5xl lg:gap-x-20 lg:grid-cols-2 bg-white p-8 shadow-md">
        <div className="relative p-3 col-start-1 row-start-1 flex flex-col rounded-lg bg-gradient-to-t from-black/75 via-black/0 sm:bg-none sm:row-start-2 sm:p-0 lg:row-start-1">
          <h1 className="mt-1 text-lg sm:font-semibold font-normal text-white sm:text-slate-900 md:text-2xl ">
            Beach House in Collingwood
          </h1>
          <h1>Author</h1>
        </div>
        <div className="grid my-auto gap-4 col-start-1 col-end-3 row-start-1 sm:mb-6 sm:grid-cols-4 lg:gap-6 lg:col-start-2 lg:row-end-6 lg:row-span-6 lg:mb-0">
          <img
            src="/beach-house.jpg"
            alt=""
            className="w-full h-60 object-cover rounded-lg sm:h-52 sm:col-span-2 lg:col-span-full"
            loading="lazy"
          />
        </div>

        <p className="mt-4 text-sm leading-6 col-start-1 sm:col-span-2 lg:mt-6 lg:row-start-4 lg:col-span-1 dark:text-slate-400">
          This sunny and spacious room is for those traveling light and looking
          for a comfy and cosy place to lay their head for a night or two. This
          beach house sits in a vibrant neighborhood littered with cafes, pubs,
          restaurants and supermarkets and is close to all the major attractions
          such as Edinburgh Castle and Arthur's Seat.
        </p>
      </div>
    </main>
  );
}

export default function Blogs(){
  let blogs = [
    {
      title: "Beach House in Collingwood",
      author: "shrey",
      content:
        "This sunny and spacious room is for those traveling light and looking for a comfy and cosy place to lay their head for a night or two. This beach house sits in a vibrant neighborhood littered with cafes, pubs, restaurants and supermarkets and is close to all the major attractions such as Edinburgh Castle and Arthur's Seat.",
      image: "/beach-house.jpg",
    },
    {
      title: "Beach House in Collingwood",
      author: "shrey",
      content:
        "This sunny and spacious room is for those traveling light and looking for a comfy and cosy place to lay their head for a night or two. This beach house sits in a vibrant neighborhood littered with cafes, pubs, restaurants and supermarkets and is close to all the major attractions such as Edinburgh Castle and Arthur's Seat.",
      image: "/beach-house.jpg",
    },
    {
      title: "Beach House in Collingwood",
      author: "shrey",
      content:
        "This sunny and spacious room is for those traveling light and looking for a comfy and cosy place to lay their head for a night or two. This beach house sits in a vibrant neighborhood littered with cafes, pubs, restaurants and supermarkets and is close to all the major attractions such as Edinburgh Castle and Arthur's Seat.",
      image: "/beach-house.jpg",
    },
    {
      title: "Beach House in Collingwood",
      author: "shrey",
      content:
        "This sunny and spacious room is for those traveling light and looking for a comfy and cosy place to lay their head for a night or two. This beach house sits in a vibrant neighborhood littered with cafes, pubs, restaurants and supermarkets and is close to all the major attractions such as Edinburgh Castle and Arthur's Seat.",
      image: "/beach-house.jpg",
    },
    {
      title: "Beach House in Collingwood",
      author: "shrey",
      content:
        "This sunny and spacious room is for those traveling light and looking for a comfy and cosy place to lay their head for a night or two. This beach house sits in a vibrant neighborhood littered with cafes, pubs, restaurants and supermarkets and is close to all the major attractions such as Edinburgh Castle and Arthur's Seat.",
      image: "/beach-house.jpg",
    },
  ]
  return(
    <div className="pt-16">
      {blogs.map((blog, index)=>(
      <blogItem title={blog.title} index={index} author={blog.author} image={blog.image} content={blog.content} />
    ))}
    </div>
    
  )
};
