import { useEffect, useState } from "react"

const wishList = ()=>{
    const [product, setProduct] = useState(null);
     
     const getProduct = async()=>{
          const data = await fetch(`${process.env.BASE_URL}api/user/getWishList`);
          const rand = await data.json();
          setProduct(rand.body);
          console.log(rand.body);
        }
        useEffect(()=>{
            if(!product)
            getProduct();
     })

    return(
        <div className=" py-20">
        {
        product&&product.map((x,idx)=>(
            <>
              {
                idx
              }
            </>
        ))
        }
        </div>
    )
}
export default wishList