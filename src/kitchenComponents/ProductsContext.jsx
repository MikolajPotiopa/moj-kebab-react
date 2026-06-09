

import { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from "../supabaseClient";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
    const [productsC, setProductsContext] = useState([]);

    const fetchInitialProducts = async () => {
        const { data } = await supabase.from('products').select('*');
        if (data) setProductsContext(data);
    };

    useEffect(() => {

        fetchInitialProducts();

        const channel = supabase
            .channel('global_products_changes')
            .on('postgres_changes', 
                { event: '*', schema: 'public', table: 'products' }, 
                (payload) => {
                    console.log('Zmiana wykryta przez Provider!', payload);
                    
                    if (payload.eventType === 'UPDATE') {
                        setProductsContext((prev) => 
                            prev.map(p => p.id === payload.new.id ? payload.new : p)
                        );
                    } else if (payload.eventType === 'INSERT') {
                        setProductsContext((prev) => [...prev, payload.new]);
                    }
                }
            )
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, []);

    useEffect(()=>{
        productsC.map(item=>{
            console.log(item.available);
        })
       console.log(productsC)
    },[productsC])
    const getNotAvailable = ()=>{
        const filtredProducts = productsC.filter(p => !p.available);
        return filtredProducts;
    }

    const fillProducts = (data) => setProductsContext(data);

    return (
        <ProductsContext.Provider value={{ productsC, fillProducts, getNotAvailable}}>
            {children}
        </ProductsContext.Provider>
    );
}

export const useProduct = () => useContext(ProductsContext);