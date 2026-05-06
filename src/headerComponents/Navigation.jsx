import { motion } from "framer-motion";

export default function TopNav({value,dir,variant })
{
    const scroll = (id) =>{
         const element = document.getElementsByClassName(id);
         const oneElement = element[0];
         console.log(element);
         if(oneElement){
            console.log(oneElement);
            oneElement.scrollIntoView({behavior:"smooth"});
         }
    }
    return(
        <motion.div className="topNav"  whileHover={"hoverState"} initial={"initial"}>
            <motion.button onClick={()=>scroll(dir)}  variants={variant}>{value}</motion.button>
        </motion.div>
        
    );
}