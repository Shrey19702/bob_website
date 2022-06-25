import { useEffect, useState } from "react";

const Editproduct = ({ product }) => {

    const [name, setName] = useState(product.name);
    const [collection, setCollection] = useState(product.collections);
    const [category, setCategory] = useState(product.category);
    const [price, setPrice] = useState(product.price);
    const [discount, setDiscount] = useState(product.discount);
    const [description, setDescription] = useState(product.description);
    const [highlights, setHighlights] = useState(product.highlights);
    const [details, setDetails] = useState(product.details);
    const [trending, setTrending] = useState(product.trending);
    const [stock, setStock] = useState(product.stock);
    const [colors, setcolors] = useState(product.colors);
    const [sizes, setsizes] = useState(product.sizes);


    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(product._id){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Id: product._id,
                    product:{
                        name: name,
                        price: price,
                        dicount: discount,
                        colors: colors,
                        sizes: sizes,
                        description: description,
                        highlights: highlights,
                        details: details,
                        collections: collection,
                        category: category,
                        trending: trending,
                        stock: stock
                    }
                })
            };
            const response = await fetch(`${process.env.BASE_URL}api/products/updateProductById`, requestOptions);
            const data = await response.json();
            console.log("FETCHED ", data);
        }
        else{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    price: price,
                    dicount: discount,
                    colors: colors,
                    sizes: sizes,
                    description: description,
                    highlights: highlights,
                    details: details,
                    collections: collection,
                    category: category,
                    trending: trending,
                    stock: stock,
                    href: ' '
                })
            };
            const response = await fetch(`${process.env.BASE_URL}api/products/createProduct`, requestOptions);
            const data = await response.json();
            console.log("FETCHED ", data);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* name */}
            <div className="py-2 px-5 flex justify-start items-center">
                <label className="form-label inline-block mb-2 px-4 text-gray-700">Name</label>
                <input 
                    type="text" 
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-30 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                    onChange={(e) => { setName(e.target.value) }}
                    value={name} 
                />
            </div>
            {/* collection */}
            <div className="py-2 px-5 flex justify-start items-center">
                <label className="form-label inline-block mb-2 px-4 text-gray-700" >collection</label>
                <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-30 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                    onChange={(e) => { setCollection(e.target.value) }} 
                    value={collection}
                />
            </div>
            {/* category */}
            <div className="py-2 px-5 flex justify-start items-center">
                <label className="form-label inline-block mb-2 px-4 text-gray-700" >category</label>
                <input 
                    type="text" 
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-30 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                    onChange={(e) => { setCategory(e.target.value) }}
                    value={category}
                 />
            </div>
            {/* price */}
            <div className="py-2 px-5 flex justify-start items-center">
                <label className="form-label inline-block mb-2 px-4 text-gray-700">price</label>
                <input 
                    type="number" 
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-30 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                    onChange={(e) => { setPrice(e.target.value) }} 
                    value={price} 
                />
            </div>
            {/* Discount */}
            <div className="py-2 px-5 flex justify-start items-center">
                <h1 className=" font-semibold">Discount:</h1>
                <label className="form-check-label inline-block px-4 text-gray-700">applicable</label>
                <input
                    type="checkbox" 
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    onChange={() => {
                        let newDiscount = {}
                        newDiscount.applicable = (!discount.applicable);
                        newDiscount.newAmount = discount.newAmount;
                        setDiscount(newDiscount);
                    }}
                    checked={discount.applicable}
                    // error here
                />
                <label className="form-check-label min-w-fit inline-block px-4 text-gray-700">new Amount</label>
                <input
                    type="number" 
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-30 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                    onChange={(e) => {
                        let newDiscount = {}
                        newDiscount.applicable = discount.applicable;
                        newDiscount.newAmount = e.target.value;
                        setDiscount(newDiscount);
                    }}
                    value={discount.newAmount}
                />
            </div>
            {/* description */}
            <div className="py-2 px-5 flex justify-start items-center">
                <label className="form-label inline-block mb-2 px-4 text-gray-700">description</label>
                <textarea 
                    rows="2" 
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-30 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                    onChange={(e) => { setDescription(e.target.value) }} 
                    value={description}
                />
            </div>
            {/* highlights */}
            <div className="py-2 px-5 flex flex-col justify-start items-center">
                <label className="form-label inline-block mb-2 px-4 text-gray-700">highlights</label>
                {highlights.map((curr_highlight, idx) => (
                    <input
                        className="form-control block w-full my-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-30 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        key={idx}
                        onChange={(e) => {
                            let x = [...highlights];
                            x[idx] = e.target.value;
                            setHighlights(x);
                        }}
                        type="text"
                        value={curr_highlight}
                    />
                ))}
                <div className=" w-fit m-auto">
                    <button
                        className="transition p-2 m-3 border shadow-sm hover:shadow-md inline-block"
                        onClick={(e) => {
                            e.preventDefault();
                            let x = [...highlights];
                            x.push('');
                            setHighlights(x);
                        }}>
                        add highlight
                    </button>
                    <button
                        className="transition p-2 m-3 border shadow-sm hover:shadow-md inline-block"
                        onClick={(e) => {
                            e.preventDefault();
                            let x = [...highlights];
                            x.pop();
                            setHighlights(x);
                        }}>
                        remove highlight
                    </button>
                </div>

            </div>
            {/* details */}
            <div className="py-2 px-5 flex justify-start items-center">
                <label className="form-label inline-block mb-2 px-4 text-gray-700">details</label>
                <textarea 
                    rows="2" 
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-30 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                    onChange={(e) => { setDetails(e.target.value) }}
                    value={details}
                />
            </div>
            {/* trending */}
            <div className="py-2 px-5 flex justify-start items-center">
                <label className="form-check-label inline-block px-4 text-gray-700">trending</label>
                <input 
                    type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    onChange={() => { setTrending(!trending) }} 
                    checked={trending}
                />
            </div>
            {/* stock */}
            <div className="py-2 px-5 flex justify-start items-center">
                <label className="form-label inline-block mb-2 px-4 text-gray-700">stock</label>
                <input 
                    type="number" 
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-30 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                    onChange={(e) => { setStock(e.target.value) }} 
                    value={stock}
                />
            </div>
            {/* colors */}
            <div className="py-2 px-5 my-4 flex flex-col justify-start items-center border ">
                <label className="form-label font-semibold inline-block mb-2 px-4 text-gray-700">Colors</label>
                {colors.map((curr_color, idx) => {
                    return (
                        <div key={idx} className="flex flex-wrap w-full p-4 my-8 border shadow-md">
                            <div className="py-2 px-5 flex justify-start items-center">
                                <label className="form-label inline-block mb-2 px-4 text-gray-700">Color</label>
                                <input
                                    type="text"
                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-30 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    onChange={(e) => {
                                        let x = [...colors];
                                        x[idx].color = e.target.value;
                                        setcolors(x);
                                    }}
                                    value={curr_color.color}
                                />
                            </div>
                            <div className="py-2 px-5 w-full flex flex-wrap justify-start items-center">
                                <label className="form-label inline-block mb-2 px-4 text-gray-700">Images:</label>
                                {curr_color.images.map((curr_image, subidx) => (
                                    <input
                                        className="form-control block w-full my-1 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-30 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        key={subidx}
                                        onChange={(e) => {
                                            let x = [...colors];
                                            x[idx].images[subidx] = e.target.value;
                                            setcolors(x);
                                        }}
                                        type="url"
                                        value={curr_image}
                                    />
                                ))}
                            </div>
                            <div className=" w-fit m-auto">
                                <button
                                    className="transition p-2 m-3 border shadow-sm hover:shadow-md inline-block"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        let x = [...colors];
                                        x[idx].images.push('');
                                        setcolors(x);
                                    }}>
                                    add another image
                                </button>
                                <button
                                    className="transition p-2 m-3 border shadow-sm hover:shadow-md inline-block"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        let x = [...colors];
                                        x[idx].images.pop();
                                        setcolors(x);
                                    }}>
                                    remove last image
                                </button>
                            </div>
                        </div>
                    )
                })}
                <div className="w-fit m-auto">
                    <button
                        className="p-2 m-3 border shadow-sm hover:shadow-md inline-block"
                        onClick={(e) => {
                            e.preventDefault();
                            let x = [...colors];
                            x.push({
                                color: "",
                                images: []
                            })
                            setcolors(x);
                        }}>
                        add a color
                    </button>
                    <button
                        className="p-2 m-3 border shadow-sm hover:shadow-md inline-block"
                        onClick={(e) => {
                            e.preventDefault();
                            let x = [...colors];
                            x.pop();
                            setcolors(x);
                        }}>
                        Remove last color
                    </button>
                </div>
            </div>
            {/* sizes */}
            <div className="py-2 px-5 my-4 flex flex-wrap justify-center items-center border ">
                <label className="form-label w-full text-center font-semibold inline-block m-4 px-4 text-gray-700">sizes</label>
                    {sizes.map((curr_size, idx) => {
                        return (
                            <div key={idx} className="flex flex-wrap justify-evenly w-fit p-4 border shadow-md">
                                <div className="py-2 px-5 flex justify-start items-center">
                                    <label className="form-label inline-block mb-2 px-4 text-gray-700">size</label>
                                    <input
                                        type="text"
                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-30 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        onChange={(e) => {
                                            let x = [...sizes];
                                            x[idx].size = e.target.value;
                                            setsizes(x);
                                        }}
                                        value={curr_size.size}
                                    />
                                </div>
                                <div className="py-2 px-5 flex flex-wrap justify-start items-center">
                                    <label className="form-check-label inline-block px-4 text-gray-700">instock</label>
                                    <input 
                                        type="checkbox"
                                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                        onChange={(e) => {
                                            let x = [...sizes];
                                            x[idx].inStock = (!sizes[idx].inStock);
                                            setsizes(x);
                                        }} 
                                        checked={curr_size.inStock}
                                    /> 
                                </div>
                            </div>
                        )
                    })}
                <div className=" w-full flex justify-center">
                    <button
                        className="transition p-2 m-3 border shadow-sm hover:shadow-md inline-block"
                        onClick={(e) => {
                            e.preventDefault();
                            let x = [...sizes];
                            x.push({
                                size:'',
                                inStock:''
                            })
                            setsizes(x);
                        }}>
                        add size
                    </button>
                    <button
                        className="transition p-2 m-3 border shadow-sm hover:shadow-md inline-block"
                        onClick={(e) => {
                            e.preventDefault();
                            let x = [...sizes];
                            x.pop();
                            setsizes(x);
                        }}>
                        remove last size
                    </button>
                </div>
            </div>

            <button type="submit" className='transition mx-[45%] mt-8 bg-transparent hover:bg-sky-500 text-sky-700 hover:text-white py-3 px-8 border border-sky-500 hover:border-transparent rounded'>
                {product._id? "update": "Create"}
            </button>

        </form>
    );
}

export default Editproduct;