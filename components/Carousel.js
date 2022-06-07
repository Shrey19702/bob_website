import React, {useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

// use embla-carousel instead, css using tailwind for future reference: https://www.embla-carousel.com/

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
      id: 2,
      name: 'Basic Tee',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
  },
  {
      id: 3,
      name: 'Basic Tee',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
  },
  {
      id: 4,
      name: 'Basic Tee',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
  },
  {
      id: 5,
      name: 'Basic Tee',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
  },
  {
    id: 6,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 7,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 8,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 9,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 10,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },

  // More products...
]

export const EmblaCarousel = () => {
  // const [emblaRef] = useEmblaCarousel()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  useEffect(() => {
    if (emblaApi) {
      // Embla API is ready
    }
  }, [emblaApi])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="embla overflow-hidden h-[60vh] py-12 relative bg-white">
      <button className="embla__prev bg-lime-600 h-12 w-12 rounded-full text-gray-100 absolute top-1/3 left-3 z-10 " onClick={scrollPrev}>
        Prev
      </button>
      <button className="embla__next bg-lime-600 h-12 w-12 rounded-full text-gray-100 absolute top-1/3 right-3 z-10" onClick={scrollNext}>
        Next
      </button>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container flex h-[55vh]">

          {products.map((product) => (
            <div key={product.id} className="embla__slide group relative flex-[0_0_320px] m-4 h-[50vh]">
              <div className="transition-all w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md group-hover:opacity-90 overflow-hidden  lg:h-80 lg:aspect-none">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
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
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
            ))}
       {/*<div className="embla__slide relative flex-[0_0_320px] bg-yellow-100 m-4 h-[50vh]">Slide 1</div>
          <div className="embla__slide relative flex-[0_0_320px] bg-yellow-200 m-4 h-[50vh]">Slide 2</div>
          <div className="embla__slide relative flex-[0_0_320px] bg-yellow-300 m-4 h-[50vh]">Slide 3</div>
          <div className="embla__slide relative flex-[0_0_320px] bg-yellow-400 m-4 h-[50vh]">Slide 4</div>
          <div className="embla__slide relative flex-[0_0_320px] bg-yellow-500 m-4 h-[50vh]">Slide 5</div>
          <div className="embla__slide relative flex-[0_0_320px] bg-yellow-600 m-4 h-[50vh]">Slide 6</div>
          <div className="embla__slide relative flex-[0_0_320px] bg-yellow-700 m-4 h-[50vh]">Slide 7</div>
          <div className="embla__slide relative flex-[0_0_320px] bg-yellow-800 m-4 h-[50vh]">Slide 8</div>
          <div className="embla__slide relative flex-[0_0_320px] bg-yellow-900 m-4 h-[50vh]">Slide 9</div>
          <div className="embla__slide relative flex-[0_0_320px] bg-yellow-50 m-4 h-[50vh]">Slide 10</div> */}
        </div>
      </div>
     
    </div>
  )
}

export default EmblaCarousel;