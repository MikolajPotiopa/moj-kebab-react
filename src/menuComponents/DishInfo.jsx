import { motion } from "framer-motion";


export default function DishInfo({dish})
{
    <motion.div className="dishBox">
        <img src={dish.src} alt={dish.alt} />
        <div dishBoxTitle>
            {dish.title}
        </div>
        <div className="dishBoxDescription">
            {dish.description}
        </div>
        <button className="dishBoxButton">od { dish.cost}zł</button>
    </motion.div>
}