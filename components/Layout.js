import {useState} from 'react'
import Navbar from "./Navbar";
import Footer from "./Footer";
import Suggestion from './Suggestion';
const Layout = ({children}) => {

    // const [mainCheck, setMainCheck] = useState(false);

    // if (typeof window !== "undefined") {
    //   setMainCheck(window.location.href!=="/") 
        
    // }
  
    return ( 
        <>
            <Navbar/> 
            <Suggestion/>
            {children}
            <Footer/>
        </>
    );
}
 
export default Layout;