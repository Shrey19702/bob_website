import {useState} from 'react'
import Navbar from "./Navbar";
import Footer from "./Footer";
const Layout = ({children}) => {

    // const [mainCheck, setMainCheck] = useState(false);

    // if (typeof window !== "undefined") {
    //   setMainCheck(window.location.href!=="/") 
        
    // }
  
    return ( 
        <>
            <Navbar/> 
            {children}
            <Footer/>
        </>
    );
}
 
export default Layout;