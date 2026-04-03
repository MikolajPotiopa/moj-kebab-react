import TopNav from "./Navigation";
import Button from "./Button";
import Img from "./Img";
import Text from "./Text";
import {texts} from "./Texts"

export default function Header()
{
    return(
        <div className="header">
            <div className="topHeader">
                <Img className={'headerImg'} imgSrc={'/Img/HeaderIcon.png'} imgAlt={'logo'}></Img>
                <div className="navigationBar">
                    <TopNav value={'Start'} dir={' '}></TopNav>
                    <TopNav value={'O nas'} dir={' '}></TopNav>
                    <TopNav value={'Menu'} dir={' '}></TopNav>
                    <TopNav value={'Opinie'} dir={' '}></TopNav>
                    <TopNav value={'Galeria'} dir={' '}></TopNav>
                    <TopNav value={'Kontakt'} dir={' '}></TopNav>
                </div>
                <Button className={'headerButton'} value={'Zamów online'}/>
            </div>
            
            <div className="bottomHeader">
                <div className="frontTexts">
                    <Text className={'firstText'} text={texts[0]}></Text>
                    <Text className={'secondText'} text={texts[1]}></Text>
                    <Button className={'frontButton'} value={'Zamów online'} ></Button>
                </div>
                

            </div>
        </div>
    );
}