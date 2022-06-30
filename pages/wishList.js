import { useEffect, useState } from "react"

const wishList = ()=>{
    const [product, setProduct] = useState(null);
     
     const getProduct = async()=>{
          const response = await fetch(`${process.env.BASE_URL}api/user/getWishList`);
          const res = await response.json();
          setProduct(res.body);
          console.log(res.body);
        }
        useEffect(()=>{
            if(!product)
            getProduct();
     })

    return(
        <div className=" py-20">
        {product && 
          product.map((x,idx)=>(
            <>
              {idx}
            </>
          ))
        }
        </div>
    )
}
export default wishList