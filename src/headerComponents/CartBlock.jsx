import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { CartContext } from "../Main/CartContext";
import CartLine from "./CartLine";
import { cartBlockCloseBtnVariant } from "../tablesOfData/variants";
import { useContext, useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CartBlock({onClose}){
    const {cart,addToCart} = useContext(CartContext);


    const handlePayment = async () => {
        const stripe = await stripePromise;

        // 1. Wysyłamy koszyk do funkcji Netlify
        const response = await fetch('/.netlify/functions/create-checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cart: cart }), // Twoja tablica cart z Contextu
        });

        const session = await response.json();

        if (session.error) {
            alert("Błąd płatności: " + session.error);
            return;
        }

        // 2. Przekierowanie klienta do Stripe Checkout
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            alert(result.error.message);
        }
    };




    
    const [sum,setSum] = useState(0);
    useEffect(()=>{
        const totalSum = cart.reduce((total,item)=> total + (item.qty*item.cost),0);
        setSum(totalSum);
    },[cart])
    return(
        <motion.div
        className="cartContent"
        onClick={(e) =>e.stopPropagation()}
        >
            <motion.button
             className="cartCloseBtn"
             variants={cartBlockCloseBtnVariant}
             initial="initial"
             whileHover="hoverState"
             onClick={()=>onClose()}
            >
                
                <MdClose size={30} className="cartIcon"/>
            </motion.button>
            <ul>
                {cart.map(item=>(
                    <CartLine dish={item} key={item.id}></CartLine>
                ))}
            </ul>
            
            {
            cart.length>0 &&(        
                <div className="cartLastDiv">
                    <div className="cartFullCost">
                        {`Koszt: ${sum} zł`}
                    </div>
                    <button onClick={handlePayment} className="cartBuyBtn">Zamów Online</button> 
                </div>
            )
            }
            
        </motion.div>
    );
}