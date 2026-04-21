import { useEffect, useState } from "react";
import { motion,AnimatePresence } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { divVariant } from "../tablesOfData/variants";
import CartBlock from "../headerComponents/CartBlock";
export default function Cart({onClose,isOpen}){
 
    useEffect(()=>{
            isOpen ?
            document.body.style.overflow = "hidden" :
            document.body.style.overflow = "unset";
        },[isOpen])
    return(
        <AnimatePresence>
            {isOpen &&(
                <motion.div
                className="cartBlock"
                variants={divVariant}
                initial="initial"
                exit="exit"
                animate="animate"
                onClick={()=>onClose()}
                >
                    <CartBlock onClose={()=>onClose()}></CartBlock>
                </motion.div>
            )
            }
        </AnimatePresence>
    );
}