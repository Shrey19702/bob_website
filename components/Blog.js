
const Blog = ()=>{
    return(
        <section className="py-24 md:py-28 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto">
            <div className="flex flex-wrap  mx-4">

              <div className="w-full flex justify-center items-center lg:w-1/2 px-4 mb-14 lg:mb-0">
                <img className="block md:w-6/12 lg:w-9/12 rounded-md" src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" alt=""/>
              </div>
              <div className="w-full lg:w-1/2 px-4">
                <div className="max-w-lg mx-auto">
                  <div className="mb-12">
                    <span className="inline-block px-5 py-2 mr-6 text-sm bg-gray-200 rounded-full">Blogs</span>
                    {/* <span className="font-light text-sm text-gray-700">January 13, 2022</span> */}
                  </div>
                  <h2 className="font-heading text-4xl sm:text-5xl mb-10">
                    <span>Your home:</span>
                    <span>Designed by experts, inspired by real life</span>
                  </h2>
                  <p className="max-w-md font-light mb-8">The house by the pond cras ornare, some chords for a three moments, like a sense of truth.</p>
                  <div className="mb-16"><a className="inline-block mr-6 text-indigo-500 hover:text-indigo-600" href="#">#interiodesign</a><a className="inline-block mr-6 text-indigo-500 hover:text-indigo-600" href="#">#design</a><a className="inline-block text-indigo-500 hover:text-indigo-600" href="#">#application</a></div>
                  <a className="inline-block w-full sm:w-auto px-7 py-4 text-center font-medium bg-indigo-500 hover:bg-indigo-600 text-white rounded transition duration-250" href="#">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </section>
    );
}

export default Blog;

