import { useEffect, useState } from 'react';
import mainImg from '../public/main.jpg';
import connectDB from '../utils/connectDB';
import Productmodel from '../models/productModel';
connectDB();


// const products = [
//     {
//       id: 1,
//       name: 'Basic Tee',
//       href: '#',
//       imageSrc: mainImg,
//       imageAlt: "Front of men's Basic Tee in black.",
//       price: '$35',
//       color: 'Black',
//     },
//     {
//         id: 2,
//         name: 'Basic Tee',
//         href: '#',
//         imageSrc: mainImg,
//         imageAlt: "Front of men's Basic Tee in black.",
//         price: '$35',
//         color: 'Black',
//     },
//     {
//         id: 3,
//         name: 'Basic Tee',
//         href: '#',
//         imageSrc: mainImg,
//         imageAlt: "Front of men's Basic Tee in black.",
//         price: '$35',
//         color: 'Black',
//     },
//     {
//         id: 4,
//         name: 'Basic Tee',
//         href: '#',
//         imageSrc: mainImg,
//         imageAlt: "Front of men's Basic Tee in black.",
//         price: '$35',
//         color: 'Black',
//     },
//     {
//         id: 5,
//         name: 'Basic Tee',
//         href: '#',
//         imageSrc: mainImg,
//         imageAlt: "Front of men's Basic Tee in black.",
//         price: '$35',
//         color: 'Black',
//     },
//     // More products...
//   ]
  
  export default function Products({name}) {
    const [productList, setProductList] = useState(null);

    useEffect(()=>{
      if(!productList){
        (async ()=>{
          console.log('getting data');
          let f_products = await Productmodel.find({category: name});
          setProductList(f_products);
        } )();
      }
      else{
        console.log('### found products are : ', productList);
      }

      return ()=>{};
    });
    console.log(productList);
    // return (
    //   <div className=' p-96 font-semibold'>Hello </div>
    // )
    if(productList){
      return (
        <div className="bg-white">
          <div className="max-w-2xl mx-auto py-28 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">{name}</h2>
    
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {productList.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="transition-all w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md group-hover:opacity-90 overflow-hidden  lg:h-80 lg:aspect-none">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={product.href}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{product.colors[0].color}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
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
  