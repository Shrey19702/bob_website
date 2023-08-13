import {useState} from 'react'
import Navbar from "./Navbar";
import Footer from "./Footer";
import Suggestion from './Suggestion';
const Layout = ({children}) => {
  
    return ( 
        <>
            <Navbar/> 
            {/* <Suggestion/> */}
            {children}
            <Footer/>
        </>
    );
}
 
export default Layout;