import { motion } from "framer-motion";

export default function Icon({variant})
{
    return(<motion.div className="icon" variants={variant} initial="initial" whileInView="show" viewport={{ once: true }}>
        .
    </motion.div>
    );
    
}