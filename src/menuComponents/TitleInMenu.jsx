import { motion } from "framer-motion";
import { textsForMenu } from "../tablesOfData/TextsForMenu";

export default function TitleInMenu({text})
{
    return(
        <motion.div className="titleInMenu">
            {textsForMenu.map(txt=> txt.kategoria===text? txt.text :"")}
        </motion.div>
    );
}