import { useContext } from "react"
import "./acceptservice.scss"
import { AdminContext } from "../../contexts/AdminContext/AdminContext"

type Props={
    slug : string,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    currItem:{

    }
}

export const AcceptService = (props:Props) => {
    const {activeUnactiveTraderServices}=useContext(AdminContext);
    const data={
        trader_id: props.currItem.trader_id,
        service_id : props.currItem.service_id,
        isAccept:1
    }
    function handleSubmit(isAccept){
        
        console.log(isAccept);
        
        
        activeUnactiveTraderServices(data,isAccept);
        setTimeout(()=>props.setOpen(false),500);
    }
 // we will import a function from context and use in buttons
  return (
    <div className="acceptService"  >
            <div className="modal">
                <span className="close" onClick={()=> props.setOpen(false)}>X</span>
                <h1>Some Heading</h1>
                <form >
                   <div className="item">
                    <label htmlFor="title">Title</label>
                    <input type="text" value={props.currItem.title} />
                   </div>
                   <div className="item">
                    <label htmlFor="title">Trader Name</label>
                    <input type="text" value={"YAseen"} readOnly/>
                   </div>
                   <div className="">
                   <input type="checkbox" name="" id="checkBox" />  
                    <label htmlFor="checkBox">This is my checkbox please check before</label>
                    
                   </div>
                   <div className="button-group">
                   <button type="submit" onClick={(e)=>{ e.preventDefault(); handleSubmit(1)}}>Accept</button>
                   <button type="submit" onClick={(e)=>{ e.preventDefault(); handleSubmit(0)}}>Reject</button>
                   </div>
                   
                </form>
            </div>
         
    </div>
  )
}
