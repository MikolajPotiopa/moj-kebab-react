import Text from "./Text";
import Icon from "./Icons";


export default function Localisation()
{
    return(
        <div className="firstBox">
            <Icon></Icon>
            <div className="firstBoxTexts">
                <Text className={'firstBoxTitle'} text={'Gdzie jesteśmy?'} ></Text>
                <div className="firstBoxText">Habibi Kebab Wawer <br /> Michała Kajki 67a <br /> o4-634 Warszawa</div>
            </div>
            
        </div>
    );
}


