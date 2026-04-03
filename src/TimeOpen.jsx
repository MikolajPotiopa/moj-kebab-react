import Icon from "./Icons";
import Text from "./Text";
import Today from "./DateFunction";


export default function TimeOpen()
{
    return(
    
    <div className="secondBox">
        <Icon></Icon>
        <Text className={'secondBoxTitle'} text={'Godziny otwarcia'}></Text>
        <Today ></Today>
    </div>
    
    );
    
}