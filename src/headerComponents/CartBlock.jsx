import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { CartContext } from "../Main/CartContext";
import CartLine from "./CartLine";
import { cartBlockCloseBtnVariant,cartBuyBtnVariant } from "../tablesOfData/variants";
import { useContext, useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CartBlock({onClose}){
    const {cart,addToCart} = useContext(CartContext);


    const handlePayment = async () => {
        try {

            console.log("Inicjalizacja płatności dla koszyka:", cart);

            const response = await fetch('/.netlify/functions/create-checkout', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ cart: cart.map(item => ({
                id: item.id,
                size: item.size, 
                qty: item.qty,
                sauces: item.sauces
                })) }),
            });

            const data = await response.json();

            if (data.error) {
                console.error("Błąd z serwera:", data.error);
                alert("Wystąpił problem: " + data.error);
                return;
            }

            if (data.url) {
                console.log("Przekierowuję do Stripe Checkout...");
                window.location.href = data.url; 
            } else {
                alert("Błąd: Nie otrzymano adresu płatności.");
            }

        } catch (err) {
            console.error("Błąd sieci:", err);
            alert("Nie udało się połączyć z serwerem płatności.");
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
                    <motion.button
                     onClick={handlePayment}
                     className="cartBuyBtn"
                     variants={cartBuyBtnVariant}
                     initial="initial"
                     whileHover="hoverState"
                     whileTap="tapState"
                    >Zamów Online</motion.button> 
                </div>
            )
            }
            
        </motion.div>
    );
}