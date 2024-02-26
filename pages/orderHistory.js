import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image";

const orderHistory = () => {
  const { data: session, status } = useSession();
  const [list, setList] = useState(null);

  useEffect(() => {
    // console.log('CURRENT STATUS IS ',status);
    (async () => {
      if (status == 'authenticated' && !list) {
        let response = await fetch(`${process.env.BASE_URL}api/orders/getUsersOrders`, { method: 'GET' });
        let res_data = await response.json();
        //   setList(res_data.body);
        console.log(res_data);
        setList(res_data.body);
      }
    })();
  });
  if (status == 'loading') {
    return (
      <div className="bg-white">
        <div className="py-96 text-center text-2xl font-semibold">
          Loading...
        </div>
      </div>
    )
  }
  if (status == 'authenticated') {
    if (list) {
      return (
        <>
          <div className="bg-white">
            {list.length == 0 &&
              <div className="py-56 text-center text-2xl font-semibold">
                Order History is Empty
              </div>
            }
            <div className="py-96 text-center text-2xl font-semibold">
              length = {list.length}
            </div>
          </div>
        </>
      )
    }
    else if (session) {
      return (
        <div className="bg-white">
          <div className="py-96 text-center text-2xl font-semibold">
            Loading...
          </div>
        </div>
      )
    }
  }
  else {
    return (
      <div className="bg-white">
        <div className="py-96 text-center text-2xl font-semibold">
          NO USER LOGGED IN
        </div>
      </div>
    )
  }
}
export default orderHistory