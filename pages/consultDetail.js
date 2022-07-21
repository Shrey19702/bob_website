const consultDetail = ()=>{
    return(
        <div className="container">
        <div className="flex flex-wrap lg:justify-between justify-center ml-8 items-center py-32">
     
          <div className="w-full lg:w-1/2 xl:w-5/12 px-4">
            <div className="bg-white relative rounded-lg p-8 sm:p-12 shadow-lg">
              <form method="post" action={`/api/consultation/createConsultation`}>
                <div className="mb-6">
                  <input
                    type="text"
                    required
                    name="name"
                    placeholder="Your Name"
                    className="
                          w-full
                          rounded
                          py-3
                          px-[14px]
                          text-body-color text-base
                          border border-[f0f0f0]
                          outline-none
                          focus-visible:shadow-none
                          focus:border-primary
                          "
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="email"
                    required
                    name="email"
                    placeholder="Your Email"
                    className="
                          w-full
                          rounded
                          py-3
                          px-[14px]
                          text-body-color text-base
                          border border-[f0f0f0]
                          outline-none
                          focus-visible:shadow-none
                          focus:border-primary
                          "
                  />
                </div>
                <div className="mb-6">
           
                  <input
                    type="tel"
                    required
                    name="tel"
                    placeholder="Your Phone"
                    className="
                          w-full
                          rounded
                          py-3
                          px-[14px]
                          text-body-color text-base
                          border border-[f0f0f0]
                          outline-none
                          focus-visible:shadow-none
                          focus:border-primary
                          "
                  />
                </div>
                <div className="mb-6">
                  <textarea
                    rows="6"
                    required
                    name="text"
                    placeholder="Your Message"
                    className="
                          w-full
                          rounded
                          py-3
                          px-[14px]
                          text-body-color text-base
                          border border-[f0f0f0]
                          resize-none
                          outline-none
                          focus-visible:shadow-none
                          focus:border-primary
                          "
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="
                          w-full
                          text-black
                          bg-primary
                          rounded
                          border border-primary
                          p-3
                          transition
                          hover:bg-opacity-90
                          "
                  >
                    Send Message
                  </button>
                </div>
              </form>
             
            </div>
          </div>
        </div>
      </div>
    )
}
export default consultDetail;




