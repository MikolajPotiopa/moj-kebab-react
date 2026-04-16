import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { divVariant } from "../tablesOfData/variants";
import { MdClose } from "react-icons/md";


export default function Modal({isOpen, onClose}){
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
                        <motion.div
                         className="modalContent"
                         initial={{ y: 50, opacity: 0, scale: 0.9 }}
                         animate={{ y: 0, opacity: 1, scale: 1 }}
                         exit={{ y: 50, opacity: 0, scale: 0.9 }}
                         onClick={(e) =>e.stopPropagation()}
                        >
                            <button className="modalCloseButton">
                                <MdClose size={30}/>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        );
}