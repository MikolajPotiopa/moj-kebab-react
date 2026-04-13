import { motion } from "framer-motion";


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
                <div className="dishBoxDescription">
                    {dish.description}
                </div>
            <motion.button className="dishBoxButton">od { dish.cost}zł</motion.button>
    </motion.div>
    );
    
}