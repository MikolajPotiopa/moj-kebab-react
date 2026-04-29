import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Kitchen(){
    const [orders,setOrders]= useState([]);

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
        const channel = supabase
        .channel('kuchnia_orders')
        .on('postgres_changes',
            {event: 'INSERT', schema:'public', table:'orders'},
            (payload) =>{
                console.log('Zmiana w bazie!', payload);
                setOrders((prevOrders)=> [payload.new,...prevOrders]);
            }
        )
        .subscribe();

        return () => supabase.removeChannel(channel);
    },[])
    



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
            // Jeśli to jest to zamówienie, które właśnie kliknęliśmy, zmień mu status
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
            <div>
                <input type="text" onChange={(e)=>handleChange(e.target.value)} />
            </div>
        );
    }else{




        return(
            <div className="kitchen" >
                <label className="radioNewTitle">nowe</label>
                <input className="radioNew" onChange={()=>handleNewCheckBox()} type="radio" name="checkBox"/>
                <label className="radioDoneTitle"> zrobione</label>
                <input className="radioDone" onChange={()=>handleDoneCheckBox()} type="radio" name="checkBox"/>

                

                {ordersToDisplay.map((order)=>(
                    <div className="orderBlock"  key={order.id}>
                        <div className="orderNr">Zamówienie nr #{order.id}</div>
                        <ul className="order-ul">
                            {order.items.map((item,id)=>(  
                                <li className="order-li" key={id}>
                                    <div className="orderName">{item.name}</div><div className="orderSize">{item.size}</div> <div className="orderQty">{item.qty}x</div>  <div className="orderSauces">Sosy: {item.sauces}</div>
                                </li>    
                            ))}
                        </ul>
                        <div className="orderStatus">{order.status}</div>
                        {order.status !== 'zrobione' &&(
                        <button className="doneButton" onClick={()=>markAsDone(order.id)}>ZROBIONE</button>
                        )}

                    </div>
                    ))}
                
                

            </div>
        );
    }
    
}