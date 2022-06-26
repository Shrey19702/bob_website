import { useEffect, useState } from 'react';
import mainImg from '../public/main.jpg';
import connectDB from '../utils/connectDB';
// import Productmodel from '../models/productModel';
import Image from "next/image";

connectDB();
  
  export default function Products({name}) {
    const [productList, setProductList] = useState();
    const [Limit, setLimit] = useState(8); 
    useEffect(()=>{
      if(!productList){
        (async ()=>{  //fetch data using /api/products/<category> api
          let data = await fetch(`${process.env.BASE_URL}api/products/${name.replace(/\s+/g, '-')}`)
          let f_products = await data.json();
          setProductList(f_products.body);
          console.log(f_products.body);
        } )();
      }
      return ()=>{};
    });
    // console.log(name);
    if(productList){
      return (
        <div className="bg-white">
          <div id={name.replace(/\s+/g, '-')} className="max-w-2xl mx-auto py-28 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">{name}</h2>
    
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {productList.map((product, idx) => {
                if(Limit>idx){
                  return (
                    <div key={idx} className="transition rounded-sm group relative shadow-sm hover:shadow-md px-2 py-4">
                      <div className="transition-all relative w-full min-h-80 bg-sky-100 aspect-w-1 aspect-h-1 rounded-md group-hover:opacity-90 overflow-hidden h-80 aspect-none">
                        {/* <img
                          src={product.colors[0].images[0]}
                          alt={product.colors[0].images[0]}
                          className="w-full h-full object-center object-contain lg:w-full lg:h-full"
                        /> */}
                        
                        <Image
                          src={product.colors[0].images[0]}
                          alt={product.colors[0].images[0]}
                          className="w-full h-full object-center object-contain"
                          layout='fill'
                          priority
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <a href={product.href}>
                              <span aria-hidden="true" className="absolute inset-0 font-medium" />
                              {product.name}
                            </a>
                          </h3>
                          {/* <p className="mt-1 text-sm text-gray-500">{product.colors[0].color}</p> */}
                        </div>
                        <p className="text-sm font-medium text-gray-700">
                          {product.discount &&product.discount.applicable ? 
                            (
                              <>
                                <del className=' line-through decoration-[3px] decoration-red-600 font-thin'>{product.price}</del>&nbsp;&nbsp;
                                <span className=' font-semibold'>{product.discount.newAmount}</span>
                              </>
                            ) : product.price }
                        </p>
                      </div>
                    </div>
                  )
                }
              })}
            </div>
            {
              productList.length>Limit &&
              <button onClick={()=>{setLimit(Limit+8)}} className='block text-lg m-auto mt-10 underline decoration-sky-600 hover:decoration-sky-700 '>Load more</button>
            }
          </div> 
        </div>
      )
    }
    else{
      return(
        <div className=' font-semibold m-auto w-fit'>
          Loading...
        </div>
      )
    }

  }
  