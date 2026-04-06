import { motion, AnimatePresence, scale, color, transform, easeIn } from "framer-motion";
import TopNav from "./Navigation";
import Button from "./Button";
import Img from "./Img";
import Text from "./Text";
import Link from "./Link";
import {texts} from "./Texts"

export default function Header()
{
    //animacje
    const headerButtonVariant = {
        hoverState: 
        { 
            backgroundColor: 'rgba(223, 152, 0,1)',
            color: 'rgba(0,0,0,1)', 
            scale: 1.1,
            transition:{ duration:0.2} 
        },
        initial:
        {
            backgroundColor: 'rgba(0,0,0,0)',
            color:'white',
            scale:1.00
        }
    }
    const secondButtonVariant = 
    {
        hoverState:
        {
            backgroundColor: 'black',
            color: 'rgba(223, 152, 0,1)',
            border: '4px solid rgba(223, 152, 0,0.2)',
            scale: 1.05,
            transition:{duration:0.1}
        },
        initial:
        {
            backgroundColor: 'rgba(223, 152, 0,1)',
            color: 'rgba(0,0,0,1)',
            border: '4px rgba(0, 0,0,0)',
            scale: 1.00
        }
    }
    const topNavVariant =
    {
        hoverState:
        {
            color:'rgba(223, 152, 0,1)',
            transition:{duration:0.01}
        },
        initial:
        {
            color:'rgba(255,255,255,1)',
            transition:{duration:0.01}
        }
    }
    const facebookVariant=
    {
        hoverState:
        {
            backgroundColor: 'black',
            color: 'rgba(223, 152, 0,1)',
            border: '4px solid rgba(223, 152, 0,0.2)',
            scale: 1.05,
            transition:{duration:0.1}

        },
        initial:
        {
            backgroundColor: 'rgba(223, 152, 0,1)',
            color: 'rgba(0,0,0,1)',
            border: '4px rgba(0, 0,0,0)',
            scale: 1.00
        }
    }
    //koniec animacji
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
                        <Text className={'firstText popUp'} text={texts[0]}></Text>
                        <Text className={'secondText slideDown'} text={texts[1]}></Text>
                    </div>
                    <Button className={'frontButton slide'} value={'Zamów online'} variant={secondButtonVariant} ></Button>
                </div>
                <div className="favebookDiv">
                    <Link className={'facebook'} href={''} value={'f'} variant={facebookVariant}></Link>
                </div>
            </div>
        </div>
    );
}