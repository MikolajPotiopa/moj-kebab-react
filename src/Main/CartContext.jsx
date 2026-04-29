import { createContext,useState,useEffect } from "react";

export const CartContext = createContext();



export function CartProvider({children}){
    const [cart, setCart] = useState(()=>{
        const savedCart = localStorage.getItem('kebab_cart');

        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(()=>{
        localStorage.setItem('kebab_cart',JSON.stringify(cart));
    },[cart])
    const addToCart = (product)=>{
        const isExist = cart.find(item => item.id === product.id && 
            item.size === product.size &&
            JSON.stringify([...item.sauces].sort())===JSON.stringify([...product.sauces].sort()));
        if(isExist){
            const updateCart = cart.map(item=>
                (item.id===product.id && 
                item.size === product.size &&
                JSON.stringify([...item.sauces].sort())===JSON.stringify([...product.sauces].sort()))
                ? {...item, qty: item.qty +1}
                : item
            );
            setCart(updateCart);
        }else{
            setCart([...cart,{...product,qty:1}])
        }
             
    };
    const subtractFromCart = (product) =>{
        const isExist = cart.find(item => item.id === product.id && 
            item.size === product.size &&
            JSON.stringify([...item.sauces].sort())===JSON.stringify([...product.sauces].sort()));
        if(isExist.qty >1){
            const updateCart = cart.map(item => (item.id === product.id && 
            item.size === product.size &&
            JSON.stringify([...item.sauces].sort())===JSON.stringify([...product.sauces].sort())
                ? {...item, qty: item.qty -1}
                : item
            ))
            setCart(updateCart);
        }else{
            const newCart = cart.filter(item => 
                !(item.id === product.id && item.size === product.size && JSON.stringify(item.sauces) === JSON.stringify(product.sauces)))
            setCart(newCart);
        }
    }
    const clearCart =()=>{
        setCart([]);
        localStorage.removeItem('kebab_cart');
    }
    return(
        <CartContext.Provider value={{cart,addToCart,subtractFromCart,clearCart}}>
            {children}
        </CartContext.Provider>
    );
}