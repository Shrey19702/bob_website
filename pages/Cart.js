import React, { useContext, useEffect, useState } from "react";
import { CartContext } from '../components/Cart'

export default function Store() {

  const { state, dispatch } = useContext(CartContext);
  const [cart, setcart] = useState(state.cart);
  const [total, setTotal] = useState(0);
  //   const items = state.products;

  const handleRemove = (productID) => {
    dispatch({ type: "REMOVE", productID });
    setcart(state.cart);
  };
  const handleReduce = (productID, curr_quantity) => {
    console.log('reducing quantity from: ', curr_quantity);
    dispatch({ type: "REDUCE_QUANTITY", productID, curr_quantity });
    setcart(state.cart);
  }
  useEffect(() => {
    console.log("Hello F");
    setcart(state.cart);
  })

  useEffect(() => {
    const getTotal = () => {
      const res = state.cart.reduce((prev, item) => {
        return prev + (item.price * item.quantity)
      }, 0)

      setTotal(res)
    }
    getTotal()
  }, [cart])

  if (cart.length === 0) {
    return (
      <div className="p-96 font-semibold">
        <p>Cart is empty</p>
      </div>
    );
  }
  else {
    return (
      <div className="py-40 font-semibold">
        {cart.map((item, index) => (
          <div className="p-10" key={index}>
            <div>{item.name}</div>
            <div>{item.price}</div>
            <div>{item.quantity}</div>
            <div>{item.id}</div>
            <button className=" bg-slate-400 p-5 m-5" onClick={() => handleReduce(item.id, item.quantity)}>Reduce from Cart</button>
            <button className=" bg-slate-400 p-5 m-5" onClick={() => handleRemove(item.id)}>Remove from cart</button>
          </div>
        ))}
        <div className="p-12 font-semibold bg-teal-300">
          Total = {total}
        </div>
      </div>
    );
  }
}
