import Text from "../basicComponents/Text";
import Icon from "../insideComponents/Icons";
import { motion } from "framer-motion";
import { iconVariant, titleBoxTextVariant, boxTextVariant } from "../tablesOfData/variants";
import { LuMapPin } from "react-icons/lu";



export default function Localisation()
{
    return(
        <div className="firstBox">
            <Icon variant={iconVariant} children={<LuMapPin size={30} color="orange" />}>
                
            </Icon>
            <div className="firstBoxTexts">
                <Text className={'firstBoxTitle'} text={'Gdzie nas znaleźć?'} variant={titleBoxTextVariant} ></Text>
                <motion.div className="firstBoxText" variants={boxTextVariant} initial="initial" whileInView="show" viewport={{ once: true }}>Golden Kebab Wawer <br /> Patryjotów 10b <br /> 04-211 Warszawa</motion.div>
            </div>
            
        </div>
    );
}


