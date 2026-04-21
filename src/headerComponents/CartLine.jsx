import { menuData } from "../tablesOfData/Dishes";
import { CartContext } from "../Main/CartContext";
import { useContext } from "react";

export default function CartLine({dish}){
    const {cart,addToCart,subtractFromCart} = useContext(CartContext);
    const dishInfoTable = menuData.filter(item=>item.id===dish.id);
    const dishInfo = dishInfoTable[0];
    console.log(dish);
    return(
        
        <li key={dish.id} className="cart-li">
            
            <div className="cartInfo">
                <img src={dishInfo.src} alt={dishInfo.alt} className="cartImgs"/>
                <div className="cartTitle">{dishInfo.title}</div>
                <div className="cartSize">{dish.size}</div>
                <div className="cartSauces">{dish.sauces[0]}</div>
                <div className="cartSauces">{dish.sauces[1]}</div>
                <button onClick={()=>addToCart(dish)}>+</button>
                <div className="cartQty">{dish.qty}</div>
                <button onClick={()=>subtractFromCart(dish)} >-</button>
                <div className="cartCost">{dish.cost * dish.qty}</div>
                
            </div>
        </li>
    );
}