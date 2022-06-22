import { useEffect, useState } from "react";

const ProductControl = ()=>{
    const [tree, setTree] = useState({type: "collection", branch: null});
    const [Data,setData] = useState();

    const getCollectionsList = async()=>{
      const fetch_data = await fetch(`${process.env.BASE_URL}api/collections/getAllCollections`);
      const json_data = await fetch_data.json();
      setData(json_data.body);
    //   console.log(product);
    }
    const getCategoryList = (collection)=>{
        let newData=[];
        Data.forEach((element)=>{
            if(element.name == collection){
                newData = element.categories;
            }
        });
        setData(newData)
        console.log(newData);
    }
    const getProductsList = async(category)=>{
        const fetch_data = await fetch(`${process.env.BASE_URL}api/products/${category.replace(/\s+/g, '-')}`);
        const json_data = await fetch_data.json();
        setData(json_data.body);
    }

    const enterBranch = (newBranch)=>{
        let newTree={};
        if(tree.type=="collection"){ //going inside a collection
            newTree.type = "category";
            newTree.branch = newBranch; //name of the collection where we are
        }
        else if(tree.type == "category"){ //going inside categories
            console.log('Hello');
            newTree.type = "products";
            newTree.branch = newBranch; //name of the category where we are
        }
        else if(tree.type == "products"){ //going inside a product
            newTree.type = "product-Details";
            newTree.branch = newBranch; //id of the product where we are
        }
        console.log('CHANGE TREE:',newTree);
        setTree(newTree);
    }

    useEffect(()=>{
        if(tree.type=="collection"){
            getCollectionsList();
        }
        else if(tree.type=="category"){
            getCategoryList(tree.branch);
            console.log(Data);
        }
        else if(tree.type=="products"){
            getProductsList(tree.branch);
        }
        else{
            getProduct(tree.branch);
        }
        console.log("USEEFFECT: ",tree);
    },[tree]);

    console.log(Data);

    return(
        <div className="flex flex-col">
            <div className="flex flex-col ">
                <div>Branch:{tree.branch} Type:{tree.type}</div>
                <ul className="w-96 text-gray-900 ">
                    {/* Showing All the Collections */}
                    {tree.type=="collection" && Data && Data.map((x)=>(
                        <li key={x.name} onClick={()=>{enterBranch(x.name)}} className="transition bg-white px-6 py-6 my-4 flex justify-between cursor-pointer w-full rounded-md shadow-sm hover:shadow-md ">
                            <h1 className=" inline text-lg" >{x.name}</h1>
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
                            }}>🗑️</button>
                        </li>
                    ))}
                    {/* Showing all the Categories inside a collection */}
                    {tree.type=="category" && typeof(Data[0])=='string' && Data.map((x, idx)=>(
                        <li key={idx} onClick={()=>{enterBranch(x)}} className="transition bg-white px-6 py-6 my-4 flex justify-between cursor-pointer w-full rounded-md shadow-sm hover:shadow-md ">
                            <h1 className=" inline text-lg" >{x}</h1>
                            <button onClick={()=>{
                                console.log(`Delete the category ${x} with all its products`);
                            }}>🗑️</button>
                        </li>
                    ))}
                    {/* Showing all products inside a category */}
                    {tree.type=="products" && Data && Data.map((x, idx)=>(
                        <li key={idx} onClick={()=>{enterBranch(x._id)}} className="transition bg-white px-6 py-6 my-4 flex justify-between cursor-pointer w-full rounded-md shadow-sm hover:shadow-md ">
                            <h1 className=" inline text-lg" >{x.name}</h1>
                            <button onClick={ async()=>{
                                console.log(`Delete the product ${x.name}`);
                            }}>🗑️</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="transition bg-sky-500 hover:bg-sky-400 text-white  py-2 px-4 rounded">
                <a href="/admin/createCollection"> Create A collection</a>
            </div>
        </div>
    )
}

export default ProductControl;