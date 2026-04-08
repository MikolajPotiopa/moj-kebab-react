import Text from "../basicComponents/Text";
import Icon from "../insideComponents/Icons";
import { motion } from "framer-motion";
import { iconVariant, titleBoxTextVariant, boxTextVariant } from "../tablesOfData/variants";




export default function Localisation()
{
    return(
        <div className="firstBox">
            <Icon variant={iconVariant}></Icon>
            <div className="firstBoxTexts">
                <Text className={'firstBoxTitle'} text={'Gdzie jesteśmy?'} variant={titleBoxTextVariant} ></Text>
                <motion.div className="firstBoxText" variants={boxTextVariant} initial="initial" whileInView="show" viewport={{ once: true }}>Habibi Kebab Wawer <br /> Michała Kajki 67a <br /> o4-634 Warszawa</motion.div>
            </div>
            
        </div>
    );
}


