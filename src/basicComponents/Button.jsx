import {motion} from "framer-motion";

export default function Button({className,value,variant})
{
    return(
        <div className={className}>
            <motion.button variants={variant} whileHover="hoverState" initial="initial" whileTap="tapState" animate="animate" whileInView="show">
            {value}
            </motion.button>
        </div>
        
    );
}