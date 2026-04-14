import { motion } from "framer-motion";
import TitleInMenu from "../menuComponents/TitleInMenu";
import DishInfo from "../menuComponents/DishInfo";
import { menuData } from "../tablesOfData/Dishes";
import { button } from "framer-motion/client";
import { topNavVariant } from "../tablesOfData/variants";

export function ShowMenuData({kategoria})
{
    return(
        menuData.map(item => item.kategoria === kategoria && <DishInfo key={item.id} dish={item}></DishInfo>)
    );
}
export default function Menu()
{
    const kategorie = ["Lawasze","Bułki", "Burgery", "Dodatki", "Napoje"];
    const scrollToSection = (id) =>{
        const element = document.getElementById(id);
        if(element)
        {
            element.scrollIntoView({behavior:"smooth"});
        }
        
    };
    return(
    <div className="menuDiv">
        <motion.div className="menuTitle">
            <div className="menuTitleOne">Dowiedz się więcej</div>
            <div className="menuTitleTwo">O naszym menu </div>
        </motion.div>
        <motion.div className="menu">
            <div className="menuSearchBar">
                {/* wyszukiwarka*/}
                {kategorie.map(kat=>(
                <>
                    <motion.button key={kat} onClick={()=>scrollToSection(kat)} variants={topNavVariant} initial="initial" whileHover="hoverState">
                        {kat}
                    </motion.button>
                </>
                   
                ))}
            </div>

            <div className="menuPositions">
                {kategorie.map(kat=>(
                    <section id={kat} key={kat}>
                            <TitleInMenu text={kat}></TitleInMenu>
                        <div className="menuKategory">
                            <ShowMenuData kategoria={kat}></ShowMenuData>
                        </div>
                    </section>
                ))}
            </div>
        </motion.div>
    </div>
    
    );
    
}

