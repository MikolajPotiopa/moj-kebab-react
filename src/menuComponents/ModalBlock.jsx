import { useEffect, useState,useContext } from "react";

import { CartContext } from "../Main/CartContext";
import { motion } from "framer-motion";

import { MdClose } from "react-icons/md";
import { textForSauces,sauces } from "../tablesOfData/Sauces";


export default function ModalBlock({onClose,dish}){
    const { addToCart } = useContext(CartContext);

    const maxSauces = 2;
    const [selectedSauces, setSelectedSauces] = useState([]);
    const [selectedSize, setSelectedSize] = useState([])

    const handleSelectedSauces = (option) =>{
        if(selectedSauces.includes(option)){
            setSelectedSauces(selectedSauces.filter(sauce=>sauce!==option));
        }else{
            setSelectedSauces([...selectedSauces,option]);
        }
    };

   
    

    const createCartPositon = ()=>{
        const cartPosition = {
            id:dish.id,
            size: selectedSize[0],
            cost: selectedSize[1],
            sauces: selectedSauces
        };
        return cartPosition;
    }

    const handleConfirm = () =>{
        if(selectedSize.length === 0){
            alert("Prosze wybrać rozmiar");
            return;
        }
        if(dish.sauce && selectedSauces.length ===0){
            alert("Prosze wybrać przynajmniej jeden sos")
            return;
        }
        if(selectedSauces.length > maxSauces){
            alert(`Możesz wybrać maksymalnie ${maxSauces} sosy`)
            return;
        }

        addToCart(createCartPositon());
        onClose();
    }

    useEffect(()=>{
        if(document.getElementById("sauceNecessary")){
                const block = document.getElementById("sauceNecessary");
            if(selectedSauces.length>maxSauces){
                block.style.backgroundColor = "red";
            }else if(selectedSauces.length>=1 && selectedSauces.length<=maxSauces){
                block.style.backgroundColor = "green";
            }else{
                block.style.backgroundColor = "rgb(78, 78, 78)";
            }
        }
        
    },[selectedSauces]);

    useEffect(()=>{
        console.log(`selectedSauces: ${selectedSauces} selectedSize: ${selectedSize}`)
    },[selectedSauces,selectedSize])

    return(
        <motion.div
            className="modalContent"
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.9 }}
            onClick={(e) =>e.stopPropagation()}
        >
            <button className="modalCloseButton" onClick={()=>onClose()}>
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
                        <input
                        type="radio" 
                        name="sizeRadio"
                        onChange={()=>setSelectedSize([item.size,item.cost])}
                        />
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
                            <div className="modalBlockSubTitle">{textForSauces.subTitle}</div>
                            <div className="modalBlockNecessary" id="sauceNecessary">Wymagane</div>
                            <div className="modalBlockUnderLineText">{textForSauces.description}</div>
                        </div>
                        <ul className="modalBlockSize-ul">
                            {sauces.map((item,index)=>(
                            <li key={index} className="modalBlockSize-li">
                                <input 
                                type="checkbox" 
                                name="sauceCheckBox"
                                onChange={()=>handleSelectedSauces(item.sauce)}
                                />
                                <label htmlFor="sauceCheckBox"
                                >
                                    {`${item.sauce}`}
                                </label> 
                            </li>
                            ))}
                        </ul>
                    </div>
                )
                :""
                }
                <button onClick={handleConfirm} className="modalBlockBtnAdd">DODAJ DO KOSZYKA</button>
            </div>
        </motion.div>
    );
}