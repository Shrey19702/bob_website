import { useState } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import { RadioGroup } from '@headlessui/react'
import Products from '../../models/productModel'
import connectDB from '../../utils/connectDB'
// import img from '../../public/main.jpg'
connectDB();


const reviews = { href: null, average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}






export default function products({ f_product }) {

  f_product = JSON.parse(f_product);
  // console.log(f_product, typeof (f_product));


  const createBreadcrumbs = (product) => {
    let breadcrumb = [];
    breadcrumb.push({
      id: 1,
      name: product.collections,
      href: `/${product.collections}`
    })
    breadcrumb.push({
      id: 2,
      name: product.category,
      href: `/${product.collection}#${product.category}`
    })
    breadcrumb.push({
      id: 3,
      name: product.name,
      href: `/products/${product._id}`
    })

    return (breadcrumb);
  }


  const [selectedColor, setSelectedColor] = useState(f_product.colors[0])
  const [selectedSize, setSelectedSize] = useState(f_product.sizes[2])

  return (
    <div className="bg-white">
      <div className="pt-24">
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
        <div className="mt-3 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">

          {/* product name */}
          <div className="pt-3 my-3 lg:col-start-1 lg:col-span-3 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{f_product.name}</h1>
          </div>

          {/* product image */}
          <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
            <img
              src={f_product.images.src}
              alt={f_product.images.alt ? f_product.image.alt : "no image"}
              className="w-full h-full object-center object-cover"
            />
          </div>

          {/* Description and details */}
          <div className="py-10 lg:pt-6 lg:pb-16 lg:border-r lg:border-gray-200 lg:pr-8">
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{f_product.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

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
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{f_product.details}</p>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="mt-4 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">₹{f_product.price}</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm text-gray-900 font-medium">Color</h3>

                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {f_product.colors.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedClass,
                            active && checked ? 'ring ring-offset-1' : '',
                            !active && checked ? 'ring-2' : '',
                            '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                          )
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only">
                          {color.name}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.class,
                            'h-8 w-8 border border-black border-opacity-10 rounded-full'
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-gray-900 font-medium">Size</h3>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Size guide
                  </a>
                </div>

                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {f_product.sizes.map((size) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={({ active }) =>
                          classNames(
                            size.inStock
                              ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                              : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                            active ? 'ring-2 ring-indigo-500' : '',
                            'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                            {size.inStock ? (
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked ? 'border-indigo-500' : 'border-transparent',
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

              <button
                type="submit"
                className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add to Cart
              </button>
            </form>
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

