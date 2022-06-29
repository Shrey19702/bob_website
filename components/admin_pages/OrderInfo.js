import { useEffect, useState } from "react"

const OrderInfo = ()=>{
    const [orders, setOrders] = useState(null);
    const [completion, setCompletion] = useState([]);
    const order_info = async ()=>{
        const request = await fetch(`${process.env.BASE_URL}api/orders/getAllOrders`);
        const data = await request.json();
        // console.log("orderdata: ",data);
        setOrders(data.body);
        let x = data.body.map((order)=>(order.completion));
        console.log(x);
        setCompletion(x);
    }
    useEffect(()=>{
        if(!orders)
            order_info();
    },[])
    return(
        <>
            <div className="flex flex-wrap w-full flex-col">
                <div className=" text-3xl font-semibold w-full h-fit">order info</div>
                <ul className="bg-white rounded-lg shadow-sm border border-gray-200 w-full text-gray-900 mt-4">
                    {orders && (
                        orders.map((order, idx)=>(
                            <li key={idx} className=" p-4 m-2 shadow-sm border rounded-md flex">
                                <form className="w-full">
                                    <div className="w-full flex">
                                        <div className=" grow mx-2 my-4 flex flex-col justify-start gap-6">
                                            <div> <span className=" text-lg font-semibold mr-2">Name:</span> {order.user.name}</div>
                                            <div> <span className=" text-lg font-semibold mr-2">Address:</span> {order.user.address}</div>
                                            <div> <span className=" text-lg font-semibold mr-2">Phone No:</span> {order.user.number}</div>
                                        </div>
                                        <div className="grow m-2 flex flex-col gap-3 ">
                                            <select 
                                                className="rounded-md" 
                                                value={completion[idx]} 
                                                onChange={(e)=>{
                                                    let x = [...completion];
                                                    x[idx] = e.target.value;
                                                    setCompletion(x);
                                                }} 
                                            >
                                                <option value="Order Placed">Order Placed</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                            <div> <span className="text-lg font-semibold px-2">Bill :</span> ₹ {order.bill}</div>
                                            <div className="flex flex-col">
                                                <span className="text-xl font-semibold" >Products</span>
                                                {order.products.map((product, i)=>(
                                                    <div key={i} className='flex justify-between gap-10 px-4 py-2'>
                                                        <div>{i+1}.</div>
                                                        <div>{product.current_product.name}</div>
                                                        <div>Qnt- {product.quantity}</div>
                                                        <div>₹{product.price}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        disabled={(order.completion==completion[idx]?true:false)} 
                                        className=" transition hover:opacity-95 mx-[45%] my-4 bg-slate-600 text-white px-4 py-2 rounded-md disabled:bg-transparent disabled:text-slate-600 disabled:border-2 disabled:border-slate-600 "
                                        onClick={async(e)=>{
                                            e.preventDefault();
                                            const requestOptions = {
                                                method: 'Post',
                                                body: JSON.stringify({id: order.id, completion: completion[idx]})
                                            };
                                            let response = await fetch(`${process.env.BASE_URL}api/orders/updateOrderCompletion`, requestOptions);
                                            let res_body = await response.json();
                                            alert(res_body.message);
                                        }} 
                                    >UPDATE</button>

                                </form>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </>
    )
}

export default OrderInfo