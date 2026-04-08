import { motion } from "framer-motion";
import Text from "../basicComponents/Text";
import {texts} from "../tablesOfData/Texts"
import Button from "../basicComponents/Button";

export default function PostInfo()
{
    return(
        <motion.div className="postInfoBox">
            <Text text={texts[2]} className='postInfoBoxIntro'></Text>
            <Text text={texts[3]} className='postInfoBoxTitle'></Text>
            <Text text={texts[4]} className='postInfoBoxText'></Text>
            <Text text={texts[5]} className='postInfoBoxDescription'></Text>
            <Button value='Zamów online' className='postInfoBoxButton'></Button>
        </motion.div>
    );
    
}