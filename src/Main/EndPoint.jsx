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
            <div className="succesBlockDescritpion">Przy jakich kolwiek uwagach prosze zgłosić się pod numer 991 992 993 </div>
            <div className="succesBlockAdres">ADRES: Plaża miłosna</div>
            <a href="/">Wróć na stronę</a>
        </div>
    );
}