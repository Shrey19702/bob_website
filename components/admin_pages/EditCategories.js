import { useState } from "react";

const EditCategories = ({enterBranch, Data}) => {
    const [Categories, setCategories] = useState(Data);
    return ( 
        <>
            <form action="">
                {Categories.map((category, idx)=>(
                    <li key={idx} className="transition bg-white px-6 py-6 my-4 flex justify-between cursor-pointer w-full rounded-md shadow-sm hover:shadow-md ">
                        <input 
                            type='text' required 
                            placeholder="Name"
                            className=" inline rounded-sm text-lg" 
                            onChange={(e)=>{
                                let x = [...Categories];
                                x[idx] = e.target.value;
                                setCategories(x);
                            }}
                            value={category} 
                        />
                        <div className="flex w-[40%] min-w-[240px] justify-evenly ">
                            {Data[idx] ?
                                //Category already exist in the database
                                <> 
                                    <button className="transition border border-slate-500 rounded-md p-2 bg-transparent hover:bg-slate-600 text-slate-500 hover:text-white" 
                                        onClick={()=>{console.log("update category")}}
                                    >Update</button>    
                                    <button className="transition border border-gray-400 rounded-md p-2 bg-transparent hover:bg-gray-500 text-gray-500 hover:text-white" 
                                        onClick={()=>{enterBranch(category)}}
                                    >Go To Products</button>                        
                                    <button className="transition border border-red-400 rounded-md p-2 bg-transparent hover:bg-red-500 text-red-500 hover:text-white"
                                        onClick={ async()=>{console.log(`Delete the product`);}}
                                    >Delete</button>
                                </>
                                : //This Catergory has to be created
                                <>
                                    <button className="transition border border-slate-500 rounded-md px-8 py-2 bg-transparent hover:bg-slate-600 text-slate-500 hover:text-white" 
                                        onClick={()=>{console.log("update category")}}
                                    >Create</button>    
                                    <button className="transition border border-red-400 rounded-md p-2 bg-transparent hover:bg-red-500 text-red-500 hover:text-white"
                                        onClick={ async()=>{
                                            let x = [...Categories];
                                            x.pop();
                                            setCategories(x);
                                        }}
                                    >Delete</button>
                                </>
                            }
                        </div>

                    </li>
                ))}
                <a 
                    className="transition block rounded-md cursor-pointer bg-sky-500 hover:bg-sky-400 text-white  py-2 px-4 " 
                    onClick={()=>{
                        console.log(Data);
                        let x = [...Categories];
                        x.push('');
                        setCategories(x);
                    }}>
                    Create new Category
                </a>
            </form>
        </>
     );
}
 
export default EditCategories;