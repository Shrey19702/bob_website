import React, {useEffect, useCallback, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from "next/image";


// use embla-carousel instead, css using tailwind for future reference: https://www.embla-carousel.com/

// const products = [
//   {
//     id: 1,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: './main.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: '$35',
//     color: 'Black',
//   },
// ]

export const EmblaCarousel = () => {
  // const [emblaRef] = useEmblaCarousel()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [products,setProducts] = useState();

  const getProduct = async()=>{
      const data = await fetch(`${process.env.BASE_URL}api/products/getTrendingProduct`);
      const info = await data.json();
      setProducts(info.body);
  }

  useEffect(() => {
    getProduct();
    if (emblaApi) {
      
    }
  }, [emblaApi])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="embla overflow-hidden h-[80vh] min-h-[520px] max-h-[600px] py-12 relative bg-white">
      <h2 className=" text-3xl pb-5 text-center font-extrabold text-gray-900">Trending Products</h2>
      <button className="embla__prev transition flex justify-center items-center bg-pink-200 hover:bg-pink-300 h-12 w-12 rounded-full text-gray-900 absolute top-1/3 left-3 z-10 " onClick={scrollPrev}>
        <Prevsvg/>
      </button>
      <button className="embla__next flex transition justify-center items-center bg-pink-200 hover:bg-pink-200 h-12 w-12 rounded-full text-gray-900 absolute top-1/3 right-3 z-10" onClick={scrollNext}>
        <Nextsvg/>
      </button>
      <div className="embla__viewport" ref={products?emblaRef:null}>
        <div className="embla__container flex h-[55vh] items-center">

          {products? products.map((product, idx) => (
            <div key={idx} className="embla__slide group relative flex-[0_0_320px] m-4 h-[50vh] max-h-[400px]">
              <div className="transition-all relative w-full min-h-80 bg-sky-100 rounded-md group-hover:opacity-90 overflow-hidden h-80 aspect-none">
                {/* <img  
                  src={product.colors[0].images[0]}
                  alt={product.name}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                /> */}
                 <Image
                    src={product.colors[0].images[0]}
                    alt={product.colors[0].images[0]}
                    className="embla__slide__img w-full h-full object-center object-contain"
                    layout='fill'
                    priority
                  />
              </div>
              <div className="pt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
            )): <div>Loading...</div>}
        </div>
      </div>
     
    </div>
  )
}

const Nextsvg = function(){
  return(
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
} 

const Prevsvg = function(){
  return(
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
    </svg>
  );
} 


export default EmblaCarousel;
