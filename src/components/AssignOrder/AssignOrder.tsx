import { GridColDef } from '@mui/x-data-grid'
import './assignOrders.scss'
import { useContext, useState } from 'react'
import { OrderContext } from '../../contexts/OrderContext/OrderContext'


type Props={
    slug:string,
    columns:GridColDef[],
    setEdit:React.Dispatch<React.SetStateAction<boolean>>,
    currItem:{
        id : number,
        name: string,
        image: string
    },
    traders:[]
 }

export const AssignOrder=(edit:Props)=>{
    let traders=[{id : 1000,name :"Yaseen"},{id : 2000 ,name:"Jhon"}];
        const [fields,setFields]=useState({
           id: edit.currItem.id
        });
        const {assignOrders}=useContext(OrderContext);
    const handleSubmit=async(e: React.FormEventHandler<HTMLFormElement>)=>{
         e.preventDefault();
         console.log(fields);
        
         assignOrders(fields);
        setTimeout(()=>{
            edit.setEdit(false);
        },500)
       
     
     

    };
    const handleChange=(e : React.ChangeEventHandler<HTMLInputElement>)=>{
        const value=e.target.value;
        setFields({...fields,[e.target.name]:value});
    }
        return(
            <div className='add'>
            <div className="modal">
                <span className='close' onClick={()=>edit.setEdit(false)}>X</span>
                <h1>Assign Order {edit.currItem.id}</h1>
                <form onSubmit={handleSubmit} id='AssignOrder'>
                    {
                        edit.columns.filter((col)=>col.field==="id")
                        .map((col)=>{
                            
                                if(col.field==="id"){
                                    return(
                                        
                                     <div className="item">
                                     <label htmlFor={col.field}>{col.headerName}</label>
                                     <input name={col.field} id={col.field} type={col.type} value={edit.currItem.id} placeholder={edit.currItem.id.toString()} readOnly/>
                                     </div>
                                    
                                    )
                                }
                            
                        })
    }                    <div className="item">
                            <label htmlFor="trader">Select Trader</label> 
                            <select name="trader_id" id="trader" value={fields.trader_id} onChange={handleChange} >
                    <option value="">please select</option>
                    {
                        edit.traders.filter((trader)=>trader.isActive===1)
                        .map((elem)=>{
                            return <option value={elem.id}>{elem.name}</option>
                        })
                    }
                </select>      
                         </div>                   
<button>update</button>
                </form>
            </div>
        </div>
        )
}