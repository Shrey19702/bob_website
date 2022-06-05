import Heropage from "../components/Heropage"
import Feature from "../components/Feature"
import Category from "../components/Category"
import Products from "../components/Products"
import Carousel from "../components/Carousel"
export default function Home() {
  return (
    <>
      <Heropage/>
      <Products/>
      <Category/>
      <Feature/>
      <Carousel/>
    </>
  )
}
