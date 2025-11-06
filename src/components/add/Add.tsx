import { GridColDef } from '@mui/x-data-grid'
import './add.scss'
import { useContext, useState } from 'react'
import { CategoryContext } from '../../contexts/CategoryContext/CategoryContext'
import { TraderContext } from '../../contexts/TraderContext/TraderContext'


type Props={
   slug:string,
   columns:GridColDef[],
   setOpen:React.Dispatch<React.SetStateAction<boolean>>
}
export const Add=(props:Props)=>{
    const [inputs,setInputs]=useState({});
    const {AddCategories,subCategory,category,AddServices}=useContext(CategoryContext);
     const {addEmployee}=useContext(TraderContext);
    function handleChange(e){
        setInputs({...inputs,[e.target.name]:e.target.value})
    }
    

    const handleSubmit:FormEventHandler<HTMLFormElement>=(e: React.FormEventHandler<HTMLFormElement>)=>{
        e.preventDefault();
        //code to add category here 
        console.log(JSON.stringify(inputs));
        const form=document.getElementById(`AddForm`);
        const formData=new FormData(form);
        console.log(formData);  
        // Display the key/value pairs
for (const pair of formData.entries()) {
    console.log(`${pair[0]}, ${pair[1]}`);
  }     
    console.log(props.slug);
        if(props.slug==="category"){
            formData.set("parent_id","0");
            AddCategories(formData);
        }else if(props.slug==="services"){
            AddServices(formData);
        }else if(props.slug==="subCategory"){
            AddCategories(formData);
        }else if(props.slug==="employee"){
            addEmployee(formData);
        }
        
        setTimeout(()=>{
            props.setOpen(false);
        },500);
    };
    return(
        <div className='add'>
            <div className="modal">
                <span className='close' onClick={()=>props.setOpen(false)}>X</span>
                <h1>Add new {props.slug}</h1>
                <form  id="AddForm" onSubmit={handleSubmit}>
                    {
                        props.columns
                        .filter((item)=> item.field!=="id" && item.field !== "img" && item.field!=="parent_id" && item.field!=="isActive")
                        .map((col,i)=>{
                            return(
                                <div className="item" key={i}>
                                    <label htmlFor="">{col.headerName}</label>
                                    <input type={col.type} name={col.field} onChange={handleChange}/>
                                </div>
                            )
                        })
}                 
{
            props.slug==="subCategory"? <div className="item">
                <label htmlFor="parent_id">Select Category</label>
                <select name="parent_id" onChange={handleChange} id="parent_id">
                    <option value="">Please select a category</option>
                    {
                        category.map((item)=>{
                            return <option value={item.id}>{item.name}</option>
                        })
                    }
                </select>
            </div>:""
}
{
    props.slug==="services"?<div className="item">
    <label htmlFor="category_id">Select Category</label>
    <select name="category_id" onChange={handleChange} id="categoryId">
        <option value="">Please select a category</option>
        {
            subCategory.map((item)=>{
                return <option value={item.id}>{item.name}</option>
            })
        }
    </select>
</div>:""
}
  <button>Add</button>
                </form>
            </div>
        </div>
    )
}