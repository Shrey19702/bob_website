import { useEffect, useState } from "react";

const Suggestion = ()=>{
  const [hidden, setHidden] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setHidden(false), 7000);
    return () => clearTimeout(timer);
  }, []);

 return(
     <>
       <div className={' transition-all shadow-md overflow-hidden fixed z-10 w-40 bg-white bottom-8 right-10 rounded-t-lg rounded-l-lg '+(hidden?" h-0": " h-28")}>
          <div className="border-[1px] hover:border-black  cursor-pointer absolute px-1 top-1 right-1 text-xl hover:font-semibold "
            onClick={()=>setHidden(true)} 
          >x</div>
          <a href="/consultDetail" className=" leading-6 transition hover:underline absolute mt-6 mx-2">
            Book child consultancy
            <span className=" text-3xl">
              🏥
            </span>
          </a>
       </div>
    </>
 )
}
export default Suggestion;
