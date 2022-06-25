import { useState } from "react";

const EditCategories = ({enterBranch, collection, Data}) => {
    const [Categories, setCategories] = useState(Data);
    console.log(Categories, Data);
    return ( 
        <>
            <form action="">
                {Categories.map((category, idx)=>(
                    <li key={idx} className="transition bg-white px-10 py-6 my-4 flex justify-between items-center cursor-pointer w-full rounded-md shadow-sm hover:shadow-md ">
                        <div className="py-2 px-5 w-full flex justify-start items-center">
                            <label className="form-label inline-block mb-2 px-4 text-gray-700">Category Name</label>
                            <input 
                                type='text' required 
                                placeholder="Name"
                                className="form-control inline-block w-[70%] min-w-[300px] px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-30 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                onChange={(e)=>{
                                    let x = [...Categories];
                                    x[idx] = e.target.value;
                                    setCategories(x);
                                }}
                                value={category} 
                            />
                        </div>
                        <div className="flex min-w-[320px] justify-evenly items-center ">
                            {Data[idx] ?
                                //Category already exist in the database
                                <> 
                                    <button className="transition border disabled:opacity-80 disabled:bg-transparent disabled:text-slate-500 disabled:border-slate-500 hover:border-slate-900 rounded-md mx-2 p-2 bg-transparent bg-slate-600 text-white hover:opacity-95" 
                                        onClick={async(e)=>{
                                            e.preventDefault();
                                            const requestOptions={
                                                method:'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({collection: collection, newName: Categories[idx], oldName:Data[idx]})
                                            }
                                            const response = await fetch(`${process.env.BASE_URL}api/collections/UpdateCategory`,requestOptions);
                                            const res_data = await response.json();
                                            console.log(`Updated category :`,res_data);
                                        }}
                                        disabled={(Categories[idx]==Data[idx])? true: false}
                                    >Update</button>    
                                    <button className="transition border hover:border-gray-900 rounded-md mx-2 p-2 bg-transparent bg-gray-500 text-white hover:opacity-95" 
                                        onClick={()=>{enterBranch(category)}}
                                    >Go To Products</button>                        
                                    <button className="transition border hover:border-red-900 rounded-md mx-2 p-2 bg-transparent bg-red-500 text-white hover:opacity-95"
                                        onClick={ async(e)=>{
                                            e.preventDefault();
                                            const requestOptions={
                                                method:'DELETE',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({collection: collection, category: Categories[idx]})
                                            }
                                            const response = await fetch(`${process.env.BASE_URL}api/collections/deleteCategoryFromCollection`,requestOptions);
                                            const res_data = await response.json();
                                            console.log(`Deleted category :`,res_data);
                                        }}
                                    >Delete</button>
                                </>
                                : //This Catergory has to be created
                                <>
                                    <button className="transition border border-slate-500 rounded-md px-8 py-2 bg-transparent hover:bg-slate-600 text-slate-500 hover:text-white" 
                                        onClick={async(e)=>{
                                            e.preventDefault();
                                            const requestOptions={
                                                method:'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({collection: collection, category: Categories[idx]})
                                            }
                                            const response = await fetch(`${process.env.BASE_URL}api/collections/CreateCategory`,requestOptions);
                                            const res_data = await response.json();
                                            console.log('NEW CATEGORY CREATED :', res_data);
                                        }}
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