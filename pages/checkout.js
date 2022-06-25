import React, {useContext, useEffect, useState } from "react";
import { useSession} from "next-auth/react"
import { CartContext } from "../components/Cart";
import { data } from "autoprefixer";



const Ordersum = () => {
  const {state ,dispatch} = useContext(CartContext); 
//   const [name,setName] = useState("");
//   const [email,setEmail] = useState("");
//   const [contact,setContact] = useState("");
//   const [avatar ,setAvatar] = useState("");
//   const [address,setAddress] = useState("");
//   const [shippingAddress,setShippingAddress] = useState("");
  const [total, setTotal] = useState(null);

//  const [mainData,setMainData] = useState({
//     name:" ",
//     email:"",
//     contact:" ",
//     avatar:" ",
//     address:" ",
//     shippingAddress:" ",
//  })
const [mainData,setMainData] = useState(null)


    const { data: session, status } = useSession();
    const [cart , setCart] = useState(null);
      
   const getCart = ()=>{
    dispatch({type:"GET_FROM_LOCALSTORAGE"});
     const data = state.cart;
          setCart(data);
   }
   
   const validate = async () => {
    if(session)
    {
        const data = await fetch(`${process.env.BASE_URL}api/user/getUserByEmail`, {
            method: "POST",
            body: JSON.stringify({
                email: session.user.email
            })
        }); 
      let  foundUser = await data.json();
     let x = {...foundUser.body};
     x.shippingAddress = foundUser.body.address;
    //   setName(foundUser.body.name);
    //   setEmail( foundUser.body.email);
    //  setContact( foundUser.body.number);
    //  setAvatar(foundUser.body.avatar);
    //  setAddress(foundUser.body.address);
    //  setShippingAddress(foundUser.body.address);
     setMainData(x);
    }
}
  
const getTotal = () => {
    const res = state.cart.reduce((prev, item) => {
      return prev + (item.price * item.quantity)
    },0)

    setTotal(res)

  }


    useEffect(()=>{

        console.log("useEffect worked",cart);
        if(!cart)
        {getCart();}

        if(!mainData)
        validate();
        
        if(!total)
        getTotal()
     
    })


    
console.log(mainData,"fjfjffjjfjf")
      
    const initializeRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";

        script.onload = () => {
        resolve(true);
        };
        script.onerror = () => {
        resolve(false);
        };

        document.body.appendChild(script);
    });
    };

    const makePayment = async (name,email,contact) => {
    const res = await initializeRazorpay();

    if (!res) {
        alert("Razorpay SDK Failed to load");
        return;
    }

    // Make API call to the serverless API
    const data = await fetch("/api/razorpay", { method: "POST" , body: JSON.stringify({amount:500000}) }).then((t) =>
        t.json()
    );

    // console.log(data,mainData);
    var options = {
        key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        name: "Baby On Board",
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        description: "ThankYou for shopping with Us",
        image: "/logo_img.png",
        handler: function (response) {
        // Validate payment at server - using webhooks is a better idea.
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
        },
        prefill: {
        name: name,
        email: email,
        contact:contact,
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    };
  
     

 

    return (
        <div className="py-16 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start item-start space-y-2 mt-4` flex-col ">
                <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">Checkout</h1>
                <p className="text-base font-medium leading-6 text-gray-600">date</p>
            </div>
            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    {/* Cart */}
                    <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                        <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Cart</p>
                            {/* MAP form here */}
                        
                           {
                            cart&&
                            cart.map((x,idx)=>(
                                <div key={idx} className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                                <div className="pb-4 md:pb-8 w-full md:w-40">
                                    <img className="w-full hidden md:block" src="https://i.ibb.co/84qQR4p/Rectangle-10.png" alt="dress" />
                                    {/* <img className="w-full md:hidden" src="https://i.ibb.co/L039qbN/Rectangle-10.png" alt="dress" /> */}
                                </div>
                                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                                        <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">{x.name}</h3>
                                    </div>
                                    <div className="flex justify-between space-x-8 items-start w-full">
                                        <p className="text-base xl:text-lg leading-6">
                                        ₹ {x.price}<span className="text-red-300 line-through"></span>
                                        </p>
                                        <p className="text-base xl:text-lg leading-6">
                                         Qty = {x.quantity}
                                        </p>
                                        {/* <p className="text-base xl:text-lg leading-6 text-gray-800">01</p> */}
                                        <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">₹{(x.price) * (x.quantity)}</p>
                                      
                                    </div>
                                </div>
                            </div>
                            ))
                           }
                        
                    </div>
                    {/* summary */}
                    <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                            <h3 className="text-xl font-semibold leading-5 text-gray-800">Summary</h3>
                            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                <div className="flex justify-between  w-full">
                                    <p className="text-base leading-4 text-gray-800">Subtotal</p>
                                    <p className="text-base leading-4 text-gray-600">{total}</p>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base leading-4 text-gray-800">
                                        Discount
                                    </p>
                                    <p className="text-base leading-4 text-gray-600">-$28.00 (50%)</p>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base leading-4 text-gray-800">Shipping</p>
                                    <p className="text-base leading-4 text-gray-600">$8.00</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                                <p className="text-base font-semibold leading-4 text-gray-600">$36.00</p>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    );
};

export default Ordersum;
