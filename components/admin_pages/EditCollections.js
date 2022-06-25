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
                                    <button className="transition border disabled:opacity-80 disabled:bg-transparent disabled:text-slate-500 disabled:border-slate-500 hover:border-slate-900 rounded-md mx-2 p-2 bg-transparent bg-slate-600 text-white hover:opacity-95" 
                                        onClick={async(e)=>{
                                            e.preventDefault();
                                            const requestOptions={
                                                method:'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({new: collections[idx], oldName:Data[idx].name})
                                            }
                                            const response = await fetch(`${process.env.BASE_URL}api/collections/UpdateCollection`,requestOptions);
                                            const res_data = await response.json();
                                            console.log(`Updated collection :`,res_data);
                                        }}
                                        disabled={(collections[idx].name==Data[idx].name && collections[idx].image==Data[idx].image)? true: false}
                                    >Update</button>    
                                    <button className="transition border hover:border-gray-900 rounded-md mx-2 p-2 bg-transparent bg-gray-500 text-white hover:opacity-95" 
                                        onClick={()=>{enterBranch(collection.name)}}
                                    >Go To Categories</button>                        
                                    <button className="transition border hover:border-red-900 rounded-md mx-2 p-2 bg-transparent bg-red-500 text-white hover:opacity-95"
                                        onClick={ async(e)=>{
                                            e.preventDefault();
                                            const requestOptions={
                                                method:'DELETE',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({name: collections[idx].name})
                                            }
                                            const response = await fetch(`${process.env.BASE_URL}api/collections/deleteCollection`,requestOptions);
                                            const res_data = await response.json();
                                            console.log(`Deleted collection :`,res_data);
                                        }}
                                    >Delete</button>
                                </>
                                : //This collection has to be created
                                <>
                                    <button className="transition border border-slate-500 rounded-md mx-2 px-8 py-2 bg-transparent hover:bg-slate-600 text-slate-500 hover:text-white" 
                                        onClick={async(e)=>{
                                            e.preventDefault();
                                            const requestOptions={
                                                method:'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify(collections[idx])
                                            }
                                            const response = await fetch(`${process.env.BASE_URL}api/collections/createCollections`,requestOptions);
                                            const res_data = await response.json();
                                            console.log('NEW COLLECTION CREATED :', res_data);
                                        }}
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
                        // console.log(Data);
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