import { motion } from "framer-motion";
import { postImgsVariant } from "../tablesOfData/variants";

export default function PostImgs()
{
    return(
        <motion.div className="postImgsBox" variants={postImgsVariant} >
            <div>
                <img src="/Img/PostImg1.webp" alt="kebab" />
                <img src="/Img/PostImg2.webp" alt="pomidory" />
            </div>
            <div>
                <img src="/Img/PostImg3.webp" alt="tesla" />
                <img src="Img/PostImg4.webp" alt="chicken" /> 
            </div>
        </motion.div>        
    );
}