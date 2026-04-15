import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";

export default function DishInfo({dish})
{
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
            <motion.button className="dishBoxButton"> <FaShoppingCart style={{marginRight:"6px", paddingTopTop:"2px"}}/> od { dish.cost}zł</motion.button>
    </motion.div>
    );
    
}