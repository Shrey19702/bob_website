import { useState } from "react";

const createCollection = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  return (
    <form
      className="flex flex-col items-center justify-center py-[15%]"
      action={`${process.env.BASE_URL}api/collections/createCollections`}
      method="POST"
    >

<div className="flex flex-col ">
        <label htmlFor="title">Enter Name</label>
        <input
          className="w-[35vw]"
          placeholder="Enter the title of your Blog"
          type="text"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col ">
        <label htmlFor="title">Enter Category</label>
        <input
          className="w-[35vw]"
          placeholder="Enter the title of your Blog"
          type="text"
          name="categories"
          value={category}
          onChange={e=> 
            setCategory(e.target.value)
          }
        />
      </div>


    

      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        type="submit"
      >
        submit
      </button>
    </form>
  );
};

export default createCollection;
