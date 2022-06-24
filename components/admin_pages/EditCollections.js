import { useState } from "react";

const EditCollections = ({Data, enterBranch}) => {
    const [collections, setCollections] = useState(Data);
    return ( 
        <>
            <form>
                {collections.map((collection, idx)=>(
                    <li key={idx} className="transition bg-white px-6 py-6 my-4 flex flex-col justify-between w-full rounded-md shadow-sm hover:shadow-md ">
                        <div>
                            <div className="py-2 px-5 flex justify-start items-center">
                                <label className="form-label inline-block mb-2 px-4 text-gray-700">Collection Name</label>
                                <input 
                                    type='text' required 
                                    placeholder="Name"
                                    className="form-control block w-[80%] px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-30 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                    onChange={(e)=>{
                                        let x = [...collections];
                                        x[idx].name = e.target.value;
                                        setCollections(x);
                                    }}
                                    value={collection.name} 
                                />    
                            </div>
                            <div className="py-2 px-5 flex justify-start items-center">
                                <label className="form-label inline-block mb-2 px-4 text-gray-700">Collection Image</label>
                                <input 
                                    type='url' required 
                                    placeholder="image"
                                    className="form-control block w-[80%] px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-30 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                    onChange={(e)=>{
                                        let x = [...collections];
                                        x[idx].image = e.target.value;
                                        setCollections(x);
                                    }}
                                    value={collection.image} 
                                />
                            </div>
                        </div>
                        <div className="flex min-w-[240px] justify-evenly mx-auto mt-4 ">
                            {Data[idx] ?
                                //Collection already exist in the database
                                <> 
                                    <button className="transition border border-slate-500 rounded-md mx-2 p-2 bg-transparent hover:bg-slate-600 text-slate-500 hover:text-white" 
                                        onClick={()=>{console.log("update collection")}}
                                    >Update</button>    
                                    <button className="transition border border-gray-400 rounded-md mx-2 p-2 bg-transparent hover:bg-gray-500 text-gray-500 hover:text-white" 
                                        onClick={()=>{enterBranch(collection.name)}}
                                    >Go To Products</button>                        
                                    <button className="transition border border-red-400 rounded-md mx-2 p-2 bg-transparent hover:bg-red-500 text-red-500 hover:text-white"
                                        onClick={ async()=>{console.log(`Delete the collection`);}}
                                    >Delete</button>
                                </>
                                : //This collection has to be created
                                <>
                                    <button className="transition border border-slate-500 rounded-md mx-2 px-8 py-2 bg-transparent hover:bg-slate-600 text-slate-500 hover:text-white" 
                                        onClick={()=>{console.log("update collection")}}
                                    >Create</button>
                                    <button className="transition border border-red-400 rounded-md mx-2 p-2 bg-transparent hover:bg-red-500 text-red-500 hover:text-white"
                                        onClick={ async()=>{
                                            let x = [...collections];
                                            x.pop();
                                            setCollections(x);
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
                        let x = [...collections];
                        x.push({
                            name: '',
                            image: '',
                            categories: []
                        });
                        setCollections(x);
                    }}>
                    Create new Collection
                </a>
            </form>
        </>
    );
}
 
export default EditCollections;