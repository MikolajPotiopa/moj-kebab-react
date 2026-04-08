import { motion, AnimatePresence, scale, color, transform, easeIn } from "framer-motion";
import { useState,useEffect } from "react";
import TopNav from "../headerComponents/Navigation.jsx";
import Button from "../basicComponents/Button.jsx";
import Img from "../basicComponents/Img.jsx";
import Text from "../basicComponents/Text.jsx";
import Link from "../basicComponents/Link.jsx";
import {texts} from "../tablesOfData/Texts.jsx"
import { 
    headerButtonVariant, 
    secondButtonVariant, 
    topNavVariant, 
    facebookVariant,
    titleVariant,
    titleTextVariant
} from "../tablesOfData/variants.jsx";

export default function Header()
{
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() =>{
        const handleScroll = () =>{
            window.scrollY > 200 ? setIsSticky(true) : setIsSticky(false)
        };
        window.addEventListener("scroll",handleScroll);
        return () => window.removeEventListener("scroll",handleScroll);
    },[]);

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
        </div>
    );
}