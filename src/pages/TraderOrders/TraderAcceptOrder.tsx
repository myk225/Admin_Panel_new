import { useContext, useEffect, useState } from 'react'
import './TraderAcceptOrder.scss'
import { TraderContext } from '../../contexts/TraderContext/TraderContext'
type Props={
    columns:GridColDef[],
    setEdit:React.Dispatch<React.SetStateAction<boolean>>,
    currItem:{
        id : number,
        name: string,
        image: string
    },
 }
export const TraderAcceptOrder = (props:Props) => {
   
    const {acceptOrder,assignEmployee,employees}=useContext(TraderContext);
    
    const [inputs,setInputs]=useState({
        order_id : props.currItem.id
    });
    function handleChange(e){
       
        setInputs({...inputs,[e.target.name]:e.target.value});
    }
    function handleReject(e){
        e.preventDefault();
        if(inputs.isChecked==="on"){
            acceptOrder(props.currItem.id,false);
            setTimeout(()=>{
                props.setEdit(false);
            },500)
        }else{
            alert("please select checkbox")
        }
       
    }
    function handleAccept(e){
        e.preventDefault();
        if(inputs.isChecked==="on"){
            acceptOrder(props.currItem.id,true);
            setTimeout(()=>{
                props.setEdit(false);
            },500)
        }else{
            alert("please select checkbox")
        }
    }
    function handleAssign(e){
        e.preventDefault();
        console.log(inputs); 
        
        assignEmployee(inputs);
    }
  return (
    <div className="someClass">
        <div className="modal">
            <span className="close" onClick={()=>props.setEdit(false)}>X</span>
            <h2>Accept Order Modal {props.currItem.id}</h2>
            <form>
                {
                   
                    props.columns.map((col)=>{
                        let name=col.field;
                        return(
                            <div className="item">
                            <label htmlFor={col.field}>{col.headerName}</label>
                            <input name={col.field} id={col.field} type={col.type}  placeholder={`${props.currItem[`${name}`]}`} readOnly/>
                        </div>
                        )
                    })
                }
                {
                     props.currItem.status==="Trader assigned"&&
                     <div className="check">
                     <input type="checkbox" id='check' name='isChecked'  onChange={handleChange}/>
                     <label htmlFor='check'>  please acknol=wledge this order and once you accpet it you cannot reject back</label>
                   </div> 
                }
              
                
                {
                    props.currItem.status==="Trader Accepted"&&
                   <div className="item">
                    <label htmlFor="employee">Select Employee</label>
                     <select name="employee_id" onChange={handleChange} id="employee">
                    <option value="">Please select</option>
                    {
                        employees.map((emp)=>{
                            return <option value={emp.id}>{emp.name}</option>
                        })
                    }
                </select>
                   </div>
                }
                {
                    props.currItem.status==="Trader assigned"&&
                    <div className="btnGroup">
                    <button onClick={handleAccept}>Accept</button>
                    <button onClick={handleReject}>Reject</button> 
                    </div>
                }
               {
                props.currItem.status==="Trader Accepted"&&
                <button onClick={handleAssign}>Assign</button>
               }
            </form>
        </div>
    </div>
  )
}
