import { useEffect, useState } from "react";
import EditCategories from "./EditCategories";
import EditCollections from "./EditCollections";
import Editproduct from "./Editproduct";

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
        // console.log(newData);
    }
    const getProductsList = async(category)=>{
        const fetch_data = await fetch(`${process.env.BASE_URL}api/products/${category.replace(/\s+/g, '-')}`);
        const json_data = await fetch_data.json();
        setData(json_data.body);
    }
    const getProduct = async(id)=>{
        let newData={};
        Data.forEach((element)=>{
            if(element._id == id){
                newData = element;
            }
        });
        setData(newData);
        // console.log("NEW DATA is :",newData);
    }

    const enterBranch = (newBranch)=>{
        let newTree={};
        if(tree.type=="collection"){ //going inside a collection
            newTree.type = "category";
            newTree.branch = newBranch; //name of the collection where we are
        }
        else if(tree.type == "category"){ //going inside categories
            newTree.type = "products";
            newTree.branch = newBranch; //name of the category where we are
        }
        else if(tree.type == "products"){ //going inside a product
            newTree.type = "product-Details";
            newTree.branch = newBranch; //id of the product where we are
        }
        // console.log('CHANGE TREE:',newTree);
        setTree(newTree);
    }

    useEffect(()=>{
        if(tree.type=="collection"){
            getCollectionsList();
        }
        else if(tree.type=="category"){
            getCategoryList(tree.branch);
        }
        else if(tree.type=="products"){
            getProductsList(tree.branch);
        }
        else{
            getProduct(tree.branch);
        }
        // console.log("USEEFFECT: ",tree);
    },[tree]);

    return(
        <div className="w-full flex flex-col">
            <div className="w-full flex flex-col ">
                <div>Branch:{tree.branch} Type:{tree.type}</div>
                <ul className="w-full text-gray-900 ">
                    {/* Showing All the Collections */}
                    {tree.type=="collection" && Data && 
                        (<>
                            <EditCollections Data={Data} enterBranch={enterBranch} />
                        </>)
                    }
                    {/* Showing all the Categories inside a collection */}
                    {tree.type=="category" && typeof(Data[0])=='string' && 
                        (<>
                            <EditCategories enterBranch={enterBranch} Data={Data} />
                        </>)
                    }
                    {/* Showing all products inside a category */}
                    {tree.type=="products" && Data && 
                        (<>
                            {Data.map((x, idx)=>(
                                <li key={idx} onClick={()=>{enterBranch(x._id)}} className="transition bg-white px-6 py-6 my-4 flex justify-between cursor-pointer w-full rounded-md shadow-sm hover:shadow-md ">
                                    <h1 className=" inline text-lg" >{x.name}</h1>
                                    <button className="transition border border-red-400 rounded-md p-2 bg-transparent hover:bg-red-500 text-red-500 hover:text-white" onClick={ async()=>{
                                        console.log(`Delete the product ${x.name}`);
                                    }}>Delete</button>
                                </li>
                            ))}
                                <a 
                                    className="transition block rounded-md cursor-pointer bg-sky-500 hover:bg-sky-400 text-white  py-2 px-4 " 
                                    onClick={()=>{
                                        console.log(Data);
                                        let x= [...Data];
                                        x.push({
                                            name: "",
                                            price: 0,
                                            discount: {applicable: false, newAmount: 0},
                                            href: " ",
                                            category: "",
                                            collections: "",
                                            trending: true,
                                            description: "",
                                            details: "",
                                            highlights: [],
                                            colors: [],
                                            sizes: [],
                                            stock: 0,
                                        });
                                        setData(x);
                                }}>
                                    Create new product
                                </a>
                        </>)
                    }
                    {tree.type=="product-Details" && !Data.length && 
                        (<li key={Data._id} className="transition bg-white px-6 py-6 my-4 w-full rounded-md shadow-sm hover:shadow-md ">
                            <Editproduct product={Data}/>
                        </li>)
                    }
                </ul>
            </div>
            {/* <div className="transition bg-sky-500 hover:bg-sky-400 text-white  py-2 px-4 rounded">
                <a href="/admin/createCollection"> Create A collection</a>
            </div> */}
        </div>
    )
}

export default ProductControl;