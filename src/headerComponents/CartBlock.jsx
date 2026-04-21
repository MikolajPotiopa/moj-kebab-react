import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { CartContext } from "../Main/CartContext";
import CartLine from "./CartLine";
import { useContext } from "react";
export default function CartBlock({onClose}){
    const {cart,addToCart} = useContext(CartContext);
    return(
        <motion.div
        className="cartContent"
        onClick={(e) =>e.stopPropagation()}
        >
            <button className="cartCloseBtn" onClick={()=>onClose()}>
                <MdClose size={30} className="cartIcon"/>

            </button>
            <ul>
                {cart.map(item=>(
                    <CartLine dish={item} key={item.id}></CartLine>
                ))}
            </ul>
        </motion.div>
    );
}