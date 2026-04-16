import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import Modal from "./Modal";

import { useState } from "react";
export default function DishInfo({dish})
{
    const[isModalOpen, setModalOpen] = useState(false);
    return(
        <motion.div className="dishBox">
            <div className="dishBoxImg">
                <img src={dish.src} alt={dish.alt} />
            </div>
                <div className="dishBoxTitle">
                    {dish.title}
                </div>
                { dish.description && (<div className="dishBoxDescription">
                    {dish.description}
                </div>)}
            <motion.button className="dishBoxButton" onClick={()=>setModalOpen(true)}> 
                <FaShoppingCart 
                style={{marginRight:"6px", paddingTopTop:"2px"}}/>
                {`od ${dish.info[0].cost}zł`}
            </motion.button>

            <Modal isOpen={isModalOpen} onClose={()=>setModalOpen(false)} children={dish}>
            </Modal>
        </motion.div>
    );
    
}