import Icon from "./Icons";
import Text from "../basicComponents/Text";
import Button from "../basicComponents/Button"
import { iconVariant,titleBoxTextVariant } from "../tablesOfData/variants";
import {scrollInto} from "../Main/Header";

export default function OnlineReservation({variant})
{
    return(
        <div className="thirdBox">
            <Icon variant={iconVariant}></Icon>
            <Text className={'thirdBoxTitle'} text={'Zamów online'}  variant={titleBoxTextVariant}></Text>
            <Button functions={()=>scrollInto('menu')}  className={'thirdBoxButton'} value={'zobacz menu'} variant={variant}></Button>
        </div>
    );
}