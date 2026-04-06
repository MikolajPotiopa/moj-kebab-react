import {motion} from "framer-motion";
import { div } from "framer-motion/client";

export default function Button({className,value,variant})
{
    return(
        <div className={className}>
            <motion.button variants={variant} whileHover="hoverState" >
            {value}
            </motion.button>
        </div>
        
    );
}