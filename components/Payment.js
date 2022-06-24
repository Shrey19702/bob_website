import { useSession, signIn, signOut } from "next-auth/react"

const Payment = ({amount})=>{
  const { data: session , status } = useSession()


    amount.preventDefault();

    if(amount === "")
    {
        alert("No amount to pay");
    }
    else{
        var options = 
        {
            key: process.env.PAYMENT_KEY,
            key_secret:process.env.PAYMENT_SECRET,
            amount: amount,
            currency:"INR",
            name:"STARTUP_PROJECTS",
            description:"for testing purpose",
            handler: function(response){
              alert(response.razorpay_payment_id);
            },
            prefill: {
              name:session.user.name,
              email:session.user.email,
            },
            notes:{
              address:"Razorpay Corporate office"
            },
            theme: {
              color:"#3399cc"
            }
    }
    var pay = new window.Razorpay(options);
    pay.open();

    }
}

export default Payment