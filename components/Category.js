import { useEffect, useState } from "react"
import Image from "next/image";
const callouts = [
    {
      name: 'Desk and Office A',
      description: 'Work from home accessories',
      imageSrc: './main.jpg',
      imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
      href: '#',
    },
    {
      name: 'Self-Improvement B',
      description: 'Journals and note-taking',
      imageSrc: './main.jpg',
      imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
      href: '#',
    },
    {
      name: 'Travel C',
      description: 'Daily commute essentials',
      imageSrc: './main.jpg',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      href: '#',
    },
    {
      name: 'Travel D',
      description: 'Daily commute essentials',
      imageSrc: './main.jpg',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      href: '#',
    },
    {
      name: 'Travel E',
      description: 'Daily commute essentials',
      imageSrc: './main.jpg',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      href: '#',
    },
    {
      name: 'Travel F',
      description: 'Daily commute essentials',
      imageSrc: './main.jpg',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      href: '#',
    },
    {
      name: 'Desk and Office G',
      description: 'Work from home accessories',
      imageSrc: './main.jpg',
      imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
      href: '#',
    },
    {
      name: 'Self-Improvement H',
      description: 'Journals and note-taking',
      imageSrc: './main.jpg',
      imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
      href: '#',
    },
  ]
  
  export default function Category() {
    const [collections, setCollections] = useState();
 
    const getcollections = async()=>{
      let response = await fetch(`${process.env.BASE_URL}api/collections/getAllCollections`);
      const response_data = await response.json();
      setCollections(response_data.body);
    }
    useEffect(()=>{
      if(!collections){
        getcollections();
      }
    });
    return (
      <div id="collection" className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-28 lg:max-w-none">
            <h2 className="text-2xl font-extrabold text-yellow-500">Categories</h2>
            {collections ? 
                <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-x-6 gap-y-8">
                  {collections.map((collection, idx)=> (
                    <div key={idx} className="group relative">
                      <div className="relative w-full h-20 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                        {/* <img
                          src={collection.image}
                          alt={collection.name}
                          className="w-full h-full object-center object-cover"
                        /> */}
                        <Image
                          src={collection.image}
                          alt={collection.name}
                          className="w-full h-full object-center object-cover"
                          layout='fill'
                          priority
                        />
                      </div>
                      <h3 className="mt-6 text-sm text-gray-500">
                        <a href={`${process.env.BASE_URL}collection/${collection.name.replace(/\s+/g, '-')}`}>
                          <span className="absolute inset-0" />
                          {collection.name}
                        </a>
                      </h3>
                      {/* <p className="text-base font-semibold text-gray-900">{callout.description}</p> */}
                    </div>
                  ))} 
                </div>
              : 
              <div className="m-auto w-fit"> Loading... </div>
            }
          </div>
        </div>
      </div>
    )
  }
  