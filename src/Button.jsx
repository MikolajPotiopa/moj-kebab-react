import {motion} from "framer-motion";
import { div } from "framer-motion/client";

export default function Button({className,value,variant})
{
    return(
        <div className={className}>
            <motion.button variants={variant} whileHover="hoverState" initial="initial">
            {value}
            </motion.button>
        </div>
        
    );
}