import { FaShoppingCart } from "react-icons/fa";

export default function Cart(){
    return(
        <div className="stickyCart">
            <button className="cartButton">
                <FaShoppingCart className="cartIcon"/>
            </button>
            
        </div>
    );
}