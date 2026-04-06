import { motion } from "framer-motion";

export default function Link({className,href,value,variant})
{
    return(
        <motion.a href={href} className={className} whileHover="hoverState" initial="initial">
            <motion.div variants={variant} >
                {value}
            </motion.div>
        </motion.a>
        
    );
}