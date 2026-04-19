import { createContext,useState,useEffect } from "react";

export const CartContext = createContext();



export function CartProvider({children}){
    const [cart, setCart] = useState([]);

    const addToCart = (product)=>{
        const isExist = cart.find(item => item.id === product.id && 
            item.size === product.size &&
            JSON.stringify([...item.sauces].sort())===JSON.stringify([...product.sauces].sort()));
        if(isExist){
            const updateCart = cart.map(item=>
                item.id===product.id 
                ? {...item, qty: item.qty +1}
                : item
            );
            setCart(updateCart);
        }else{
            setCart([...cart,{...product,qty:1}])
        }
             
    };
    useEffect(()=>{
    console.log(cart)
},[cart]);
    return(
        <CartContext.Provider value={{cart,addToCart}}>
            {children}
        </CartContext.Provider>
    );
}