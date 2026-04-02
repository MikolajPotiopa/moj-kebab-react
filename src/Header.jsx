import TopNav from "./Navigation";

export default function Header()
{
    return(
        <div className="header">
            <div className="topHeader">
                <div className="headerImg">
                    <img src="/Img/HeaderIcon.png" alt="" />
                </div>
                <div className="navigationBar">
                    <TopNav value={'Start'} dir={' '}/>
                    <TopNav value={'O nas'} dir={' '}/>
                    <TopNav value={'Menu'} dir={' '}/>
                    <TopNav value={'Opinie'} dir={' '}/>
                    <TopNav value={'Galeria'} dir={' '}/>
                    <TopNav value={'Kontakt'} dir={' '}/>
                </div>
                <div className="headerButton">
                    <button>Zamów online</button>
                </div>
            </div>
            
            
        </div>
    );
}