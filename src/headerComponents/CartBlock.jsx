import { motion, setTarget,AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import { CartContext } from "../Main/CartContext";
import CartLine from "./CartLine";
import { useContext, useEffect, useState } from "react";
import { 
    cartBlockCloseBtnVariant,
    cartBuyBtnVariant,
    cartBlockEmail,
    addressDetailsFormLeft,
    addressDetailsFormRight, 
    } from "../tablesOfData/variants";



import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CartBlock({onClose }){
    const {cart,addToCart} = useContext(CartContext);


    const [emailBlock, setEmailBlock] = useState(false);
    const [email, setEmail] = useState("");

    const [delivery, setDelivery] = useState(true);

    const[ulica, setUlica] = useState("");
    const[nrDomu, setNrDomu]= useState("");
    const[nrMieszkania, setNrMieszkania]= useState("");
    const[miasto, setMiasto] = useState("");
    const [wszystkieDane, setWszystkieDane] = useState("false");





    const handleButtonCLick =()=>{
        if(delivery){
        const dane ="miasto: "+ miasto + " ulica: " + ulica + " nrDomu: " + nrDomu +" nrMieszkania: "+ nrMieszkania;
        setWszystkieDane(dane);
        }
    }
    useEffect(()=>{
        handleButtonCLick();
    },[ulica,nrDomu,nrMieszkania,miasto])
    useEffect(()=>{
        setWszystkieDane("false");
    },[delivery])

    const onEmailClose = () =>{
        setEmailBlock(false);
    }


    const handleButton =()=>{
        if(delivery){
            if(email===""){
            alert("Podaj nr telefonu")
            return;
            }
            if(miasto===""){
                alert("Podaj miasto")
                return;
            }
            if(ulica===""){
                alert("Podaj ulicę")
                return;
            }
            if(nrDomu===""){
                alert("Podaj numer domu")
                return;
            }
        }
        

        handlePayment();
    }

    
    const handlePayment = async () => {

        
        try { 

            
            console.log("Inicjalizacja płatności dla koszyka:", cart);

            const response = await fetch('/.netlify/functions/create-checkout', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ cart: cart.map(item => ({
                id: item.id,
                size: item.size, 
                qty: item.qty,
                sauces: item.sauces
                })),
                email: email,
                contact: wszystkieDane
             }),
            });

            const data = await response.json();

            if (data.error) {
                console.error("Błąd z serwera:", data.error);
                alert("Wystąpił problem: " + data.error);
                return;
            }

            if (data.url) {
                console.log("Przekierowuję do Stripe Checkout...");
                window.location.href = data.url; 
            } else {
                alert("Błąd: Nie otrzymano adresu płatności.");
            }

        } catch (err) {
            console.error("Błąd sieci:", err);
            alert("Nie udało się połączyć z serwerem płatności.");
        }
    };




    
    const [sum,setSum] = useState(0);
    useEffect(()=>{
        const totalSum = cart.reduce((total,item)=> total + (item.qty*item.cost),0);
        setSum(totalSum);
    },[cart])

    

    return(
        <motion.div
        className="cartContent"
        onClick={(e) =>e.stopPropagation()}
        >
            <motion.button
             className="cartCloseBtn"
             variants={cartBlockCloseBtnVariant}
             initial="initial"
             whileHover="hoverState"
             whileTap="tapState"
             onClick={()=>onClose()}
            >
                <MdClose size={30} className="cartIcon"/>
            </motion.button>
            <ul>
                {cart.map(item=>(
                    <CartLine dish={item} key={item.id}></CartLine>
                ))}
            </ul>
            
            {
            cart.length>0 &&(        
                <div className="cartLastDiv">
                    <div className="cartFullCost">
                        {`Koszt: ${sum} zł`}
                    </div>
                    <motion.button
                     onClick={()=>setEmailBlock(true)}
                     className="cartBuyBtn"
                     variants={cartBuyBtnVariant}
                     initial="initial"
                     whileHover="hoverState"
                     whileTap="tapState"
                    >Zamów Online</motion.button> 
                </div>
            )
            }
            <AnimatePresence>
            {emailBlock&&(
                <div
                className="cartEmail"
                onClick={()=>onEmailClose()}
                >
                    <motion.div
                    className="cartBlockEmail"
                    onClick={(e) =>e.stopPropagation()}
                    variants={cartBlockEmail}
                    initial="initial"
                    exit="exit"
                    whileInView="show"
                    >
                        <motion.button
                         className="cartCloseBtns"
                         variants={cartBlockCloseBtnVariant}
                         initial="initial"
                         whileHover="hoverState"
                         whileTap="tapState"
                         onClick={()=>onEmailClose()}
                        >

                            <MdClose size={30} className="cartIcon"/>
                        </motion.button>
                        <input 
                        type="email" 
                        placeholder=" Numer telefonu " 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="email-input"
                        />
                        <div className="deliveryMainContainer">
                            <div className="deliveryOptionRow">
                                <div className="radioInputWrapper">
                                    <input type="radio" name="checkBox" onChange={() => setDelivery(false)} />
                                </div>
                                <div className="radioLabelText">Odbiór w lokalu</div>
                            </div>
                            <div className="deliveryOptionRow">
                                <div className="radioInputWrapper">
                                    <input type="radio" name="checkBox" onChange={() => setDelivery(true)} checked={delivery} />
                                </div>
                                <div className="radioLabelText">Dostawa +10 zł</div>
                            </div>
                            <AnimatePresence>
                            {delivery && (
                                <div className="addressDetailsForm">
                                    <motion.div className="addressInputGroup" variants={addressDetailsFormLeft}
                                        initial="initial" exit="exit" whileInView="show" whileHover="hoverState"                                         
                                    >
                                        <div className="addressInputLabel">Miasto*</div>
                                        <div className="addressInputFieldWrapper">
                                            <input type="text" name="miasto" onChange={(e) => setMiasto(e.target.value)} />
                                        </div>
                                    </motion.div>
                                    <motion.div className="addressInputGroup"  variants={addressDetailsFormRight}
                                        initial="initial" exit="exit" whileInView="show" whileHover="hoverState"  
                                    >
                                        <div className="addressInputLabel">Ulica*</div>
                                        <div className="addressInputFieldWrapper">
                                            <input type="text" name="ulica" onChange={(e) => setUlica(e.target.value)} />
                                        </div>
                                    </motion.div>
                                    <motion.div className="addressInputGroup"  variants={addressDetailsFormLeft}
                                        initial="initial" exit="exit" whileInView="show" whileHover="hoverState"      
                                    >
                                        <div className="addressInputLabel">Numer domu*</div>
                                        <div className="addressInputFieldWrapper">
                                            <input type="text" name="nrDomu" onChange={(e) => setNrDomu(e.target.value)} />
                                        </div>
                                    </motion.div>
                                    <motion.div className="addressInputGroup"  variants={addressDetailsFormRight}
                                        initial="initial" exit="exit" whileInView="show" whileHover="hoverState"     
                                    >
                                        <div className="addressInputLabel">Numer mieszkania</div>
                                        <div className="addressInputFieldWrapper">
                                            <input type="text" name="nrMieszkania" onChange={(e) => setNrMieszkania(e.target.value)} />
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </AnimatePresence>
                        </div>
                        <motion.button
                        className="emailButtonAccept"
                        variants={cartBuyBtnVariant}
                        initial="initial"
                        whileHover="hoverState"
                        whileTap="tapState"
                        onClick={()=>handleButton()}
                        >
                        Zamów online</motion.button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
        </motion.div>
    );
}