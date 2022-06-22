import { useState } from "react";


const createProduct = ()=>{
const [name,setName] = useState("");
const [price,setPrice] = useState(0);
const [image,setImage] = useState([]);
const [color,setColor] = useState([]);

    return(
          <form
      className="flex flex-col items-center justify-center py-[15%]"
      action={`${process.env.BASE_URL}api/collections/createCollections`}
      method="POST"
    >

<div className="flex flex-col ">
        <label htmlFor="title">Enter Name of your Product</label>
        <input
          className="w-[35vw]"
          placeholder="Enter the Name of Your Product"
          type="text"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>

    
      <div className="flex flex-col ">
        <label htmlFor="title">Enter Price of your Product</label>
        <input
          className="w-[35vw]"
          placeholder="Enter the Price of Your Product"
          type="number"
          name="price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
      </div>

      
{/* discount wala scene to be added */}

<div className="flex flex-col ">
        <label htmlFor="title">Enter Link of your Product images</label>
        <input
          className="w-[35vw]"
          placeholder="Enter Link of your Product images"
          type="text"
          name="image"
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
      </div>


      
        

      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        type="submit"
      >
        submit
      </button>
    </form>
    )
}

export default createProduct