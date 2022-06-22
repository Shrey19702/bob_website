import { useEffect, useState } from "react";


// let arr = [[],[]];
const ProductControl = ()=>{
    const [collection,setCollection] = useState([]);
    const collectionList = async()=>{
      const data = await fetch(`${process.env.BASE_URL}api/collections/getAllCollections`);
      const info = await data.json();
      setCollection(info.body);
    //   console.log(product);
    }   
   
   
 
    useEffect(()=>{
        collectionList();
       
    })


    return(
        <div className="flex flex-col">
              <div className="flex flex-col ">
        {
            collection.map(x=>(
                <ul class="bg-white rounded-lg border border-gray-200 w-96 text-gray-900 ">
                <div className="flex">
                <li class="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">{x.name}</li>
                 <button onClick={ async()=>{
                    const name = x.name;
                    const data = await fetch(`${process.env.BASE_URL}api/collections/deleteCollection`,{
                        method:"DELETE",
                        body:JSON.stringify({
                            name:{name}
                        }),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    });
                    console.log(data);
                 }}>🗑️</button>
               </div>
            </ul>
            ))
        
         }
             </div>
               <button class="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded">
                   <a href="/createCollection"> Create A collection</a>
                   </button>
        </div>
    )
}

export default ProductControl;