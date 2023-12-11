import { createContext, useEffect, useMemo, useState } from "react";


// creating a context 
export const CategoryContext=createContext({});

//this is context state of our provider
export const CategoryState=(props)=>{
    console.log(window.location.pathname);
    const [category,setCategory]=useState([]);
    const [subCategory,setSubCategory]=useState([]);
    const [services,setServices]=useState([]);
    const [traders,setTraders]=useState([]);
    const [message,setMessage]=useState("");
    useEffect(()=>{
        
       LoadCategories();
       LoadSubCategories();
       LoadServices();
    },[])
    const LoadCategories=async()=>{
        const response=await fetch(` http://localhost:3500/getCategories`);
        const res=await response.json();
        
        setCategory(res);  
        console.log("FETCHED categories");
    }
    const LoadSubCategories=async()=>{
        const response=await fetch(` http://localhost:3500/getSubCategories`);
        const res=await response.json();
        
        setSubCategory(res);  
        console.log("FETCHED Sub categories");
    }
    const LoadServices=async()=>{
        const response=await fetch(`http://localhost:3500/getServices`);
        const res=await response.json();
        console.log(res);
        setServices(res);  
        console.log("FETCHED Services");
    }
    const EditCategories=async(inputs)=>{
        // Display the key/value pairs
for (const pair of inputs.entries()) {
    console.log(`${pair[0]}, ${pair[1]}`);
  }
        const response=await fetch(`http://localhost:3500/updateCategory`,{
            method:"PATCH",
            body:inputs
        })
        const res=await response.json();
        if(res.status===201){
            console.log("Hello");
            
            alert(res.message);
            LoadCategories();
        }
        else{
      
            alert('Something wwent wrong')
        }

    }
    const AddSubCategory=async(inputs)=>{

    }
    const AddServices=async(inputs)=>{
        const response=await fetch(`http://localhost:3500/addServices`,{
            method:"POST",
            body:inputs
        });
        const res=await response.json();
        alert(res.message);
        LoadServices();
    }
    const AddCategories=async(inputs)=>{
        const response=await fetch(`http://localhost:3500/addCategories`,{
            method:"POST",
            body:inputs
        });
        const res=await response.json();
        if(res.slug==="category"){
            alert(res.message);
            LoadCategories();
        }else if(res.slug==="subCategory"){
            alert(res.message);
            LoadSubCategories();
        }else{
      
            alert('Something wwent wrong')
        }
    }
    const LoadTraders=async()=>{
        const response=await fetch(`http://localhost:3500/getAllTraders`);
        const res=await response.json();
        
        if(res.status===200){
            
            setTraders(res.alltraders);
        }else{
            alert(res.message);
        }
    }
    const LoadNewTraders=async()=>{
        const response=await fetch(`http://localhost:3500/getAllNewTraders`);
        const res=await response.json();
        
        if(res.status===200){
            const filteredTraders=res.allNewTraders.filter((item)=>item.isAccepted!==1);
            setTraders(filteredTraders);
        }else{
            alert(res.message);
        }
    }
    
            return(
                <CategoryContext.Provider value={{AddCategories,LoadCategories,LoadSubCategories,subCategory,EditCategories,category,message,services,AddServices,LoadTraders,traders,LoadNewTraders}}>
                        {props.children}
                </CategoryContext.Provider>
            )
}