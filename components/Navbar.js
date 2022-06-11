import { Fragment, useEffect, useState, useRef} from 'react'
import { Disclosure, Menu, Transition, Popover, Dialog  } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import Cart from './Svgs'
<<<<<<< HEAD
import Head from 'next/head'
import Link from 'next/link'
=======

import { useSession, signIn, signOut, getProviders } from 'next-auth/react'
>>>>>>> a6338c388bf8a9eda5f1a302205d4e38f4b24365

const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Categories', href: '#', current: false },
  { name: 'Blog', href: '#', current: false },
]

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
]


export default function Navbar() {
  //colorchange: true->white, false->transparent
  const [colorChange, setColorchange] = useState(false);
  const [open, setOpen] = useState(false);
  
  const changeNavbarColor = () =>{
      if(window.scrollY >= (window.innerHeight-64)){
        setColorchange(true);
      }
      else{
        setColorchange(false);
      }
  };

  if (typeof window !== "undefined") {
      window.addEventListener('scroll', changeNavbarColor);
  }

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
                            <Dialog.Title className="text-lg font-medium text-gray-900"> Shopping cart </Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                            <button
                                type="button"
                                className="-m-2 p-2 text-gray-400 cursor-pointer hover:text-gray-500"
                                onClick={() => setOpen(false)}
                            >
                                <span className="sr-only">Close panel</span>
                                <XIcon className="h-6 w-6 cursor-pointer" aria-hidden="true" />
                            </button>
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {products.map((product) => (
                                <li key={product.id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                        src={product.imageSrc}
                                        alt={product.imageAlt}
                                        className="h-full w-full object-cover object-center"
                                    />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                            <a href={product.href}> {product.name} </a>
                                        </h3>
                                        <p className="ml-4">{product.price}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-gray-500">Qty {product.quantity}</p>

                                        <div className="flex">
                                        <button
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            Remove
                                        </button>
                                        </div>
                                    </div>
                                    </div>
                                </li>
                                ))}
                            </ul>
                            </div>
                        </div>
                        </div>

                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>$262.00</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                            <a
                            href="#"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                            Checkout
                            </a>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                            or{' '}
                            <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={() => setOpen(false)}
                            >
                                Continue Shopping<span aria-hidden="true"> &rarr;</span>
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
      <Disclosure as="nav" className={` z-30 ${colorChange?'bg-white shadow-md':'bg-transparent'} fixed w-full transition-all`}>
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                {/* Mobile menu button*/}
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className={`inline-flex items-center justify-center p-2 rounded-md ${colorChange? 'text-gray-800 focus:ring-black' :'text-white focus:ring-white'} focus:outline-none focus:ring-2 focus:ring-inset `}>
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
                    <img
                      className="block h-16 w-auto pointer-events-none"
                      src="/logo.png"
                      alt="LOGO"
                    />
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
                            (item.current ? ' bg-zinc-100 text-gray-800 ' :  'text-gray-800 hover:bg-zinc-200 ')+
                            'px-3 py-2 rounded-md text-lg font-medium transition'
                          }
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className=''></div>

                {/* right side of navbar */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className=" transition bg-zinc-200 p-2 rounded-full text-gray-800 hover:text-gray-900 hover:bg-zinc-100 focus:outline-none"
                    onClick={()=>{setOpen(true)}}
                  >
<<<<<<< HEAD
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-2 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link href="/profile">
                          <a className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-800')}>
                            Your Profile
                          </a>
                          </Link>
                          
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-800')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
=======
                    <span className="sr-only">User's Cart</span>
                    <Cart />
                  </button>
                  
                  <Userlogin/>

                </div>
>>>>>>> a6338c388bf8a9eda5f1a302205d4e38f4b24365
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
                      (item.current ? ('bg-gray-900 text-white') : (colorChange? 'text-gray-900 hover:bg-gray-900 hover:text-gray-100' :'text-white hover:bg-gray-900 hover:text-gray-200'))
                      +' block px-3 py-2 rounded-md text-base font-medium'
                    }
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}

function Userlogin() {
  const { data: session , status } = useSession()
  const [providers, setProviders] = useState();

  useEffect( 
    ()=>{
      (
        async()=>{
          const curr_providers = await getProviders();
          setProviders(curr_providers);
        }
      )
      ();
  },[]);

  if (session) { //user logged in
    return (
    <>
      {/* Profile dropdown */}

      <Menu as="div" className="ml-3 z-20 relative">
        <Menu.Button className=" z-20 relative bg-gray-800 flex text-sm rounded-full ring-2 ring-white focus:outline-none">
          <span className="sr-only">Open user menu</span>
          <img
            className=" h-11 w-11 rounded-full pointer-events-none"
            src={session.user.image}
            alt="User Image"
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
                  href="#"
                  className={(active ? 'bg-gray-100 ' : ' ')+ 'block px-4 py-2 text-sm text-gray-800'}
                >
                  Your Profile
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={(active ? 'bg-gray-100 ' : ' ')+ 'block px-4 py-2 text-sm text-gray-800'}
                >
                  Settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => signOut()}
                  className={(active ? 'bg-gray-100 ' : ' ')+ 'block px-4 py-2 text-sm text-gray-700 cursor-pointer'}
                >
                  Sign out
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
    )
  }
  return ( //user not logged in
    <>
      {/* No user logged in */}
      <Popover className="relative z-20 ml-3">
        {() => (
          <>
            <Popover.Button className='focus-visible:outline-none'>
              <div className=' z-20 relative bg-gray-800 flex text-sm rounded-full ring-2 ring-white focus:outline-none '>
                <img
                  className=" h-11 w-11 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
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
                    {providers && Object.values(providers)
                      .map(provider => (
                          <div key={provider.name}>
                              <button onClick={() => signIn(provider.id)} className=' text-center sm:text-left w-full rounded-lg px-4 py-4 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none ' >
                                Sign In with{' '} {provider.name}
                              </button>
                          </div>
                      ))
                    }
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  )
}
