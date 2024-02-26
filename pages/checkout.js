import React, { useContext, useEffect, useState } from "react";
import { useSession, signIn} from "next-auth/react"
import { CartContext } from "../components/Cart";
import { data } from "autoprefixer";
import Image from "next/image"


const Ordersum = () => {
    const { state, dispatch } = useContext(CartContext);
    const { data: session, status } = useSession();
    const [cart, setCart] = useState(null);

    const [total, setTotal] = useState(0);
    const [discounted, setDiscounted] = useState(0); 
    const [curr_date, setCurr_date] = useState();
    const [mainData, setMainData] = useState(null)
    // let curr_date = new Date();

    const validate = async () => {
        let x = new Date();
        setCurr_date(`${x.getDate()}/${x.getMonth()+1}/${x.getFullYear()}`);
        if (session) {
            const data = await fetch(`${process.env.BASE_URL}api/user/getUserByEmail`, {
                method: "POST",
                body: JSON.stringify({
                    email: session.user.email
                })
            });
            let foundUser = await data.json();
            let x = { ...foundUser.body };
            x.shippingAddress = foundUser.body.address;
            setMainData(x);
        }
    }

    useEffect(()=>{
        setCart(state.cart);
    })
    useEffect(() => {
        const getTotal = () => {
            const resTotal = state.cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)
    
            const resDiscounted = state.cart.reduce((prev, item) => {
            if(item.discount.applicable){
                return prev + (item.discount.newAmount * item.quantity);
            }
            else{
                return prev + (item.price * item.quantity);
            }
            },0)
            
            setTotal(resTotal);
            setDiscounted(resDiscounted); 
        }
        getTotal()
      },[cart])
    useEffect(() => {
        if (!mainData)
            validate();
    });

    //Payment functions
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
    const makePayment = async (name, email, contact) => {
        const res = await initializeRazorpay();

        if (!res) {
            alert("Razorpay SDK Failed to load");
            return;
        }

        // Make API call to the serverless API
        const data = await fetch("/api/razorpay", { method: "POST", body: JSON.stringify({ amount: discounted+100 }) }).then((t) =>
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
            handler: async function (response) {
                let products = cart.map((product)=>{
                    let amount=0;
                    if(product.discount.applicable)
                        amount = product.discount.applicable;
                    else
                        amount = product.price;

                    return {
                        productId: product.id,
                        quantity: product.quantity,
                        price: amount
                    }
                });
                let requestOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        response: response,
                        NewOrder: {
                            completion: 'Order Placed',
                            userId: mainData._id,
                            products: products,
                            bill: Number(discounted),
                        }
                    }),
                };
                let data = await fetch(`${process.env.BASE_URL}api/auth/verify-payment`, requestOptions);
                let res_data = await data.json();

                dispatch({ type: "EMPTY_CART"});
                alert('Payment complete');
                console.log(res_data);
            },
            prefill: {
                name: name,
                email: email,
                contact: contact,
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    if(!cart || cart.length==0){
        return(
            <div className="py-96 text-center font-semibold text-2xl ">
                NO ITEMS IN CART
            </div>
        )
    }
    else
    return (
        <div className="py-16 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start item-start space-y-2 mt-6 flex-col ">
                <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">Checkout</h1>
                <p className="text-base font-medium leading-6 text-gray-600">date: {curr_date}</p>
            </div>
            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    {/* Cart */}
                    <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                        <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Cart</p>
                        {/* MAP form here */}

                        {
                            cart &&
                            cart.map((x, idx) => (
                                <div key={idx} className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                                    <div className="pb-4 md:pb-8 w-full md:w-40">
                                        <Image
                                            src={x.image}
                                            alt={x.name}
                                            className="w-full h-full hidden md:block object-center select-none object-contain"
                                            height={150}
                                            width={150}
                                            priority
                                        />
                                    </div>
                                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                                            <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">{x.name}</h3>
                                        </div>
                                        <div className="flex justify-between space-x-8 items-start w-full">
                                            <p className="text-base xl:text-lg leading-6">
                                            {x.discount.applicable? 
                                              <>
                                                <del className=' line-through decoration-[3px] decoration-red-600 font-semibold'>₹{x.price}</del>&nbsp;&nbsp;
                                                <span className=' font-semibold'>₹{x.discount.newAmount}</span>
                                              </>
                                            :'₹'+product.price }
                                                {/* ₹ {x.price}<span className="text-red-300 line-through"></span> */}
                                            </p>
                                            <p className="text-base xl:text-lg leading-6">
                                                Qty - {x.quantity}
                                            </p>
                                            {/* <p className="text-base xl:text-lg leading-6 text-gray-800">01</p> */}
                                            <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">₹{x.discount.applicable?((x.discount.newAmount)*(x.quantity)):((x.price)*(x.quantity))}</p>

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
                                    <p className="text-base leading-4 text-gray-600">₹{discounted}</p>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base leading-4 text-gray-800">
                                        Discount
                                    </p>
                                    <p className="text-base leading-4 text-gray-600">-₹{total-discounted} {'('+((total-discounted)*(100/total)).toFixed(2)+'%)'}</p>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base leading-4 text-gray-800">Shipping</p>
                                    <p className="text-base leading-4 text-gray-600">₹100</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                                <p className="text-base font-semibold leading-4 text-gray-600">₹{discounted+100}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* customer */}
                {status=="authenticated"? (mainData &&
                    <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
                        <h3 className="text-xl font-semibold leading-5 text-gray-800">Customer</h3>
                        <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                            <div className="flex flex-col justify-start items-start flex-shrink-0">
                                <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                    <Image
                                        className=" h-11 w-11 rounded-full pointer-events-none"
                                        src={session.user.image}    alt="User Image"
                                        width={44} height={44}
                                        priority
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null;
                                            currentTarget.src = "/UserOnError.png";
                                        }}
                                    />
                                    <div className=" flex justify-start items-start flex-col space-y-2">
                                        <p className="text-base font-semibold leading-4 text-left text-gray-800">{mainData.name}</p>
                                        {/* <p className="text-sm leading-5 text-gray-600">10 Previous Orders</p> */}
                                    </div>
                                </div>

                                <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M3 7L12 13L21 7" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <p className="select-all text-sm leading-5 text-gray-800">{mainData.email}</p>

                                </div>
                                {/* <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M3 7L12 13L21 7" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <input className="w-48 lg:w-full xl:w-48 text-center rounded-md md:text-left text-sm leading-5 text-gray-600" 
                                        type="tel"
                                        required
                                        name="contact"
                                        value={mainData.contact} 
                                        onChange={(e) => {
                                            let x = { ...mainData }
                                            x.contact = e.target.value;
                                            setMainData(x);
                                        }}
                                    />
                                </div> */}
                            </div>
                            <div className="flex justify-between xl:h-full items-stretch w-full flex-col my-3 md:mt-0">
                                <form onSubmit={(e) => { 
                                    e.preventDefault();
                                    makePayment(mainData.name, mainData.email, mainData.contact);
                                }}>
                                    <div className="flex w-full justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-6 xl:space-x-0 space-y-4 xl:space-y-8 md:space-y-0 md:flex-row  items-center md:items-start ">
                                        
                                        <div className="flex w-full justify-center md:justify-start  items-center md:items-start flex-col ">
                                            <p className="text-base font-semibold leading-4 mt-6 pb-2 text-center md:text-left text-gray-800">Shipping Address</p>
                                            <textarea className="w-full text-center rounded-md md:text-left text-sm leading-5 text-gray-600" 
                                                required
                                                name="Shipping-Address"
                                                value={mainData.shippingAddress}
                                                onChange={(e) => {
                                                    let x = { ...mainData }
                                                    x.shippingAddress = e.target.value;
                                                    setMainData(x);
                                                }}
                                            />
                                        </div>
                                        <div className="flex w-full justify-center md:justify-start  items-center md:items-start flex-col ">
                                            <p className="text-base font-semibold leading-4 mt-6 pb-2 text-center md:text-left text-gray-800">Billing Address</p>
                                            {/* <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">180 North King Street, Northhampton MA 1060</p> */}
                                            <textarea className="w-full text-center rounded-md md:text-left text-sm leading-5 text-gray-600"  
                                                required
                                                name="Billing-Address" 
                                                value={mainData.address}
                                                onChange={(e) => {
                                                let x = { ...mainData }
                                                x.address = e.target.value;
                                                setMainData(x);
                                            }} />
                                        </div>
                                    </div>
                                    <div className="flex w-[100%] justify-center items-center mt-10  md:justify-start md:items-start">
                                        <input
                                            type="submit" 
                                            value="Pay Now"
                                            className=" cursor-pointer mt-6 md:mt-0 py-5 rounded-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>)
                    :
                    <div className="bg-gray-50 w-full xl:w-96 flex flex-col justify-center items-center px-4 py-6 md:p-6 xl:p-8 "> 
                        <h1 className=" text-xl py-8">USER NOT SIGNED IN</h1>
                        <button className="w-64 flex justify-center items-center text-xl bg-sky-200 p-6 h-4 border-black border-2 hover:bg-blue-300 transition duration-300" onClick={() => signIn()}>Sign in</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default Ordersum;
