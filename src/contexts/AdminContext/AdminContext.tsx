import { createContext, useContext, useEffect } from "react";
import {useState} from "react";
import { CategoryContext } from "../CategoryContext/CategoryContext";

export const AdminContext=createContext({});

export const AdminContextProvider=({children})=>{
    const {LoadTraders}=useContext(CategoryContext);
    const [traderServices,setTraderServices]=useState([]);
    const [service,setService]=useState({});

    const fetchTraderServices=async()=>{
        const response=await fetch(`http://localhost:3500/allTraderServices`);
        const res=await response.json();
        
        setTraderServices(res);  
        console.log("FETCHED Services");
    }
    const activeUnactiveTraders=async(id,active)=>{
        console.log("hello")
        console.log(active);
        let body={isActive:active};
        console.log(JSON.stringify(body));

        
        try {
            const response=await fetch(`http://localhost:3500/active/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(body)
            }
            );
            const res=await response.json();
            if(res.status===201){
                alert(res.message);
                LoadTraders();

            }else{
                alert(res.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    const activeUnactiveTraderServices=async(data,isAccept)=>{
        console.log(data);
        const response=await fetch(`http://localhost:3500/setTraderServices/?isAccept=${isAccept}`,{
            method:"PATCH",
            headers: {
                "Content-Type": "application/json",
            },body:JSON.stringify(data) });
            const res=await response.json();
            alert(res.message);
            if(res.status===201){
                fetchTraderServices();
            }
    }
    const fetchSingleService=async(id)=>{
        const response=await fetch(`http://localhost:3500/getService/${id}`);
        const res=await response.json();
        
        setService(res[0]);

    }
    return(
        <AdminContext.Provider value={{fetchTraderServices,traderServices,fetchSingleService,service,activeUnactiveTraders,activeUnactiveTraderServices}}>
            {children}
        </AdminContext.Provider>
    )
}