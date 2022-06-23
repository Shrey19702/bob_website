import { useEffect, useState } from "react"

const DeleteBlog = ()=>{
    const [blogs , setBlogs] = useState([]);

    const getBlog = async()=>{
        const data = await fetch(`${process.env.BASE_URL}/api/blogs/getBlog`);
        const info = await data.json();
        
        setBlogs(info.body);
    }
    const deleteBlog= async(title)=>{
       const data = await fetch(`${process.env.BASE_URL}/api/blogs/deleteBlog`,{
        method:"DELETE",
        body : JSON.stringify({
            title:{title}
        })
       })
    }
  useEffect(()=>{
    getBlog();
  })
    return(
            <ul class="flex flex-col bg-white rounded-lg border border-gray-200 w-96 text-gray-900 ">
        {
            blogs.map(x=>(
                <div key={x._id} className="flex">
                <li className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">{x.title}</li>
                <button onClick={(e)=>{deleteBlog(x.title)}} >🗑️</button>
                </div>
                
            ))
        }
        </ul>
        
    )
}

export default DeleteBlog