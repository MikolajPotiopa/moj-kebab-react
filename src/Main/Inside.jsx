
import TimeOpen from "../insideComponents/TimeOpen";
import Localisation from "../insideComponents/Localisation";
import OnlineReservation from "../insideComponents/OnlineReservation"
import PostInfo from "../insideComponents/PostInfo";
import PostImgs from "../insideComponents/PostImgs";
import { onlineReservationVariant,divVariant,postInfoVariant } from "../tablesOfData/variants";
import { motion } from "framer-motion";

export default function Inside()
{
    
    return(
        <div className="inside">
            <motion.div className="boxes" viewport={{ once: true, amount: 0.3 }} variants={divVariant} initial="initial" whileInView="show">
                <Localisation></Localisation>
                <TimeOpen></TimeOpen>
                <OnlineReservation variant={onlineReservationVariant}></OnlineReservation>
            </motion.div>
            <motion.div className="postInfo" variants={divVariant} initial="initial" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
                <PostInfo></PostInfo>
                <PostImgs></PostImgs>
            </motion.div>
            
        </div>
    );
}