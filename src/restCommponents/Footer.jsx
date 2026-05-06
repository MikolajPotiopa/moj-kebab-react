import { motion } from "framer-motion";
import { footerBoxVariantLink } from "../tablesOfData/variants";

export default function Footer(){


    return(
        <div className="footerBox">
            <motion.a variants={footerBoxVariantLink} initial="initial" whileHover="hoverState" className="footerKitchen" href="/kitchen">Panel Kucharza</motion.a>
            <motion.a variants={footerBoxVariantLink} initial="initial" whileHover="hoverState"  className="footerPolicy" href="/policy">Polityka Prywatności</motion.a>
        </div>
        
    );
}