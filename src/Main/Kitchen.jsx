import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Kitchen(){
    const [orders,setOrders]= useState([]);

    const getOrders = async () =>{
        const {data,error} = await supabase
        .from('orders')
        .select('*')
        .order('created_at' , {ascending:false});

        if(data) setOrders(data);
    };

    useEffect(()=>{
        const channel = supabase
        .channel('kuchnia_orders')
        .on('postgres_changes',
            {event: 'INSERT', schema:'public', table:'orders'},
            (payload) =>{
                console.log('Zmiana w bazie!', payload);
                setOrders((orders)=> [payload.new,...orders]);
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

    if(!authenticated){
        return(
            <div>
                <input type="text" onChange={(e)=>handleChange(e.target.value)} />
            </div>
        );
    }else{
        return(
            <div>
                DZIALA

            </div>
        );
    }
    
}