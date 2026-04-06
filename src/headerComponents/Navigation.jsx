import { motion } from "framer-motion";

export default function TopNav({value,dir,variant })
{
    return(
        <motion.div className="topNav"  whileHover={"hoverState"} initial={"initial"}>
            <motion.a href={dir} variants={variant}>{value}</motion.a>
        </motion.div>
        
    );
}