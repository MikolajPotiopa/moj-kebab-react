import { color, motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import Modal from "./Modal";
import { dishBoxButtonVariant,dishInfoVariant } from "../tablesOfData/variants";
import { useProduct } from "../kitchenComponents/ProductsContext";


import { useEffect, useState } from "react";
export default function DishInfo({dish})
{
    const {productsC,getNotAvailable} = useProduct();
    
    const product = productsC.find( (item)=>{return item.id === dish.id;}  );
    useEffect(()=>{
        console.log("produkty:")
        console.log(product?.available)
    },[product])


    const[isModalOpen, setModalOpen] = useState(false);
    return(
        <motion.div className="dishBox" variants={dishInfoVariant} initial="initial" whileInView="show">
            <div className="dishBoxImg">
                <img src={dish.src} alt={dish.alt} />
            </div>
                <div className="dishBoxTitle">
                    {dish.title}
                </div>
                { dish.description && (<div className="dishBoxDescription">
                    {dish.description}
                </div>)}
                {
                    product?.available ? (
                    <motion.button
                        className="dishBoxButton"
                        onClick={()=>setModalOpen(true)}
                        variants={dishBoxButtonVariant}
                        initial="initial"
                        whileHover="hoverState"
                    > 
                    <FaShoppingCart 
                    style={{marginRight:"6px", paddingTopTop:"2px"}}/>
                    {`od ${dish.info[0].cost} zł`}
                    </motion.button>
                    ):(
                        <motion.button
                        className="dishBoxButtonBlocked"
                    > 
                    {`Produkt nie dostępny`}
                    </motion.button>
                    )
                }
            

            <Modal isOpen={isModalOpen} onClose={()=>setModalOpen(false)} children={dish}>
            </Modal>
        </motion.div>
    );
    
}