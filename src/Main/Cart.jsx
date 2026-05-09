import { useEffect, useState } from "react";
import { motion,AnimatePresence } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { divVariant } from "../tablesOfData/variants";
import CartBlock from "../headerComponents/CartBlock";
export default function Cart({onClose,isOpen}){
 
    useEffect(()=>{
            console.log(isOpen);

             if (isOpen) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
            
            return () => {
                document.body.classList.remove('no-scroll');
            };
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
                    <CartBlock onClose={()=>onClose()} ></CartBlock>
                </motion.div>
            )
            }
        </AnimatePresence>
    );
}