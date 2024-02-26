import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image";

const Wishlist = ()=>{
    const { data: session, status } = useSession();
    const [list, setList] = useState(null);
    
    useEffect(()=>{
      // console.log('CURRENT STATUS IS ',status);
      (async ()=>{
        if(status=='authenticated' && !list){
          let response = await fetch(`${process.env.BASE_URL}api/user/getWishlistProducts`, {method:'GET'});
          let res_data = await response.json();
          setList(res_data.body);
        }
      })();
    });
    if(status=='loading'){
      return(
        <div className="bg-white">
          <div className="py-96 text-center text-2xl font-semibold">
            Loading...
          </div>
        </div>
      )
    }
    if(status=='authenticated'){
      if(list){ 
        return(
          <>
            <div className="bg-white">
              {list.length==0 && 
                <div className="py-56 text-center text-2xl font-semibold">
                  Wishlist is Empty
                </div>
              }
              <div className=" max-w-2xl mx-auto py-28 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  {list.map((product, idx) => (
                    <div key={idx}>
                      <div className="transition rounded-sm group relative shadow-sm hover:shadow-sm px-2 py-4">
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
                                  <del className=' line-through decoration-[2px] text-black decoration-red-600 font-light'>{product.price}</del>&nbsp;&nbsp;
                                  <span className=' font-semibold'>{product.discount.newAmount}</span>
                                </>
                              ) : product.price }
                          </p>
                        </div>
                      </div>
                      <div
                        onClick={async ()=>{
                          // console.log(product);
                          let response = await fetch(`${process.env.BASE_URL}api/user/removeFromWishlist`,
                            { 
                              method:'DELETE',
                              body:JSON.stringify({id: product._id})
                            }
                          );
                          let res = await response.json();
                          console.log(res);
                          if(res.success){
                            let newlist = [...list];
                            newlist = newlist.filter((p, i)=>(i!=idx));
                            setList(newlist);
                          }
                        }}
                        className=" bg-slate-300 transition cursor-pointer w-full text-center rounded-md p-2 mt-4 shadow-gray-600 hover:shadow-md hover:opacity-95"
                      >
                        Remove from WishList
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
          // <div className="py-96 text-2xl font-semibold">
          //   DATA LOADED {list.length}
          // </div>
        )
      }
      else if(session){
        return(
          <div className="bg-white">
            <div className="py-96 text-center text-2xl font-semibold">
              Loading...
            </div>
          </div>
        )
      }
    }
    else{
      return(
        <div className="bg-white">
          <div className="py-96 text-center text-2xl font-semibold">
            NO USER LOGGED IN
          </div>
        </div>
      )
    }
}
export default Wishlist