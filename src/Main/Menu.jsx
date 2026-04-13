import { motion } from "framer-motion";
import TitleInMenu from "../menuComponents/TitleInMenu";


export default function Menu()
{
    return(
    <div className="menuDiv">
        <motion.div className="menuTitle">
            <div className="menuTitleOne">Dowiedz się więcej</div>
            <div className="menuTitleTwo">O naszym menu </div>
        </motion.div>
        <motion.div className="menu">
            <div className="menuSearchBar">
                {/* wyszukiwarka*/}
                WYSZUKIWARKA
            </div>
            <div className="menuPositions">
                <TitleInMenu text="Kebab w Rzemieślniczym Lawaszu"></TitleInMenu>
            </div>
        </motion.div>
    </div>
    
    );
    
}