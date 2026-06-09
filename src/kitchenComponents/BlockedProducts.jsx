import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { FaCheckCircle } from "react-icons/fa";
import { FaBan } from "react-icons/fa";
import { useProduct } from "./ProductsContext";
import { CgCloseO } from "react-icons/cg";


export default function BlockedProducts({onClose}){
    const [products, setProducts] = useState([]);
    const [filtredProducts, setFiltredProducts] = useState([]);
    const {fillProducts,productsC} = useProduct();


    const getProducts = async ()=>{
        const {data,error} = await supabase.from('products').select('*');
        setProducts(data);
    }
    const setAvailable = async (productId, value) =>{
 
        const {data,error} = await supabase.from('products').update({ available:value}).eq('id',productId);
        if(error){
            console.lof("Błąd updatu danych: ", error.message);
        } else {
            console.log("Zaktualizowano pomyślnie!");
        }
    }

    useEffect(()=>{
        getProducts();
        
    },[]);
    useEffect(()=>{
        const channel = supabase
        .channel('kuchnia_products')
        .on('postgres_changes',
            { event: '*', schema: 'public', table: 'products' }, 
            (payload) => {
                console.log('Zmiana w bazie!', payload);

                if (payload.eventType === 'INSERT') {

                    setProducts((prevProducts) => [payload.new, ...prevProducts]);
                } 
                else if (payload.eventType === 'UPDATE') {

                    setProducts((prevProducts) => 
                        prevProducts.map(product => 
                            product.id === payload.new.id ? payload.new : product
                        )
                    );
                }
            }
        )
        .subscribe();

        return () => supabase.removeChannel(channel);
        
    },[]);

   useEffect(()=>{

    const kategoriaOrder = ['Lawasze', 'Bułki', 'Burgery', 'Dodatki', 'Napoje'];

    const available = products.filter(p => p.available);
    const notAvailable = products.filter(p => !p.available);
    
   available.sort((a,b) =>{
    const indexA = kategoriaOrder.indexOf(a.kategoria);
    const indexB = kategoriaOrder.indexOf(b.kategoria);

    const priorityA = indexA === -1 ? 99 : indexA;
    const priorityB = indexB === -1 ? 99 : indexB;

    return priorityA - priorityB;
   });
   notAvailable.sort((a,b) =>{
    const indexA = kategoriaOrder.indexOf(a.kategoria);
    const indexB = kategoriaOrder.indexOf(b.kategoria);

    const priorityA = indexA === -1 ? 99 : indexA;
    const priorityB = indexB === -1 ? 99 : indexB;

    return priorityA - priorityB;
   });
   
    setFiltredProducts([...available, ...notAvailable]);
    fillProducts([...available, ...notAvailable]);
   },[products, ])


return(
    <div 
    
    className="mainBlockedProducts"
    onClick={()=>onClose()}
    >
        <div
        className="blockedProducts"
        onClick={(e) =>e.stopPropagation()}
        >
            <div
            onClick={()=>onClose()}
            className="blockedProductsCloseBtn"
            >
                <CgCloseO />
            </div>
        <div
        style={{paddingTop:30}}
        >
            {
            
            filtredProducts.map(product=>{
                
            return(
                <div
                    key={product.id} 
                    className="productBox"
                >
                   <div className="productBoxTitle">
                       {product.title}
                   </div>

                   {product.available ?(
                   <div className="productBoxIcons">
                        <div className="productBoxCheckGreen">
                            <FaCheckCircle  color="green" /> 
                        </div>
                       <div className="productBoxBanGray"> 
                            <FaBan onClick={()=>setAvailable(product.id,false)} color="gray" />
                       </div>
                   </div>
                   ):(
                   <div className="productBoxIcons">
                    <div className="productBoxCheckGray">
                        <FaCheckCircle onClick={()=>setAvailable(product.id,true)} color="gray" /> 
                    </div>
                       <div className="productBoxBanRed">
                            <FaBan color="red"/>
                       </div>

                   </div>
                   )}
                   
                </div>
                );
            })}
        </div>
            
        </div>
    </div>
    );
    
}