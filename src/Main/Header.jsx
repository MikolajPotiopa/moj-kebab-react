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
import BurgerBlock from "../headerComponents/BurgerBlock.jsx";
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
import { GiHamburgerMenu } from "react-icons/gi";



export const scrollInto = (id) =>{
         const element = document.getElementsByClassName(id);
         const oneElement = element[0];
         if(oneElement){
            oneElement.scrollIntoView({behavior:"smooth"});
         }
    }
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



    const [width, setWidth] = useState(window.innerWidth);

    useEffect(()=>{
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize',handleResize);


        width > 1000 && 
        (
            setShouldBurger(false)
        )
        width<1000 &&
        (
            setShouldBurger(true)
        )
        return () => window.removeEventListener('resize',handleResize)

        
    },[])



    const [shouldBurger, setShouldBurger] = useState(true);

    useEffect(()=>{
        width > 1000 && 
        (
            setShouldBurger(false),
            setBurgerClicked(false)
        )
        width<1000 &&
        (
            setShouldBurger(true)
        )
    },[width])

    
    const [isBurgerClicked, setBurgerClicked] = useState(false);

    const [isOpen,setOpen] = useState(false);
    

    return(
        <div className="header">
            <BurgerBlock isOpen={isBurgerClicked} onClose={()=>setBurgerClicked(false)} ></BurgerBlock>
            <div className="topHeader">
                <Img className={'headerImg'} imgSrc={'/Img/HeaderIcon2.webp'} imgAlt={'logo'}></Img>
                {!shouldBurger ?(
                    <>
                        <div className="navigationBar">
                            <TopNav value={'Start'} dir={'header'} variant={topNavVariant}></TopNav>
                            <TopNav value={'O nas'} dir={'boxes'} variant={topNavVariant}></TopNav>
                            <TopNav value={'Menu'} dir={'menuDiv'} variant={topNavVariant}></TopNav>
                            <TopNav value={'Kontakt'} dir={'rest'} variant={topNavVariant}></TopNav>
                        </div>
                        <Button functions={()=>scrollInto('menu')} className={'headerButton'}  value={'Zamów online'} variant={headerButtonVariant}/>
                    </>
                ):(
                    <div className="topHeaderBurgerBox">
                        <motion.button onClick={()=>setBurgerClicked(!isBurgerClicked)} className="topHeaderBurgerButton"><GiHamburgerMenu size="30px"/></motion.button>
                    </div>
                )}
                
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
                        <Img className={'headerImg'} imgSrc={'/Img/HeaderIcon2.webp'} imgAlt={'logo'}></Img>
                        {!shouldBurger ?(
                        <>
                            <div className="navigationBar">
                                <TopNav value={'Start'} dir={'header'} variant={topNavVariant}></TopNav>
                                <TopNav value={'O nas'} dir={'boxes'}  variant={topNavVariant}></TopNav>
                                <TopNav value={'Menu'} dir={'menuDiv'} variant={topNavVariant}></TopNav>
                                <TopNav value={'Kontakt'} dir={'rest'} variant={topNavVariant}></TopNav>
                            </div>
                            <Button functions={()=>scrollInto('menu')} className={'headerButton'} value={'Zamów online'} variant={headerButtonVariant}/>
                        </>
                        ):(
                            <div className="topHeaderBurgerBox">
                            <motion.button  onClick={()=>setBurgerClicked(!isBurgerClicked)} className="topHeaderBurgerButton"><GiHamburgerMenu size="20px"/></motion.button>
                        </div>
                        )}
                        
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="bottomHeader">
                <div className="frontTexts">
                    <div className="front">
                        <Text className={'firstText'} text={texts[0]} variant={titleVariant}></Text>
                        <Text className={'secondText'} text={texts[1]} variant={titleTextVariant}></Text>
                    </div>
                    <Button functions={()=>scrollInto('menu')}  className={'frontButton'} value={'Zamów online'} variant={secondButtonVariant} ></Button>
                </div>
                <div className="favebookDiv">
                    <Link className={'facebook'} href={' '} value={'f'} variant={facebookVariant}></Link>
                </div>
            </div>
            <motion.div className="stickyCart" >
                <motion.button className="cartButton" onClick={()=>setOpen(true)} variants={cartButtonVariant} initial="initial" whileHover="hoverState" whileTap="tapState" >
                    <FaShoppingCart className="cartIcon"/>
                    <span className="cartBadge">{cart.reduce((sum,{qty})=>{return sum+qty},0)}</span>
                </motion.button>
            </motion.div>
            <Cart onClose={()=>setOpen(false)} isOpen={isOpen}></Cart>
        </div>
    );
}