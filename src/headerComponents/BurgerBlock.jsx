import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import BurgerInside from "./BurgerInside";
import { divVariant } from "../tablesOfData/variants";

export default function BurgerBlock({onClose,isOpen}){

    useEffect(()=>{
        isOpen?
        document.body.style.overflow ="hidden":
        document.body.style.overflow ="unset"
        
    })

return(
    <AnimatePresence>
        {isOpen &&(
            <motion.div
            variants={divVariant}
            initial="initial"
            exit="exit"
            animate="animate"
            className="burgerBlock"
            onClick={()=>onClose()}
            >
                <BurgerInside onClose={()=>onClose()}/>
            </motion.div>

        )}
    </AnimatePresence>
);
}