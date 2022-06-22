import React, { useReducer, useContext, createContext, useEffect} from "react";

export const CartContext = createContext();
// const CartDispatchContext = createContext();

const reducer = (state, action) => {
  let clone = state;

  switch (action.type) {
    case "ADD_NEW": //add new product
      // clone = state;
      let found = clone.cart.find((element)=>(element.id===action.productData.id)); //check if it already existed
      if(!found)
        clone.cart = [...state.cart, action.productData]
      localStorage.setItem('Cart',  JSON.stringify(clone));
      return clone;

    case "ADD_TO_EXISTING": //inc. quantity of a product 
      // clone = state;
      // console.log("current quantity= ",action.curr_quantity);
      clone.cart.forEach((element)=>{
        if( (element.id == action.productID) && (element.quantity == action.curr_quantity) ){ //inc. only if it has same id and same quanitiy was there
          element.quantity+=1;
          // console.log(element.quantity);
        }
      })
      localStorage.setItem('Cart',  JSON.stringify(clone));
      return clone;

    case "REDUCE_QUANTITY": //dec. quantity of a product
      // clone = state;
      clone.cart.forEach((element)=>{
        if( (element.id == action.productID) && (element.quantity == action.curr_quantity) ){ //dec. only if it has same id and same quanitiy was there
          element.quantity-=1;
          // console.log(element.quantity);
        }
      })
      clone.cart = clone.cart.filter((element)=>(element.quantity>0));
      localStorage.setItem('Cart',  JSON.stringify(clone));
      return clone;

    case "REMOVE":
      console.log('removing element');
      // clone = state;
      let newArr = clone.cart.filter((element)=> element.id !== action.productID )
      clone.cart = newArr;
      // console.log('## Removing product of ID: ', action.productID);
      localStorage.setItem('Cart', JSON.stringify(clone));
      return clone;
    
    case "GET_FROM_LOCALSTORAGE":
      // console.log("getting data from localstorage");
      let data = JSON.parse(localStorage.getItem('Cart'));
      return data;

    default:
      throw new Error(`unknown action ${action.type}`);
  }
};

export const CartProvider = ({ children }) => {
  const initial_state = {
    cart: []
  };

  useEffect(()=>{
    if(localStorage.getItem('Cart'))
        dispatch({type: "GET_FROM_LOCALSTORAGE"});
  },[])

  const [state, dispatch] = useReducer(reducer, initial_state);

  return (
      <CartContext.Provider value={{state,dispatch}}>
        {children}
      </CartContext.Provider>
  );
};

// export const useCart = () => useContext(CartStateContext);
// export const useDispatchCart = () => useContext(CartDispatchContext);
