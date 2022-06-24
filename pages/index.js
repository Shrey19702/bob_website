import Heropage from "../components/Heropage"
import Feature from "../components/Feature"
import Category from "../components/Category"
import Products from "../components/Products"
import EmblaCarousel from "../components/Carousel"
import Blog from "../components/Blog"
import connectDB from "../utils/connectDB"
// import Payment from "../components/Payment"
import { useSession, signIn, signOut } from "next-auth/react"
const Razorpay = require("razorpay");
const shortid = require("shortid");


connectDB();

export default function Home() {
  

  const makePayment = async () => {
    console.log("here...");
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const data = await fetch(`${process.env.BASE_URL}api/razorpay`, { method: "POST" }).then((t) =>
      t.json()
    );
    console.log(data);
    var options = {
      key: process.env.PAYMENT_KEY, // Enter the Key ID generated from the Dashboard
      name: "Manu Arora Pvt Ltd",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou for your test donation",
      image: "https://manuarora.in/logo.png",
      handler: function (response) {
        // Validate payment at server - using webhooks is a better idea.
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Manu Arora",
        email: "manuarorawork@gmail.com",
        contact: "9999999999",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };



  return (
    <>
      <Heropage/>
      <EmblaCarousel/>
      <Category/>
   
      <button onClick={makePayment}>Paynow</button>

      <Blog/>
      <Products name="Products" />
    </>
  )
}
