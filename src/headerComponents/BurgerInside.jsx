import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { burgerNavigationVartiants } from "../tablesOfData/variants";
import { modalBlockBtnAddVariant } from "../tablesOfData/variants";

export default function BurgerInside({onClose}){

    const texts = [
        "Start",
        "O nas",
        "Menu",
        "Kontakt"
    ];
    const classNames = [
        'header',
        'boxes',
        'menuDiv',
        'rest'
    ];

    const handleScroll = (classN) =>{
         const element = document.getElementsByClassName(classN);
         const oneElement = element[0];
         if(oneElement){
            oneElement.scrollIntoView({behavior:"smooth"});
         }
         onClose();
    }


    return(
        <motion.div
         className="burgerInside"
         onClick={(e) =>e.stopPropagation()}
         >
            <motion.button 
            className="BurgerInsideCloseBtn"
            onClick={()=>onClose()}
            variants={modalBlockBtnAddVariant}
            initial="initial"
            whileHover="hoverState"
            whileTap="tapState"
            >
                <MdClose size={30}/>
            </motion.button>
            <div className="burgerInsideDivs">
                {Array.from({length:4}).map((_,index)=>(
                    <motion.div
                    variants={burgerNavigationVartiants} 
                    initial="initial" whileHover="hoverState" 
                    whileTap="tapState"
                    onClick={()=>handleScroll(classNames[index])}
                    className="burgerInsideLine" 
                    >
                        {texts[index]}
                    </motion.div>
                ))}
            </div> 
        </motion.div>
    );
}