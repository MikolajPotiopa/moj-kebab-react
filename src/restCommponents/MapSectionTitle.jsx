import { motion } from "framer-motion";


export default function MapSectionTitle()
{


    return(
        <motion.div className="mapSectionTitle">
            <div className="menuTitleOne">Masz pytania?</div>
            <div className="menuTitleTwo">Skontaktuj się z nami </div>
            <div className="menuTitleThree"> Napisz lub zadzwoń do nas!</div>
        </motion.div>
    );
}