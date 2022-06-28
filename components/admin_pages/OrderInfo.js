import { useEffect, useState } from "react"

const OrderInfo = ()=>{
    const [orders, setOrders] = useState(null);
    const order_info = async ()=>{
        const request = await fetch(`${process.env.BASE_URL}api/orders/getAllOrders`);
        const data = await request.json();
        console.log("orderdata: ",data);
        setOrders(data.body);
    }
    useEffect(()=>{
        if(!orders)
            order_info();
    },[])
    return(
        <>
            <div className=" text-lg font-semibold">order info</div>
            <ul className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
                {orders && (
                    orders.map((order, idx)=>(
                        <li key={idx} className="flex">
                            <div className="px-6 py-2 border-b border-gray-200 w-[50%] rounded-t-lg">{order.completion}</div>
                            <div className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">{order.bill}</div>
                            <button type="button" className="my-4 h-3">Hello</button> 
                        </li>
                    ))
                )}
            </ul>
        </>
    )
}

export default OrderInfo