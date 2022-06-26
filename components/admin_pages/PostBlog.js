import {useEffect,useState} from 'react';



export default function PostBlog() {
 const [title ,setTitle] = useState("");
 const [content,setContent] = useState("");
 const [link,setLink] = useState("");
 const [author,setAuthor] = useState("")
 


  return (
    <div >
        <form className='flex flex-col' action={`${process.env.BASE_URL}api/blogs/createBlog`} method='POST'>
         
         <div className='flex flex-col py-8'>
         <label htmlFor="title">Enter your Blog Title</label>
        <input className='w-[35vw]' placeholder="Enter the title of your Blog" type="text" name= "title" value={title}  onChange={(e)=>{
          setTitle(e.target.value)
        }}  /> 
         </div >

         <div className='flex flex-col py-4'>
         <label htmlFor="content">Enter your Blog Content</label>
        <textarea className='h-[20vh] pb-[23%]' placeholder="Enter the Content of your Blog" w  type="text" name="content" value={content}   onChange={(e)=>{
          setContent(e.target.value)
        }}/> 
         </div>

          <div className='flex flex-col py-8'>
          <label htmlFor="title">Enter the Link for Blog Picture</label>
          <input className='' placeholder="Enter the Link of your BlogPic"  type="text" id="blogPic" name='blogPic' value={link}  onChange={(e)=>{
          setLink(e.target.value)
        }} />
            </div> 


            <div className='flex flex-col py-8'>
          <label htmlFor="title">Enter the Author's Name</label>
          <input className='' placeholder="Enter the Author's Name"  type="text" id="author" name='author' value={author}  onChange={(e)=>{
          setAuthor(e.target.value)
        }} />
            </div> 
        
       
       <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' type="submit"> submit</button>
        </form>
      
    </div>
  );
}