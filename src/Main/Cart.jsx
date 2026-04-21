
import { useEffect, useState,motion } from "react";
import { FaShoppingCart } from "react-icons/fa";

export default function Cart(){
    const [isOpen,setOpen] = useState(false);
    const onClose =()=>{
        setOpen(!isOpen);
    }

    return(
        <div className="stickyCart">
            {isOpen?(
            <button className="cartButton">
                <FaShoppingCart className="cartIcon"/>
            </button>
            ):<div/>
            }
            
            
        </div>
    );
}