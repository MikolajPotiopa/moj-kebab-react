import { motion, AnimatePresence, scale, color, transform, easeIn } from "framer-motion";
import TopNav from "./Navigation";
import Button from "./Button";
import Img from "./Img";
import Text from "./Text";
import Link from "./Link";
import {texts} from "./Texts"
import { 
    headerButtonVariant, 
    secondButtonVariant, 
    topNavVariant, 
    facebookVariant,
    titleVariant,
    titleTextVariant
} from "./variants.jsx";

export default function Header()
{
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