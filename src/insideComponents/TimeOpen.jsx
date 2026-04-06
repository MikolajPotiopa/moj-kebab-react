import Icon from "../insideComponents/Icons";
import Text from "../basicComponents/Text";
import Today from "../insideComponents/DateFunction";
import { iconVariant,titleBoxTextVariant,boxTextVariant } from "../tablesOfData/variants";





export default function TimeOpen()
{
    return(
    
    <div className="secondBox">
        <Icon variant={iconVariant}></Icon>
        <Text className={'secondBoxTitle'} text={'Godziny otwarcia'}  variant={titleBoxTextVariant}></Text>
        <Today ></Today>
    </div>
    
    );
    
}