import { motion } from "framer-motion";
import TitleInMenu from "../menuComponents/TitleInMenu";
import DishInfo from "../menuComponents/DishInfo";
import { dishes } from "../tablesOfData/Dishes";


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
                <div className="menuLawasz">
                    <DishInfo dish={dishes[0]}></DishInfo>
                    <DishInfo dish={dishes[1]}></DishInfo>
                </div>
                
            </div>
        </motion.div>
    </div>
    
    );
    
}