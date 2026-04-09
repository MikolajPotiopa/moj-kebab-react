import { motion } from "framer-motion";

export default function Text({className,text,variant})
{
    return(
        <motion.div className={className} variants={variant} initial="initial" animate="animate" whileInView="show" viewport={{ once: true }}>
            {text}
        </motion.div>
    );
}