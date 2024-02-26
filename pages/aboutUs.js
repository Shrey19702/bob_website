import React from 'react'
import Image from 'next/image'
import reqImg from '../public/heroIMG1.jpeg'

export default function aboutUs() {
  return (
    <div className="container px-5 py-24 mx-auto flex flex-col">
      <div className="lg:w-4/6 mx-auto">
        <div className="rounded-lg h-[500px] overflow-hidden">
          <Image
            src={reqImg}
            alt="requested img"
          />
          {/* <img alt="content" className="object-cover object-center h-full w-full" src="/heroIMG1" /> */}
        </div>
        <div className="flex flex-col sm:flex-row mt-10">
          <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
            <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="flex flex-col items-center text-center justify-center">
              <h2 className="font-medium title-font mt-4 text-slate-700 text-lg">OWNER</h2>
              <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
              <p className="text-base text-gray-400">Raclette knausgaard hella meggs normcore williamsburg enamel pin sartorial venmo tbh hot chicken gentrify portland.</p>
            </div>
          </div>
          <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
            <p className="leading-relaxed text-lg mb-4">
              Discover Fresh Delights Grocery!
              Explore a bountiful selection of farm-fresh produce, pantry essentials, and gourmet treats, all under one roof.
              LIVE n BUY
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
