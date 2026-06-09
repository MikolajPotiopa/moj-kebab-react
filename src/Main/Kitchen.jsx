import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import BlockedProducts from "../kitchenComponents/BlockedProducts";
import BlockButton from "../kitchenComponents/BlockButton";


export default function Kitchen(){

    const [orders,setOrders]= useState([]);
    const [products, setProducts] = useState([]);

    const [isBlock, setIsBlock] = useState(false);

        useEffect(()=>{
                if (isBlock) {
                    document.body.style.overflow = "hidden";
                } else {
                    document.body.style.overflow = "unset";
                }
            
                },[isBlock]);


    const getProducts = async ()=>{
        const {data,error} = await supabase.from('products').select('*');
        
        if (error) {
            console.error("Błąd:", error.message);
        } else {
            const fixedProducts = data.map((item, index) => {
                const realIdKey = Object.keys(item).find(key => key.toLowerCase() === 'id');
                if(index == 0){
                   return {
                    
                        ...item,
                        id: 0 
                    }; 
                }
                return {
                    ...item,
                    id: item[realIdKey] || (index + 1) 
                };
            });

        setProducts(fixedProducts);
    };
}

    const getOrders = async () =>{
        const {data, error} = await supabase
            .from('orders') 
            .select('*')
            .order('created_at', {ascending: false});

        if (error) {
            console.error("Błąd Supabase:", error.message);
        } else {
            console.log("Dane odebrane:", data); 
            setOrders(data || []);
        }
    };

    useEffect(()=>{
        getOrders();
        getProducts();
        const channel = supabase
        .channel('kuchnia_orders')
        .on('postgres_changes',
            { event: '*', schema: 'public', table: 'orders' }, 
            (payload) => {
                console.log('Zmiana w bazie!', payload);

                if (payload.eventType === 'INSERT') {

                    setOrders((prevOrders) => [payload.new, ...prevOrders]);
                } 
                else if (payload.eventType === 'UPDATE') {

                    setOrders((prevOrders) => 
                        prevOrders.map(order => 
                            order.id === payload.new.id ? payload.new : order
                        )
                    );
                }
            }
        )
        .subscribe();

        return () => supabase.removeChannel(channel);
    },[])

    


    const getProductName = (productId)=>{
        const product = products.find(p=> p.id == productId);

        return product ? product.title : 'Ładowanie...'
    }


    //haslo
    const [authenticated,setAuthenticated] = useState(false);
    const [password , setPassword] = useState("");

    useEffect(()=>{
        if(password===import.meta.env.VITE_KITCHEN_PASSWORD){
            localStorage.setItem("kitchen_acces","true");
            setAuthenticated(true);
        }
    },[password])
    useEffect(()=>{
        if(localStorage.getItem("kitchen_acces")==="true"){
            setAuthenticated(true);
        }
    },[])
    const handleChange=(value)=>{
        setPassword(value);
    }

    const markAsDone = async (orderId) => {
    const { error } = await supabase
        .from('orders')
        .update({ status: 'zrobione' }) 
        .eq('id', orderId);             

    if (error) {
        console.error("Błąd aktualizacji:", error.message);
    } else{
        setOrders(prevOrders => 
        prevOrders.map(order => 
            order.id === orderId ? { ...order, status: 'zrobione' } : order
        )
    );
    }
};



    const[isNew,setNew] = useState((false));
    const[isDone,setDone] = useState((false));


    const ordersToDisplay = orders.filter(item=>{
        if(isNew && item.status === 'nowe') return true;
        if(isDone && item.status === 'zrobione') return true;
        return false;
    })


    const handleNewCheckBox = () =>{
        setNew(!isNew);
        setDone(false);
    }
    const handleDoneCheckBox = () =>{
        setDone(!isDone);
        setNew(false);
    }

    


    if(!authenticated){
        return(
            <div className="kitchenLoginBox">
                <div className="kitchenLoginBoxTitle">Zaloguj się do Kuchni:</div>
                <input className="kichtenLoginBoxInput" type="text" onChange={(e)=>handleChange(e.target.value)} />
            </div>
        );
    }else{




        return(
            <div className="kitchen" >
                <div>
                    <label className="radioNewTitle">nowe</label>
                    <input className="radioNew" onChange={()=>handleNewCheckBox()} type="radio" name="checkBox"/>
                    <label className="radioDoneTitle"> zrobione</label>
                    <input className="radioDone" onChange={()=>handleDoneCheckBox()} type="radio" name="checkBox"/>
                </div>
                

                

                {ordersToDisplay.map((order)=>(
                    <div className="orderBlock"  key={order.id}>
                        <div className="orderNr">Zamówienie nr #{order.id}</div>
                        <ul className="order-ul">
                            {order.items.map((item,id)=>(  
                                <li className="order-li" key={id}>
                                    <div className="orderName">{getProductName(item.id)}</div><div className="orderSize">{item.size}</div> <div className="orderQty">{item.qty}x</div>  <div className="orderSauces">Sosy: {item.sauces}</div>
                                </li>    
                            ))}
                        </ul>
                        <div className="orderSauces">
                            {` ${order.email}`}
                            
                            
                        </div>
                        <div>
                            {order.contact !== "false"?(
                                ` ${order.contact}`
                            ):(
                                "Do odbioru w lokalu"
                            )}
                        </div>
                        <div className="orderStatus">{order.status}</div>
                        {order.status !== 'zrobione' &&(
                        <button className="doneButton" onClick={()=>markAsDone(order.id)}>ZROBIONE</button>
                        )}

                    </div>
                    ))}
                {
                    isBlock &&
                    (
                    <BlockedProducts
                    onClose={()=>setIsBlock(false)}
                    >

                    </BlockedProducts>
                    )
                    
                }
                <div
                    className="openBtnBox" 
                >
                    <BlockButton
                    onOpen={()=>setIsBlock(true)}
                    >

                    </BlockButton>
                </div>
                

            </div>
        );
    }
    
}