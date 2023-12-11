import { createContext, useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";

export const Authentication=createContext({});

export const AuthContext=(props)=>{
    
    let currentUser1={};

    const [currentUser,setCurrentUser]=useState(JSON.parse(localStorage.getItem("user"))||null);
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser));
    },[currentUser])
    
    const logIn=async(inputs)=>{
    
        let url;
        
        url="http://191.101.14.6:3500/provider/trader/login"
      
       const response=await fetch(url,{
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body:JSON.stringify(inputs)
       })
       const res=await response.json();
       if(res.token){
        console.log(res.trader);
        currentUser1=res.trader;
        setCurrentUser(res.trader);
        localStorage.setItem("token",res.token);
        localStorage.setItem("isAdmin",inputs.isAdmin.toString());
        localStorage.setItem("isTrader",(!inputs.isAdmin).toString())
        alert(res.message);
        return true;
       }else{
        alert(res.message)
       }
    }
    
    return <Authentication.Provider value={{setCurrentUser,currentUser,currentUser1,logIn}}>
        {props.children}
    </Authentication.Provider>
}