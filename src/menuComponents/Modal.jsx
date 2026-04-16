import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { divVariant } from "../tablesOfData/variants";
import ModalBlock from "./ModalBlock";

export default function Modal({isOpen, onClose,children}){
    useEffect(()=>{
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        },[isOpen]);


        return(
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                    className="modalOverlay"
                     variants={divVariant}
                     initial="initial"
                     animate="animate"
                     exit="exit"
                     onClick={onClose}
                    >
                        <ModalBlock dish={children} onClose={onClose}></ModalBlock>  
                    </motion.div>
                )}
            </AnimatePresence>
        );
}