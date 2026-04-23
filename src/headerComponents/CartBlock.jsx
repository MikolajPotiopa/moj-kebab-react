import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { CartContext } from "../Main/CartContext";
import CartLine from "./CartLine";
import { cartBlockCloseBtnVariant } from "../tablesOfData/variants";
import { useContext, useEffect, useState } from "react";
export default function CartBlock({onClose}){
    const {cart,addToCart} = useContext(CartContext);
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
                    <button className="cartBuyBtn">Zamów Online</button> 
                </div>
            )
            }
            
        </motion.div>
    );
}