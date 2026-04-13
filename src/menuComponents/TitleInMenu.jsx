import { motion } from "framer-motion";


export default function TitleInMenu({text})
{
    return(
        <motion.div className="titleInMenu">
            {text}
        </motion.div>
    );
}