import { useContext, useState } from 'react'
import './activeunactive.scss'
import { AdminContext } from '../../contexts/AdminContext/AdminContext'
import { TraderContext } from '../../contexts/TraderContext/TraderContext'


type Props={
    slug:string,
    columns:GridColDef[],
    currItem : {},
    setEdit:React.Dispatch<React.SetStateAction<boolean>>
 }

export const ActiveUnactive = (props : Props) => {
    const [active,setActive]=useState(props.currItem.isActive);
    console.log(active);
    const {activeUnactiveTraders}=useContext(AdminContext);
    const {activeEmployee}=useContext(TraderContext);
    function handleSwitch(){
        
        active===0?setActive(1):setActive(0);
    
    }
    function handleSubmit(e){
        
        e.preventDefault();
        if(props.slug==="employee"){
           
            activeEmployee(props.currItem.id,active);
        }
        if(props.slug==="traders"){
            activeUnactiveTraders(props.currItem.id,active);
        }
        

        setTimeout(()=>
        props.setEdit(false),300)
    }

  return (
    <div className='modal-main'>
        <div className="modal">
            <span className='close' onClick={()=> props.setEdit(false)}>X</span>
            <h1>Active/Unactive {props.slug}</h1>
            <form>
                {
                    props.columns.filter((col)=>col.field!=="image").map((col)=>{
                        return(
                            <div className='item'>
                                <p><span>{col.field} : </span> {props.currItem[col.field]}</p>
                                
                            </div>
                        )
                    })
                }
                {
                    props.columns.filter((col)=> col.field==="isActive").map(
                        (col)=> 
                        <div className="item">
                           
                            <input type="checkbox" name="isActive" id='toggleSwitch' defaultChecked={active} className='switch'/>
                            <label htmlFor="toggleSwitch" onClick={handleSwitch}>Is Active</label>
                            </div>
                        
                    )
                }
                <button onClick={handleSubmit}>confirm</button>
            </form>
        </div>
        
    </div>
  )
}
