import React, { useEffect, useState } from 'react'
import Products from '../../components/Products'
import Collections from '../../models/collectionsModel'
import connectDB from '../../utils/connectDB'
connectDB();

export default function Category({f_collection}) {

  const [givenCollection, setgivenCollection] = useState();
  useEffect(()=>{
    if(!givenCollection)
      setgivenCollection(JSON.parse(f_collection));
  })

  const createBreadcrumbs = (collection) => {
    let breadcrumb = [];
    breadcrumb.push({
      id: 1,
      name: 'Collection',
      href: null
    })
    breadcrumb.push({
      id: 2,
      name: collection.name,
      href: `/collection/${collection.name.replace(/\s+/g, '-')}`
    })
    return (breadcrumb);
  }

  if(givenCollection){
    return (
      <div className="bg-white">
        <div className=' pt-20'>
          <h2 className="text-3xl max-w-2xl mx-auto px-4 space-x-2 sm:px-6 lg:max-w-7xl lg:px-8 font-semibold text-gray-900">{givenCollection.name}</h2>
          <div className="pt-4">
            <nav aria-label="Breadcrumb">
              <ol role="list" className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
                {createBreadcrumbs(givenCollection).map(breadcrumb => {
                  if (breadcrumb.id == 2) {
                    return (
                      <li className="text-sm" key={breadcrumb.id}>

                        <a href={breadcrumb.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                          {breadcrumb.name}
                        </a>
                      </li>
                    )
                  }
                  else {
                    return (
                      <li key={breadcrumb.id}>
                        <div className="flex items-center">
                          <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                            {breadcrumb.name}
                          </a>
                          <svg
                            width={16}
                            height={20}
                            viewBox="0 0 16 20"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            className="w-4 h-5 text-gray-300"
                          >
                            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                          </svg>
                        </div>
                      </li>
                    )
                  }
                })}
              </ol>
            </nav>
          </div>
        </div>

        {givenCollection.categories.map(name=>{
            return (
              <Products name={name} />
            )
        })} 
      </div>
    )
  }
  else{
    return (
      <div className='p-96 font-semibold'>
        Loading...
      </div>
    )
  }
}

export const getStaticProps = async (context) => {  //can only send JSON or String.. :(
  // console.log("###Context is :", context);
  let reqName  = context.params.id.split('-').join(' ');
  let data = await Collections.findOne({name: reqName});
  let f_collection = JSON.stringify(data);
  return {
    props: { f_collection }
  }
}

export async function getStaticPaths() {  //can only send JSON or String.. :(

  let all_collections = await Collections.find({});

  if (all_collections) {
    const ids = all_collections.map(
      (collection) =>{
        return (collection.name.replace(/\s+/g, '-'));
      } 
    );
    const paths = ids.map((id) => ({ params: { id: id.toString() } }))
    return { paths, fallback: true }
  }
}

// const exchange_space_so_dash = (str)=>{
//   return (str.replace(/\s+/g, '-')); //regex expression to convert whitespace to dash
// }