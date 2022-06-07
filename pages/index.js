import Heropage from "../components/Heropage"
import Feature from "../components/Feature"
import Category from "../components/Category"
import Products from "../components/Products"
import EmblaCarousel from "../components/Carousel"
export default function Home() {
  return (
    <>
      <Heropage/>
      <EmblaCarousel/>
      <Category/>
      <Feature/>
      <Products/>
    </>
  )
}
