import { createContext, useState } from "react";

export const OrderContext=createContext({});

export const OrderContextProvider=({children})=>{
    const [orders,setOrders]=useState([]);
    async function LoadOrders(){
        const response=await fetch(`http://localhost:3500/admin/orders`,{
            method:"GET",});
            const {data}=await response.json();
            setOrders(data);
    }
    async function assignOrders(inputs){
        const response=await fetch(`http://localhost:3500/admin/assign-order`,{
            method: "PATCH",
            mode : "cors",
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(inputs)
        })
        const res=await response.json();
        if(res.status===201){
            alert(res.message);
            LoadOrders();
            
        }
    }
    return(
        <OrderContext.Provider value={{LoadOrders,orders,assignOrders}}>
                {children}
        </OrderContext.Provider>
    )

}