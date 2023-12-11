import { useEffect, useMemo, useRef, useState } from "react"
import './TraderProfile.scss'
import { TraderUploads } from "../TraderUploads/TraderUploads";
import { useParams } from "react-router-dom";

export const TraderProfile = () => {
  
  
  let isAdmin=localStorage.getItem("isAdmin");
  let isTrader=localStorage.getItem("isTrader");
  
    const {id}=useParams();
    const [open,setOpen]=useState(false);
    const [open2,setOpen2]=useState(false);
    const [open3,setOpen3]=useState(false);
    useEffect(()=>{
      fetchTraderDetails();
     
    },[id])
     const [user_details,setUser_details]=useState(JSON.parse(localStorage.getItem("user"))??{isSubmitted:0});
     let {isAccepted,isActive,isSubmitted}=JSON.parse(localStorage.getItem("user"))??user_details;
     
     console.log(user_details["doc_1"]);
     var x=(isSubmitted===1)
     console.log(x)
 
    const modalRef=useRef(null);

    async function fetchTraderDetails(){
        const response=await fetch(`http://191.101.14.6:3500/fetchTraderDetails/${id}`);

      const res=await response.json();
      console.log()
      setUser_details(res);
    }
    console.log(user_details);  
    console.log(isSubmitted); 
   const closeModal=(e)=>{
    const value=e.target.id;
    if(value==="docModal"){
      setOpen(false);
      setOpen2(false);
      setOpen3(false);
    }
   }
   const handleSubmit=async(e)=>{
    e.preventDefault();
   }
  return (

    
    <div className="main--div">
        <div className="top">
           {
            
            <div className="personail--info--form">
            
            <div className="info--main">
            <h2>personal details of trader</h2>
               {
                  Object.keys(user_details).map((key)=>{
                    return <p>{key} : {user_details[key]}</p>
                  })
               }

            </div>
            <hr />
            {
              isSubmitted===0||isSubmitted===null?
              <TraderUploads isSubmitted={isSubmitted} isAdmin={isAdmin}/>:
              <div className="list">
              <div className="select" id="" onClick={()=>setOpen(true)}>
                pdf
              </div>
              <div className="select" id="" onClick={()=>setOpen2(true)}>
              image
              </div>
              <div className="select" id="" onClick={()=>setOpen3(true)}>
              docx
              </div>
            </div>
            }
            
        </div>
        
        // <div className="details--info">

        // </div>
           }
        </div>
       <div className="bottom">
       { open&& <div className="add" id="docModal" onClick={closeModal}>

         <div ref={modalRef} id="docModalBody" className="modal" style={{width : "80vw",height:"95vh",overflow:"scroll"} }>
            <span className="close" onClick={()=>setOpen(false)}>X</span>
         <object data={user_details["doc_1"]} width="100%" height="100%" ></object>
         
          </div>
        
        </div>
      }
      { open2&& <div className="add" id="docModal" onClick={closeModal}>

      <div ref={modalRef} id="docModalBody" className="modal" style={{width : "80vw",height:"95vh",overflow:"scroll"} }>
       <span className="close" onClick={()=>setOpen2(false)}>X</span>
       <img src="http://191.101.14.6:3500/uploads/docs_verify_4/4-verification.png" alt="" />
      </div>

            </div>
      }
        {
          open3&& 
          <div className="add" id="docModal" onClick={closeModal}>
            
          <div ref={modalRef} id="docModalBody" className="modal" style={{width : "80vw",height:"95vh",overflow:"scroll"} }>
          <span className="close" onClick={()=>setOpen3(false)}>X</span>
          <img src="http://191.101.14.6:3500/uploads/docs_verify_4/4-verification.png" alt="" />
         </div>
         </div>
        }
       {
       (isAdmin==="true")&&isSubmitted===1 ? 
       <div className="Admin--Actions">
        Admin action form
        <form onSubmit={handleSubmit}>
          <button className="select">Accept the Above documents</button>
          <button>rejeect the above documents</button>

        </form>
       </div>:
        (isTrader==="true")&&isSubmitted===0?
        <div className="Admin--Actions">
          <h2>Trader did not upload docs</h2>
        </div>:
        <div>
          hello wait until admin verifies u
        </div>

       }
       </div>
     
    </div>
  )
}
