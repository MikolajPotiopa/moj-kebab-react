import Icon from "./Icons";
import Text from "../basicComponents/Text";
import Button from "../basicComponents/Button"
import { iconVariant,titleBoxTextVariant } from "../tablesOfData/variants";

export default function OnlineReservation({variant})
{
    return(
        <div className="thirdBox">
            <Icon variant={iconVariant}></Icon>
            <Text className={'thirdBoxTitle'} text={'Zamów online'}  variant={titleBoxTextVariant}></Text>
            <Button className={'thirdBoxButton'} value={'zobacz menu'} variant={variant}></Button>
            {/*Błąd animacja pojawia się ciągle */}
        </div>
    );
}