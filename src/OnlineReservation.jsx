import Icon from "./Icons";
import Text from "./Text";
import Button from "./Button"
export default function OnlineReservation()
{
    return(
        <div className="thirdBox">
            <Icon></Icon>
            <Text className={'thirdBoxTitle'} text={'Zamów online'}></Text>
            <Button className={'thirdBoxButton'} value={'zobacz menu'}></Button>
            
        </div>
    );
}