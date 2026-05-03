import { useContext, useEffect } from "react";
import { CartContext } from "./CartContext";

export default function EndPoint(){
    const {clearCart} = useContext(CartContext)

    useEffect(()=>{
        clearCart();
        localStorage.clear();
    },[])
    return(
        <div className="succesBlock">
            <div className="succesBlockTitle">Płatność udana</div>
            <div className="succesBlockSubTitle">Dziękujemy za zakup</div>
            <div className="succesBlockDescritpion">Zamóienie do odebrania będzie pod adresem Lokalu</div>
            <div className="succesBlockAdres">ADRES</div>
            <a href="/">Wróć na stronę</a>
        </div>
    );
}