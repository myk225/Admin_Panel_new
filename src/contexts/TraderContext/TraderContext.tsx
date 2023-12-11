import { createContext, useEffect, useState } from "react";

export const TraderContext=createContext({});

export const TraderContextProvider=({ children})=>{
    const [traderOrders,setTraderOrders]=useState([]);
    const [employees,setEmployees]=useState([]);
    const [services,setServices]=useState([]);
    const [serviceActive,setServiceActive]=useState({});
    const [registeredServices,setRegisteredServices]=useState([]);
    const authToken=localStorage.getItem("token");
    async function fetchTraderOrders(){
       
        const response=await fetch(`http://191.101.14.6:3500/provider/orders`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization":localStorage.getItem("token")
            },
        })
        
        const res=await response.json();
        setTraderOrders(res);
    }
    async function acceptOrder(id,isAccept){
        const response=await fetch(`http://191.101.14.6:3500/provider/trader/accept/${id}?isAccept=${isAccept}`,{
            method:"PATCH"
        });
        const res=await response.json();
        if(res.status===201){
            alert(res.message);
            fetchTraderOrders();
        }
        alert(res.message);

    }
    async function assignEmployee(inputs){
        const response=await fetch(`http://191.101.14.6:3500/provider/trader/order/assignEmployee`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputs)
        })
        const res=await response.json();
        
        if(res.status===201){

            alert(res.message);
            fetchTraderOrders();
        }else if(res.status===400){

            alert(res.message);
            fetchTraderOrders();
        }else{
            alert(res.message);
        }

    }
    async function fetchEmployees(){
        
        const response=await fetch(`http://191.101.14.6:3500/provider/trader/employees`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization":localStorage.getItem("token")
            },
        })
        const res=await response.json();
       
        setEmployees(res);
    }
    async function fetchRegisteredServices(){
        const response=await fetch(`http://191.101.14.6:3500/provider/trader/registered/services`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization":localStorage.getItem("token")
            },
        })
        const res=await response.json();
        setRegisteredServices(res);
    }
    const getTraderServiceInfo=async(id)=>{
        const response=await fetch(`http://191.101.14.6:3500/provider/getServiceInfo/${id}`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization":localStorage.getItem("token")
            },
        })
        const res=await response.json();
        if(res.error===false){
            setServiceActive(res);
        }else if(res.error===true){
            setServiceActive(res)
        }
       
    }
    //get services according to sub category id
    const fetchSubCatServices=async(id)=>{
        const response=await fetch(`http://191.101.14.6:3500/getServices/${id}`);
        const res=await response.json();
        setServices(res);
    }
    const requestService=async(inputs)=>{
        const response=await fetch(`http://191.101.14.6:3500/provider/addTraderServices`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization":localStorage.getItem("token")
            },body: JSON.stringify(inputs)
        })
        const res=await response.json();
        alert(res.message);
        if(res.error===false){
            getTraderServiceInfo(inputs.service_id);
        }
    }
    const activeEmployee=async(id,active)=>{
        let body={isActive:active};
        console.log(JSON.stringify(body));
        const response=await fetch(`http://191.101.14.6:3500/provider/activateEmp/${id}`,{
            method:"PATCH",
            headers: {
                "Content-Type": "application/json",
            },body:JSON.stringify(body) });
            const res=await response.json();
            alert(res.message);
            if(res.status===201){
                fetchEmployees();
            }
    }
    const addEmployee=async(inputs)=>{
        console.log(inputs);
        const response=await fetch(`http://191.101.14.6:3500/provider/addEmployee`,{
            method :"POST",
            headers:{
                "Authorization":localStorage.getItem("token")
            },
            body: inputs
        })
        const res=await response.json();
        console.log(res);
        if(res.status===201){
            fetchEmployees();
        }
        alert(res.message);
    }
    return <TraderContext.Provider value={{traderOrders,fetchTraderOrders,acceptOrder,assignEmployee,fetchEmployees,employees,getTraderServiceInfo,serviceActive,requestService,registeredServices,fetchRegisteredServices,fetchSubCatServices,services,activeEmployee,addEmployee}}>
                {children}
             </TraderContext.Provider>
}