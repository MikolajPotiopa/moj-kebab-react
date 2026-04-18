import { motion } from "framer-motion";
import { div } from "framer-motion/client";
import { MdClose } from "react-icons/md";
export default function ModalBlock({onClose,dish}){
    
    return(
        <motion.div
            className="modalContent"
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.9 }}
            onClick={(e) =>e.stopPropagation()}
        >
            <button className="modalCloseButton" onClick={onClose}>
                <MdClose size={30}/>
            </button>
            <img src={dish.src} alt={dish.alt} className="modalBlockImg" />
            <div className="modalBlockContent">
                <div className="modalBlockTitle">{dish.title}</div>
                <div className="modalBlockDescription">{dish.description}</div>
            
                <div className="modalBlockInfo">
                    <div className="modalBlockSubTitle">{dish.subTitle}</div>
                    <div className="modalBlockNecessary">Wymagane</div>
                    <div className="modalBlockUnderLineText">Wybierz 1</div>
                </div>
                <ul className="modalBlockSize-ul">
                    {dish.info.map((item,index)=>(
                    <li key={index} className="modalBlockSize-li">
                        <input type="radio" name="sizeRadio"/>
                        <label htmlFor="sizeRadio"
                        >
                            {`${item.size ? item.size:""} - ${item.cost ? `${item.cost}zł`:""} 
                            ${ item.weight ? (`(${item.weight}g)`):""}`}
                        </label> 
                    </li>
                    ))}
                </ul>
                {dish.sauce?
                (
                    <div>
                        <div className="modalBlockInfo">
                            <div className="modalBlockSubTitle">{dish.subTitle}</div>
                            <div className="modalBlockNecessary">Wymagane</div>
                            <div className="modalBlockUnderLineText">Wybierz 1</div>
                        </div>
                        <ul className="modalBlockSize-ul">
                            {dish.info.map((item,index)=>(
                            <li key={index} className="modalBlockSize-li">
                                <input type="radio" name="sizeRadio"/>
                                <label htmlFor="sizeRadio"
                                >
                                    {`${item.size ? item.size:""} - ${item.cost ? `${item.cost}zł`:""} 
                                    ${ item.weight ? (`(${item.weight}g)`):""}`}
                                </label> 
                            </li>
                            ))}
                        </ul>
                    </div>
                )
                :""
                }
            </div>
        </motion.div>
    );
}