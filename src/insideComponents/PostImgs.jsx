import { motion } from "framer-motion";
import { postImgsVariant } from "../tablesOfData/variants";

export default function PostImgs()
{
    return(
        <motion.div className="postImgsBox" variants={postImgsVariant} >
            <div>
                <img src="/Img/PostImg1.png" alt="kebab" />
                <img src="/Img/PostImg2.png" alt="pomidory" />
            </div>
            <div>
                <img src="/Img/tesla.png" alt="tesla" />
                <img src="Img/Chicken.png" alt="chicken" /> 
            </div>
        </motion.div>        
    );
}