import Heropage from "../components/Heropage"
import Feature from "../components/Feature"
import Category from "../components/Category"
import Products from "../components/Products"
import EmblaCarousel from "../components/Carousel"
import Blog from "../components/Blog"
import connectDB from "../utils/connectDB"

connectDB();

export default function Home() {
  return (
    <>
      <Heropage/>
      <div className="z-10 bg-slate-600">
        <EmblaCarousel/>
        <Category/>
        <Blog/>
        <Products/>
      </div>
    </>
  )
}
