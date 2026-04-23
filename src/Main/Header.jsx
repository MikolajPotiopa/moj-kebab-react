import { motion, AnimatePresence, scale, color, transform, easeIn } from "framer-motion";
import { useState,useEffect,useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "./CartContext.jsx";
import TopNav from "../headerComponents/Navigation.jsx";
import Button from "../basicComponents/Button.jsx";
import Img from "../basicComponents/Img.jsx";
import Text from "../basicComponents/Text.jsx";
import Link from "../basicComponents/Link.jsx";
import Cart from "./Cart.jsx";
import {texts} from "../tablesOfData/Texts.jsx"
import { 
    headerButtonVariant, 
    secondButtonVariant, 
    topNavVariant, 
    facebookVariant,
    titleVariant,
    titleTextVariant,
    cartButtonVariant
} from "../tablesOfData/variants.jsx";

export default function Header()
{
    const { cart } = useContext(CartContext);
    const [isSticky, setIsSticky] = useState(false);

    
    useEffect(() =>{
        const handleScroll = () =>{
            window.scrollY > 200 ? setIsSticky(true) : setIsSticky(false)
        };
        window.addEventListener("scroll",handleScroll);
        return () => window.removeEventListener("scroll",handleScroll);
    },[]);
    //guzik do menu
    const [isOpen,setOpen] = useState(false);
    

    return(
        <div className="header">
            <div className="topHeader">
                <Img className={'headerImg'} imgSrc={'/Img/HeaderIcon.png'} imgAlt={'logo'}></Img>
                <div className="navigationBar">
                    <TopNav value={'Start'} dir={' '} variant={topNavVariant}></TopNav>
                    <TopNav value={'O nas'} dir={' '} variant={topNavVariant}></TopNav>
                    <TopNav value={'Menu'} dir={' '} variant={topNavVariant}></TopNav>
                    <TopNav value={'Opinie'} dir={' '} variant={topNavVariant}></TopNav>
                    <TopNav value={'Galeria'} dir={' '} variant={topNavVariant}></TopNav>
                    <TopNav value={'Kontakt'} dir={' '} variant={topNavVariant}></TopNav>
                </div>
                <Button className={'headerButton'} value={'Zamów online'} variant={headerButtonVariant}/>
            </div>

            <AnimatePresence>
                {isSticky&& (
                    <motion.div
                    className="topHeader sticky"
                    initial={{y:-100}}
                    animate={{y:0}}
                    exit={{y:-100}}
                    transition={{duration:0.3}}
                    >
                            <Img className={'headerImg'} imgSrc={'/Img/HeaderIcon.png'} imgAlt={'logo'}></Img>
                        <div className="navigationBar">
                            <TopNav value={'Start'} dir={' '} variant={topNavVariant}></TopNav>
                            <TopNav value={'O nas'} dir={' '} variant={topNavVariant}></TopNav>
                            <TopNav value={'Menu'} dir={' '} variant={topNavVariant}></TopNav>
                            <TopNav value={'Opinie'} dir={' '} variant={topNavVariant}></TopNav>
                            <TopNav value={'Galeria'} dir={' '} variant={topNavVariant}></TopNav>
                            <TopNav value={'Kontakt'} dir={' '} variant={topNavVariant}></TopNav>
                        </div>
                        <Button className={'headerButton'} value={'Zamów online'} variant={headerButtonVariant}/>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="bottomHeader">
                <div className="frontTexts">
                    <div className="front">
                        <Text className={'firstText'} text={texts[0]} variant={titleVariant}></Text>
                        <Text className={'secondText'} text={texts[1]} variant={titleTextVariant}></Text>
                    </div>
                    <Button className={'frontButton'} value={'Zamów online'} variant={secondButtonVariant} ></Button>
                </div>
                <div className="favebookDiv">
                    <Link className={'facebook'} href={' '} value={'f'} variant={facebookVariant}></Link>
                </div>
            </div>
            <motion.div className="stickyCart" >
                <motion.button className="cartButton" onClick={()=>setOpen(true)} variants={cartButtonVariant} initial="initial" whileHover="hoverState" whileTap="tapState" >
                    <FaShoppingCart className="cartIcon"/>
                    <span className="cartBadge">{cart.length}</span>
                </motion.button>
            </motion.div>
            <Cart onClose={()=>setOpen(false)} isOpen={isOpen}></Cart>
        </div>
    );
}