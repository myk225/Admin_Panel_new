import { GridColDef } from '@mui/x-data-grid'
import './edit.scss'
import { useContext, useState } from 'react'
import { Category } from '../../pages/Categories/Category'
import { CategoryContext } from '../../contexts/CategoryContext/CategoryContext'

type Props={
    slug:string,
    columns:GridColDef[],
    setEdit:React.Dispatch<React.SetStateAction<boolean>>,
    currCategory:{
        id : number,
        name: string,
        image: string
    }
 }

export const Edit=(edit:Props)=>{
            const {EditCategories}=useContext(CategoryContext);
        const [fields,setFields]=useState({
            name: edit.currCategory.name,
            id: edit.currCategory.name,
            image: edit.currCategory.image
        });
    const handleSubmit=async(e: React.FormEventHandler<HTMLFormElement>)=>{
        e.preventDefault();
        //code to edit category here
        const editForm=document.getElementById(`editForm`);
        const formData=new FormData(editForm);
        formData.set("oldImage",edit.currCategory.image);
        EditCategories(formData);
        setTimeout(()=>{
            edit.setEdit(false);
        },500)
       
     
     

    };
    const handleChange=(e : React.ChangeEventHandler<HTMLInputElement>)=>{
        const value=e.target.value;
        setFields({...fields,name:value});
    }
        return(
            <div className='add'>
            <div className="modal">
                <span className='close' onClick={()=>edit.setEdit(false)}>X</span>
                <h1>Edit {edit.currCategory.name}</h1>
                <form onSubmit={handleSubmit} id='editForm'>
                    {
                        edit.columns
                        .map((col)=>{
                            
                                if(col.field==="id"){
                                    return(
                                        
                                     <div className="item">
                                     <label htmlFor={col.field}>{col.headerName}</label>
                                     <input name={col.field} id={col.field} type={col.type} value={edit.currCategory.id} placeholder={edit.currCategory.id.toString()} readOnly/>
                                 </div>
                                    )
                                }else if(col.field==="image"){return(
                                    <div className="item">
                                        <label htmlFor={col.field}>{col.headerName}</label>
                                        <input name={col.field}  id={col.field} type={col.type}  />
                                    </div>
                                )}else{
                                        
                                    return(
                                        <div className="item">
                                        <label htmlFor={col.field}>{col.headerName}</label>
                                        <input name={col.field} onChange={handleChange} placeholder={`${edit.currCategory[`${col.field}`]}`} id={col.field} type={col.type} />
                                    </div>
                                    )
                                }
                            
                        })
}                   <button>update</button>
                </form>
            </div>
        </div>
        )
}