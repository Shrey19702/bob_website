
const Footer = () => {
    return ( 
      <footer className="text-center lg:text-left bg-gray-100 text-gray-600 h-[30vh]">
        {/* social links  */}
        <div className="flex justify-center items-center lg:justify-start p-6 border-b border-gray-300 h-[5vh]">
          <div className="mr-12 hidden lg:block">
            <span>Get connected with us on social networks:</span>
          </div>
          <div className="flex justify-center">
            <a href="#!" className="mr-6 text-gray-600">
              <Facebooksvg/>
            </a>
            <a href="#!" className="mr-6 text-gray-600">
              <Googlesvg/>
            </a>
            <a href="#!" className="mr-6 text-gray-600">
              <Instagramsvg/>
            </a>
          
          </div>
        </div>
        {/* logo links contact */}
        <div className="mx-6 text-center md:text-left h-fit">
          <div className="flex flex-row justify-around items-center text-center h-fit flex-wrap w-full px-8">
            {/* LOGO */}
            <div className="py-8 h-fit w-1/3 min-w-[320px]">
              <div className="
                  uppercase
                  font-semibold
                  mb-4
                  flex
                  items-center
                  justify-center
                ">
                <img src="/logo.png" className=" h-16" />
              </div>
              <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor
                sit amet, consectetur adipisicing elit.
              </p>
            </div>
            {/* links */}
            <div className="py-8 h-fit w-1/3 min-w-[320px]" >
              {/* Useful links */}
              <h6 className="uppercase font-semibold mb-4 flex justify-center ">Useful links</h6>
              <div className="grid grid-cols-2 grid-rows-3">
              <p className="mb-4">
                <a href="#!" className="text-gray-600 ">About Us</a>
              </p>
              <p className="mb-4">
                <a href="#!" className="text-gray-600">Contact Us</a>
              </p>
              <p className="mb-4">
                <a href="#!" className="text-gray-600">Shipping Info</a>
              </p>
              <p className="mb-4">
                <a href="#!" className="text-gray-600">Privacy Policys</a>
              </p >
              <p className="mb-4">
                <a href="#!" className="text-gray-600">Terms and Conditions</a>
              </p>
              <p className="mb-4">
                <a href="#!" className="text-gray-600">Terms of Service</a>
              </p>
              </div>  
            </div>
            {/* contact */}
            <div className="py-8 h-fit w-1/3 min-w-[320px]">
              <h6 className="uppercase font-semibold mb-4 flex justify-center ">Contact</h6>
              <p className="flex items-center justify-center  mb-4">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="home"
                  className="w-4 mr-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path fill="currentColor"
                    d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z">
                  </path>
                </svg>
                New York, NY 10012, US
              </p>
              <p className="flex items-center justify-center mb-4">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope"
                  className="w-4 mr-4" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z">
                  </path>
                </svg>
                babyonboard012@gmail.com
              </p>
              <p className="flex items-center justify-center  mb-4">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone"
                  className="w-4 mr-4" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z">
                  </path>
                </svg>
                +91 80580 43458
              </p>
             
            </div>
          </div>
        </div>
        {/* copyright */}
        <div className="text-center p-2 bg-gray-200 ">
          <span>© 2022 Copyright:</span>
          <a className="text-gray-600 font-semibold" href="#">Baby on Board</a>
        </div>

      </footer>
    );
}

function Facebooksvg(){
  return(
    <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f"
      className="w-2.5" role="img" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512">
      <path fill="currentColor"
        d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z">
      </path>
    </svg>
  )
}

function Googlesvg(){
  return(
    <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google"
    className="w-3.5" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
    <path fill="currentColor"
      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z">
    </path>
  </svg>
  )
}

function Instagramsvg(){
  return(
    <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram"
      className="w-3.5" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path fill="currentColor"
        d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z">
      </path>
    </svg>
  )
}

export default Footer;
