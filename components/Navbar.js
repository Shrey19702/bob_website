import { Fragment, useEffect, useState, useContext } from "react";
import {Disclosure,  Menu,  Transition,  Popover,  Dialog,} from "@headlessui/react";
import {MenuIcon, XIcon } from "@heroicons/react/outline";
import Cart from "./Svgs";
import Image from "next/image";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import {CartContext} from '../components/Cart';

const navigation = [
  { name: "Home", href: "/", current: true },
  // { name: 'Categories'

  //    ,href: '#collection', current: false },
  { name: "Blogs", href: "/blog", current: false },
];

const products = [
  {
    id: 1,
    name: "Bunk Bed",
    href: "#",
    color: "Salmon",
    price: "$780.50",
    quantity: 1,
    imageSrc: "./main.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Bunk Bed",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc: "./main.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  // More products...
];

export default function Navbar() {
  //Cart States
  const {state ,dispatch} = useContext(CartContext); //cart's context
  const [cart, setcart] = useState(state.cart); //cart data
  const [total, setTotal] = useState(0); //subtatal of items
  const [open, setOpen] = useState(false); //Cart's open close state
  //Cart functions
  const handleReduce= (productID, curr_quantity) => {
    console.log('reducing quantity from: ', curr_quantity);
    dispatch({ type: "REDUCE_QUANTITY", productID, curr_quantity});
    setcart(state.cart);
  }
  //Cart's useEffect
  useEffect(()=>{
    setcart(state.cart);
  })
  useEffect(() => {
    const getTotal = () => {
      const res = state.cart.reduce((prev, item) => {
        return prev + (item.price * item.quantity)
      },0)

      setTotal(res)
    }

    getTotal()
  },[cart])


  //Navbar States
  const [colorChange, setColorchange] = useState(false); //colorchange: true->white, false->transparent
  const [cgList, setcgList] = useState(null); //list of collections and their categories
  //cart's sum adder
  // const [sum, setSum] = useState(0);
  //Navbar Functions
  const changeNavbarColor = () => {
    if (
      window.location.pathname !== "/" ||
      window.scrollY >= window.innerHeight - 64
    ) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", changeNavbarColor);
  }
  //Navbar UseEffect
  useEffect(() => {
    (async ()=>{
      if(cgList==null){ //fetch data only if not fetched before
        let response = await fetch(`${process.env.BASE_URL}api/collections/getAllCollections`,{   //fetch all the collections
          method: "GET"
        })
        let CategoriesData = await response.json();
        setcgList(CategoriesData.body);
      }
    })();
    if (typeof window !== "undefined") {
      // console.log(window.location.pathname);
      changeNavbarColor();
    }
    // let adder = 0;
    // products.map(
    //   (x) => (adder += parseFloat(x.price.slice(1, x.price.length)))
    // );
    // setSum(adder.toFixed(2));
    return () => {};
  });

  return (
    <div>
      {/* Cart */}
      <Transition.Root show={open} as="div">
        <Dialog as="div" className="relative z-40" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            {" "}
                            Shopping cart{" "}
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 cursor-pointer hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon
                                className="h-6 w-6 cursor-pointer"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {cart.length==0 && (<div className=" m-auto w-fit py-[20vh] font-semibold">Cart is Empty</div>)}
                              {cart.map((product) => {
                                return (
                                  <li key={product.id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img
                                        src=" "
                                        alt="image here"
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3>
                                            <a href={null}>
                                              {" "}
                                              {product.name}{" "}
                                            </a>
                                          </h3>
                                          <p className="ml-4">
                                            {product.price}
                                          </p>
                                        </div>
                                        {/* <p className="mt-1 text-sm text-gray-500">
                                          {product.color} 
                                        </p> */}
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-gray-500">
                                          Qty {product.quantity}
                                        </p>

                                        <div className="flex">
                                          <button
                                            onClick={() => handleReduce(product.id, product.quantity)}
                                            type="button"
                                            className="font-medium text-sky-600 hover:text-sky-500"
                                          >
                                            {product.quantity>1 ? 'Reduce' : 'Remove'}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>₹{total}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <a
                            href="/checkout"
                            className="flex items-center justify-center rounded-md border border-transparent bg-sky-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sky-700"
                          >
                            Checkout
                          </a>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or{" "}
                            <button
                              type="button"
                              className="font-medium text-sky-600 hover:text-sky-500"
                              onClick={() => setOpen(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Navbar */}
      <Disclosure
        as="nav"
        className={` z-30 ${
          colorChange ? "bg-white shadow-md" : "bg-transparent"
        } fixed w-full transition-all`}
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                {/* Mobile menu button*/}
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button
                    className={`inline-flex items-center justify-center p-2 rounded-md ${
                      colorChange
                        ? "text-gray-800 focus:ring-black"
                        : "text-white focus:ring-white"
                    } focus:outline-none focus:ring-2 focus:ring-inset `}
                  >
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                {/* Left side of navbar */}
                <div className="flex-1 flex items-center justify-start sm:items-stretch ml-8 sm:m-0">
                  <div className="flex-shrink-0 flex items-center">
                    <a href="./">
                      <img
                        className="block h-16 w-auto pointer-events-none"
                        src="/logo.png"
                        alt="LOGO"
                      />
                    </a>
                    {/* <img
                      className="hidden lg:block h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                      alt="Workflow"
                    /> */}
                  </div>
                  <div className="hidden my-auto sm:block sm:ml-6">
                    {/* navigation elements */}
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={
                            (item.current
                              ? " bg-zinc-100 text-gray-800 "
                              : "text-gray-800 hover:bg-zinc-200 ") +
                            "px-3 py-2 rounded-md text-lg font-medium transition"
                          }
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                      {/* categories */}
                      <a className="text-gray-800 peer hover:bg-zinc-200 px-3 py-2 rounded-md text-lg font-medium transition cursor-pointer">
                        <span>Categories</span>
                      </a>
                      {cgList?
                        (<div className={` transition-all hover:grid peer-hover:opacity-100 hover:opacity-100 peer-hover:grid hover:grid-row-${cgList.length-1} overflow-y-auto max-h-[95vh] w-7/12 gap-2 hidden opacity-0 absolute left-0 top-[54px] bg-gray-50 rounded-md shadow-lg py-8 px-10`} >
                          {cgList.map(x=>(
                            <div key={x.name} className="flex items-center  flex-wrap">
                              <a href={`${process.env.BASE_URL}collection/${x.name.replace(/\s+/g, '-')}`} className=" transition w-full text-black p-2 font-bold opacity-95 hover:opacity-100 rounded-lg "><span className="text-xl">{x.name}</span></a>
                              {
                                x.categories.map(y=>(
                                  <a href={`${process.env.BASE_URL}collection/${x.name.replace(/\s+/g, '-')}#${y.replace(/\s+/g, '-')}`} className=" max-w-[50%] transition text-white hover:opacity-90 rounded-3xl text-center bg-sky-300 px-3 py-2 m-2" key={y} ><span>{y}</span></a>
                                ))
                              }
                            </div>
                        ))}
                        </div>)  
                        : ( <div>Loading...</div> )
                      }
                        
                    </div>
                  </div>
                </div>

                {/* right side of navbar */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className=" transition bg-zinc-200 p-2 rounded-full text-gray-800 hover:text-gray-900 hover:bg-zinc-100 focus:outline-none"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <span className="sr-only">User's Cart</span>
                    <Cart />
                  </button>

                  <Userlogin />
                </div>
              </div>
            </div>
            {/* for mobile type  */}
            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={
                      (item.current
                        ? "bg-gray-900 text-white"
                        : colorChange
                        ? "text-gray-900 hover:bg-gray-900 hover:text-gray-100"
                        : "text-white hover:bg-gray-900 hover:text-gray-200") +
                      " block px-3 py-2 rounded-md text-base font-medium"
                    }
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                 <Disclosure.Button
                    key={'Category'}
                    as="a"
                    href='#'
                    className={
                      (colorChange
                        ? "text-gray-900 hover:bg-gray-900 hover:text-gray-100"
                        : "text-white hover:bg-gray-900 hover:text-gray-200") +
                      " block px-3 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Category
                  </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}

function Userlogin() {
  const { data: session, status } = useSession();
  const [providers, setProviders] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    (async ()=>{
      const fetch_data = await fetch(`${process.env.BASE_URL}api/user/getUserByEmail`,{
        method:'POST',
        body: JSON.stringify({email: 'hello'})
      });
      const json_data = await fetch_data.json();
      setUserData(json_data);
    })();
    (async () => {
      const curr_providers = await getProviders();
      setProviders(curr_providers);
    })();
  }, []);

  if (session) {
    //user logged in
    return (
      <>
        {/* Profile dropdown */}
        <Menu as="div" className="ml-3 z-20 relative">
          <Menu.Button className=" z-20 relative bg-gray-800 flex text-sm rounded-full ring-2 ring-white focus:outline-none">
            <span className="sr-only">Open user menu</span>
            <Image
              className=" h-11 w-11 rounded-full pointer-events-none"
              // loader={({src})=>{return session.user.image}}
              src={session.user.image}
              alt="User Image"
              width={44}
              height={44}
              priority
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "/UserOnError.png";
              }}
            />
          </Menu.Button>
          {/*  user pages  */}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-2 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/profile"
                    className={
                      (active ? "bg-gray-100 " : " ") +
                      "block px-4 py-2 text-sm text-gray-800"
                    }
                  >
                    Your Profile
                  </a>
                )}
              </Menu.Item>
              {/* <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={
                      (active ? "bg-gray-100 " : " ") +
                      "block px-4 py-2 text-sm text-gray-800"
                    }
                  >
                    Settings
                  </a>
                )}
              </Menu.Item> */}
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={() => signOut()}
                    className={
                      (active ? "bg-gray-100 " : " ") +
                      "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                    }
                  >
                    Sign out
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </>
    );
  }
  return (
    //user not logged in
    <>
      {/* No user logged in */}
      <Popover className="relative z-20 ml-3">
        {() => (
          <>
            <Popover.Button className="focus-visible:outline-none">
              <div className=" z-20 relative bg-gray-200 hover:bg-gray-100 h-11 w-11 flex justify-center items-center text-sm rounded-full focus:outline-none ">
                <i className="material-icons text-3xl">person_add</i>
                {/* <img
                  className=" h-11 w-11 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                /> */}
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-xs sm:max-w-sm -translate-x-full transform px-4 sm:px-0 ">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-2 bg-white py-4 px-4">
                    {providers &&
                      Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                          <button 
                            onClick={() => signIn(provider.id, { callbackUrl: `${process.env.BASE_URL}api/auth/login-verify`})}
                            className=' text-center sm:text-left w-full rounded-lg px-4 py-4 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none ' 
                          >
                            Sign In with {provider.name}
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
}
