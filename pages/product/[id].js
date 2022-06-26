import { useContext, useState } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import { RadioGroup } from '@headlessui/react'
import Products from '../../models/productModel'
import connectDB from '../../utils/connectDB'
import { CartContext } from '../../components/Cart'
import Image from "next/image"
import ReactImageMagnify from 'react-image-magnify'
// import { useDispatchCart } from "../../components/Cart";
// import img from '../../public/main.jpg'
connectDB();

const reviews = { href: null, average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function products({ f_product }) {
  const { state, dispatch } = useContext(CartContext);
  f_product = JSON.parse(f_product);
  const [selectedColor, setSelectedColor] = useState(f_product.colors[0])
  const [selectedSize, setSelectedSize] = useState(f_product.sizes[0].size)

  const addToCart = (product) => {
    let req_product = state.cart.filter((element) => (element.id == product._id));
    console.log(selectedColor)
    if (req_product.length === 0) { //if this product is not in the cart 
      let productData = {
        id: product._id,
        href: product.href,
        name: product.name,
        image: selectedColor.images[0],
        color: selectedColor.color,
        size: selectedSize,
        price: product.price,
        discount: product.discount,
        quantity: 1
      };
      console.log(productData);
      dispatch({ type: "ADD_NEW", productData });
    }
    else { //this product already exist in the cart
      // let  = (state.cart.filter((element)=> (element.id == product._id)));
      let curr_quantity = req_product[0].quantity;
      let productID = product._id;
      dispatch({ type: "ADD_TO_EXISTING", productID, curr_quantity })
    }
  };
  // console.log(f_product, typeof (f_product));
  const createBreadcrumbs = (product) => {
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
  return (
    <div className="bg-white">
      <div className="py-24">
        <nav aria-label="f_product">
          <ol role="list" className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
            {
              createBreadcrumbs(f_product).map(breadcrumb => {
                if (breadcrumb.id == 3) {
                  return (
                    <li className="text-sm" key={breadcrumb.id}>

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

          {/* product name */}
          <div className="pt-3 my-3 w-full lg:w-[80%] text-center lg:text-left lg:border-r lg:border-gray-200 ">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{f_product.name}</h1>
          </div>

          {/* product image */}
          <div className=" bg-sky-100 h-fit lg:shadow-md select-none shadow-sm ">
            <div className='lg:hidden'>
              <Image
                src={f_product.colors[0].images[0]}
                alt={f_product.colors[0].images[0]}
                className="w-full h-full object-center select-none object-contain"
                height={600}
                width={450}
                priority
              />
            </div>

            <ReactImageMagnify
              className='z-10 hidden lg:block'

              {...{
                smallImage: {
                  alt: f_product.name,
                  isFluidWidth: true,
                  src: f_product.colors[0].images[0],
                  // srcSet: this.srcSet,
                  // sizes:
                  //   "(width: 800px) 33.5vw, (min-width: 415px) 50vw, 100vw"
                },
                largeImage: {
                  alt: "",
                  src: f_product.colors[0].images[0],
                  width: 1200,
                  height: 1200,
                  sizes:
                    "(width: 800px) 33.5vw, (min-width: 415px) 50vw, 100vw"
                },
                enlargedImageContainerDimensions: {
                  height: 500,
                  width: 500
                },
                enlargedImageContainerStyle: {
                  backgroundColor: "rgba(0,0,0,.9)",
                },
                enlargedImageStyle: {
                  marginLeft: "50%"
                }
                // isHintEnabled: true
              }}
            />
          </div>



          {/* options and description */}
          <div className=' md:w-[67%] lg:w-[50%] '>
            {/* Options */}
            <div className="mt-4 mx-12 lg:mt-0 ">
              <p className=" text-lg md:text-3xl text-gray-900">{f_product.discount.applicable ?
                <>
                  <del className=' line-through decoration-[3px] decoration-red-600'>₹{f_product.price}</del>&nbsp;&nbsp;
                  <span className=' font-semibold'>₹{f_product.discount.newAmount}</span>
                  <span className=' lg:text-[1.4rem] text-base px-3'>{'(' + ((f_product.price - f_product.discount.newAmount) * (100 / f_product.price)).toFixed(2) + '% Off)'}</span>
                </>
                : '₹' + f_product.price}</p>


              <form className="mt-10">
                {/* Colors */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 ">Color</h3>

                  <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                    <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {f_product.colors.map((color) => (
                        <RadioGroup.Option
                          key={color.color}
                          value={color.color}
                          className={({ active, checked }) =>
                            classNames(
                              active && checked ? 'ring ring-offset-1 ring-sky-400' : '',
                              !active && checked ? 'ring-2 ring-sky-400' : '',
                              `-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none`
                            )
                          }
                          style={{ backgroundColor: `${color.color}` }}

                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {color.color}
                          </RadioGroup.Label>
                          <span className={`h-8 w-8 bg-${color.color}-400 rounded-full `}>
                          </span>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Sizes */}
                <div className="mt-10">
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

                <div
                  onClick={() => addToCart(f_product)}
                  // type="submit"
                  className="mt-10 w-full cursor-pointer bg-sky-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  Add to Cart
                </div>
              </form>
            </div>

            {/* Description and details */}
            <div className="py-10 lg:pt-6 lg:pb-16 mx-4 lg:border-r lg:border-gray-200 lg:ml-16 ">
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
        <div className=""></div>
      </div>
    </div>

  )
}

export const getStaticProps = async (context) => {  //can only send JSON or String.. :(
  // console.log("###Context is :", context);
  let data = await Products.findById(context.params.id);
  let f_product = JSON.stringify(data);
  return {
    props: { f_product }
  }
}

export async function getStaticPaths() {  //can only send JSON or String.. :(

  let all_products = await Products.find({});

  if (all_products) {
    const ids = all_products.map((product) => product.id)
    const paths = ids.map((id) => ({ params: { id: id.toString() } }))
    // console.log("###paths are :",paths)
    return { paths, fallback: true }
  }

}

