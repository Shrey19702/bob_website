import { useContext, useEffect, useState, useCallback } from 'react'
import { RadioGroup } from '@headlessui/react'
import Image from "next/image"
import useEmblaCarousel from 'embla-carousel-react'
import ReactImageMagnify from 'react-image-magnify'
import { CartContext } from '../../components/Cart'
import ProductsModel from '../../models/productModel'
import connectDB from '../../utils/connectDB'
import { useSession } from "next-auth/react"
import Products from "../../components/Products"
// import img from '../../public/main.jpg'
connectDB();

// const reviews = { href: null, average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductPage({ f_product }) {
  f_product = JSON.parse(f_product);
  const { state, dispatch } = useContext(CartContext);  //for adding products to cart
  const { data: session, status } = useSession();

  const [selectedColorIdx, setSelectedColorIdx] = useState(0)
  const [selectedSize, setSelectedSize] = useState(f_product.sizes[0].size)

  const [images,setImages] = useState(null);
  const [currImg,setCurrImg] = useState(null);

  const [wishlist, setWishlist] = useState(false);
  const [user, setUser] = useState(null);

  const [emblaRef, emblaApi] = useEmblaCarousel();
  
  useEffect(()=>{
    (async()=>{
      if(session && !user){
        const response = await fetch(`${process.env.BASE_URL}api/user/getUserByEmail`,{
          method:'POST',
          body: JSON.stringify({email: session.user.email})
        });
        const res = await response.json();
        let x = res.body.wishlist.find((id)=>id._id===f_product._id)
        if(x)
          setWishlist(true);
        setUser(res.body);
      }
    })();
  });

  useEffect(()=>{
    setImages(f_product.colors[selectedColorIdx].images );
  },[selectedColorIdx]);

  useEffect(()=>{
    if(images)
      setCurrImg(images[0]);
  },[images]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const addToCart = (product) => {  //add to cart button 
    let req_product = state.cart.filter((element) => (element.id == product._id));
    // console.log(selectedColor)
    if (req_product.length === 0) { //if this product is not in the cart 
      let productData = {
        id: product._id,
        href: product.href,
        name: product.name,
        image: f_product.colors[selectedColorIdx].images[0],
        color: f_product.colors[selectedColorIdx].color,
        size: selectedSize,
        price: product.price,
        discount: product.discount,
        quantity: 1
      };
      // console.log(productData);
      dispatch({ type: "ADD_NEW", productData });
    }
    else { //this product already exist in the cart
      // let  = (state.cart.filter((element)=> (element.id == product._id)));
      let curr_quantity = req_product[0].quantity;
      let productID = product._id;
      dispatch({ type: "ADD_TO_EXISTING", productID, curr_quantity })
    }
  };
  const createBreadcrumbs = (product) => {  //create an array with the links and name for products category and collection
    let breadcrumb = []; 
    breadcrumb.push({
      id: 1,
      name: product.collections,
      href: `/collection/${product.collections.replace(/\s+/g, '-')}`
    })
    breadcrumb.push({
      id: 2,
      name: product.category,
      href: `/collection/${product.collections.replace(/\s+/g, '-')}#${product.category.replace(/\s+/g, '-')}`
    })
    breadcrumb.push({
      id: 3,
      name: product.name,
      href: `/products/${product._id}`
    })
    return (breadcrumb);
  }

  if (!f_product) {
    return (<div className='p-96 font-semibold' >404 there is no such Product</div>)
  }
  // console.log('Current Selected color', selectedColorIdx)

  return (
    <div className="bg-gray-50">
      <div className="py-32">
        {/* Breadcrumbs */}
        <nav aria-label="product" className=' pb-8' >
          <ol role="list" className="max-w-2xl px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-40">
            {
              createBreadcrumbs(f_product).map(breadcrumb => {
                if (breadcrumb.id == 3) {
                  return (
                    <li className="text-lg
                    " key={breadcrumb.id}>

                      <a href={breadcrumb.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                        {breadcrumb.name}
                      </a>
                    </li>
                  )
                }
                else {
                  return (
                    <li key={breadcrumb.id}>
                      <div className="flex items-center">
                        <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                          {breadcrumb.name}
                        </a>


                        <svg
                          width={16}
                          height={20}
                          viewBox="0 0 16 20"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          className="w-4 h-5 text-gray-300"
                        >
                          <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                        </svg>
                      </div>
                    </li>
                  )
                }
              })
            }


          </ol>
        </nav>

        {/* product image options discription  */}
        <div className="mt-3 max-w-full mx-10 sm:px-6 justify-between md:justify-center lg:px-8 flex flex-wrap">

          {/* product image */}
          <div className=" h-fit select-none">
            {/* product images without magnification for small screens */}
            <div className='lg:hidden'> 
              <Image
                src={f_product.colors[selectedColorIdx].images[0]}
                alt={f_product.name}
                className="w-full h-full object-center select-none object-contain"
                height={600}
                width={450}
                priority
              />
            </div>
            {/* product images with magnification for large screens */}
            <ReactImageMagnify
              className='z-10 hidden lg:block'
              {...{
                smallImage: {
                  alt: f_product.name,
                  // isFluidWidth: true,
                  width: 500,
                  height: 500,
                  src: currImg,
                },
                largeImage: {
                  alt: "",
                  src: currImg,
                  width: 1000,
                  height: 1000,
                  sizes:
                    "(width: 800px) 33.5vw, (min-width: 415px) 50vw, 100vw"
                },
                imageClassName: 'object-contain',
                enlargedImageContainerDimensions: {
                  height: 500,
                  width: 500
                },
                enlargedImageContainerClassName: 'bg-white',
                enlargedImageClassName: 'object-contain relative left-[50%] '
                // isHintEnabled: true
              }}
            />

            {/* carousel for images */}
            <div className='relative w-fit'>
              <div className="embla overflow-hidden" ref={images?null:emblaRef}>
                <div className="embla__container flex">
                  {images &&
                    images.map((image,idx)=>(
                      <div key={idx} className={`embla__slide relative `+(image==currImg?' ':' opacity-95')}>
                        <Image 
                          className=' cursor-pointer object-contain' 
                          src={image}
                          height={150}
                          width={150}
                          alt="~"
                          onClick={()=>{setCurrImg(image)}}
                        /> 
                      </div>
                    ))
                  }
                </div>
              </div>
              <button className="embla__prev absolute top-[35%] left-0 bg-pink-200 rounded-full" onClick={scrollPrev}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
              </button>
              <button className="embla__next absolute top-[35%] right-0 bg-pink-200 rounded-full" onClick={scrollNext}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>

          </div>

          {/* options and description */}
          <div className=' pt-12 px-7 md:w-[67%] lg:w-[50%] '>

            {/* product name */}
            <div className="w-full mb-10">
              <h1 className="sm:text-3xl font-medium text-2xl">{f_product.name}</h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:mt-0 ">
              <p className=" text-lg md:text-3xl text-[#149fbee1] opacity-95">{f_product.discount.applicable ?
                <>
                  Rs.
                  <del className=" line-through decoration-[3px] text-gray-400 opacity-90">{f_product.price}</del>&nbsp;
                  <span className=" font-['righteous'] font-semibold">{f_product.discount.newAmount}</span>
                  <span className=' lg:text-[1.4rem] text-base px-3'>{'(' + ((f_product.price - f_product.discount.newAmount) * (100 / f_product.price)).toFixed(2) + '% Off)'}</span>
                </>
                : 'Rs. ' + f_product.price}
              </p>

              <form className="mt-10">
                {/* Colors */}
                <div className='flex items-center'>
                  <span className="text-xl font-semibold text-gray-900 ">Color</span>

                  <RadioGroup value={selectedColorIdx} onChange={setSelectedColorIdx} className=" mx-4 p-2">
                    {/* <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label> */}
                    <div className="flex items-center space-x-3">
                      {f_product.colors.map((color,idx) => (
                        <RadioGroup.Option
                          key={idx}
                          value={idx}
                          className={({checked }) =>(
                            classNames(
                              checked ? 'ring ring-offset-1 ring-sky-400' : '',
                              `-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none`
                            ))
                          }
                          style={{ backgroundColor: `${color.color}` }}
                        >
                            <span className={`h-8 w-8 rounded-full `}></span>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Sizes */}
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900 ">Size</h3>
                  </div>
                  <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                    <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-4">
                      {f_product.sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.size}
                          value={size.size}
                          disabled={!size.inStock}
                          className={({ active }) =>
                            classNames(
                              size.inStock
                                ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                                : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                              active ? 'ring-2 ring-sky-500' : '',
                              'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">{size.size}</RadioGroup.Label>
                              {size.inStock ? (
                                <span
                                  className={classNames(
                                    active ? 'border' : 'border-2',
                                    checked ? 'border-sky-500' : 'border-transparent',
                                    'absolute -inset-px rounded-md pointer-events-none'
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
                                >
                                  <svg
                                    className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              
                {/* add to wishlist */}
                {session && 
                  <div 
                    className={'transition inline-block p-3 mt-5 hover:text-[#149fbee1] hover:underline '+ (wishlist? "" : "  cursor-pointer")}
                    onClick={async ()=>{
                      if(!wishlist){
                        const requestOptions = {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({id: f_product._id})
                        };
                        const response = await fetch(`${process.env.BASE_URL}api/user/addToWishlist`, requestOptions);
                        const data = await response.json();
                        console.log("FETCHED ", data);
                        setWishlist(true);
                      }
                    }}
                  >
                    {wishlist? "Added in Wishlist" :"Add to Wishlist"}
                  </div>
                }

                {/* add to cart */}
                <div
                  onClick={() => {addToCart(f_product); alert('product added to cart');}}
                  // type="submit"
                  className="mt-5 w-full cursor-pointer bg-sky-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  Add to Cart
                </div>
              </form>
            </div>

            {/* Description and details */}
            <div className="py-10 my-7 lg:pt-6 lg:pb-16 lg:border-t lg:border-gray-300 ">
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className=" font-light text-sm text-gray-900">{f_product.description}</p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-xl font-semibold text-gray-900">Highlights</h3>

                <div className="mt-4">
                  <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                    {f_product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-xl font-semibold text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{f_product.details}</p>
                </div>
              </div>
            </div>

          </div>

        </div>
        
        {/* Similar products */}
        <div className="">
          <Products name={f_product.category} heading={" More products of this category"}/>
        </div>
      </div>
    </div>

  )
}

export const getStaticProps = async (context) => {  //can only send JSON or String.. :(
  // console.log("###Context is :", context);
  let data = await ProductsModel.findById(context.params.id);
  let f_product = JSON.stringify(data);
  return {
    props: { f_product }
  }
}

export async function getStaticPaths() {  //can only send JSON or String.. :(

  let all_products = await ProductsModel.find({});

  if (all_products) {
    const ids = all_products.map((product) => product.id)
    const paths = ids.map((id) => ({ params: { id: id.toString() } }))
    // console.log("###paths are :",paths)
    return { paths, fallback: true }
  }

}

