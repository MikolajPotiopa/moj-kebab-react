import {motion} from "framer-motion";

export default function Button({className,value,variant,functions})
{
    return(
        <div className={className}>
            <motion.button variants={variant} onClick={functions} whileHover="hoverState" initial="initial" whileTap="tapState" animate="animate" whileInView="show" viewport={{ once: true }}>
            {value}
            </motion.button>
        </div>
        
    );
}