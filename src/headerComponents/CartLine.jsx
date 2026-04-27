import { menuData } from "../tablesOfData/Dishes";
import { CartContext } from "../Main/CartContext";
import { useContext, useState } from "react";
import { motion } from "framer-motion";

export default function CartLine({dish}){
    const {cart,addToCart,subtractFromCart} = useContext(CartContext);
    const [change,setChange] =useState(0);
    const dishInfoTable = menuData.filter(item=>item.id===dish.id);
    const dishInfo = dishInfoTable[0];
    const handleButtonClick =()=>{
        addToCart(dish);
        setChange(change+1);
    }
    return(
        
        <li key={dish.id} className="cart-li">
            
            <div className="cartInfo">
                <img src={dishInfo.src} alt={dishInfo.alt} className="cartImgs"/>
                <div className="cartTitle">{dishInfo.title}</div>
                <div className="cartSize">{dish.size}</div>
                <div className="cartSauces">{dish.sauces[0]}</div>
                <div className="cartSauces">{dish.sauces[1]}</div>
                <button onClick={()=>handleButtonClick()}>+</button>
                <motion.div className="cartQty" key={change}initial={{opacity:0,y:-10}} animate={{opacity:1,y:0,transition:{duration:0.5,type:"spring",stiffness:100}}} exit={{}}>{dish.qty}</motion.div>
                <button onClick={()=>subtractFromCart(dish)} >-</button>
                <div className="cartCost">{`${dish.cost * dish.qty} zł`}</div>
                
            </div>
        </li>
    );
}