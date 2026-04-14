import { motion } from "framer-motion";
import TitleInMenu from "../menuComponents/TitleInMenu";
import DishInfo from "../menuComponents/DishInfo";
import { menuData } from "../tablesOfData/Dishes";

export function ShowMenuData({kategoria})
{
    return(
        menuData.map(item => item.kategoria === kategoria && <DishInfo key={item.id} dish={item}></DishInfo>)
    );
}
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
                <div className="menuKategory">
                    <ShowMenuData kategoria={"Lawasz"}></ShowMenuData>
                </div>
                <TitleInMenu text="Kebab w Chrupiącej Bułce"></TitleInMenu>
                <div className="menuKategory">
                    <ShowMenuData kategoria={"Bułka"}></ShowMenuData>
                </div>
                <TitleInMenu text="Burgery z Świerzą Wołowiną"></TitleInMenu>
                <div className="menuKategory">
                    <ShowMenuData kategoria={"Burger"}></ShowMenuData>
                </div>
                <TitleInMenu text="Dodatki"></TitleInMenu>
                <div className="menuKategory">
                    <ShowMenuData kategoria={"Dodatki"}></ShowMenuData>
                </div>
                <TitleInMenu text="Napoje"></TitleInMenu>
                 <div className="menuKategory">
                    <ShowMenuData kategoria={"Napoje"}></ShowMenuData>
                </div>
                
            </div>
        </motion.div>
    </div>
    
    );
    
}

