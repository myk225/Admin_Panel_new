import Datatable from '../../components/dataTable/Datatable'
import './category.scss'
import {  GridColDef } from '@mui/x-data-grid';
import {ModalContext} from '../../contexts/ModalContext/ModalContext'
import { useContext, useEffect, useState } from 'react';
import { Add } from '../../components/add/Add';
import { Edit } from '../../components/edit/edit';
import { CategoryContext } from '../../contexts/CategoryContext/CategoryContext';
const columns:GridColDef[]=[
    {field :"id",headerName:"id"},
    {field :"image",headerName:"Image",type:"file",width:150,renderCell:(params)=>{
         
        return (
            <img src={params.row.image} alt="no" />
        )
    }},
    {
    field:"name",headerName:"Category title",width:200
    }
]
export const Category = () => {
    // to change the below code in to context
    const {LoadCategories,category}=useContext(CategoryContext);
    useEffect(()=>{
        LoadCategories();

    })
    
   
      
    // const [category,setCategory]=useState();
   
  
    // lets try
    // const {open,setOpen}=useContext(ModalContext);
    
    const [open,setOpen]=useState(false);
    const [edit,setEdit]=useState(false);
    const [currItem,setCurrItem]=useState({
        id : 0,
        name: "CategoryNameHere",
        image: "Image path"
    });
   
    return(
        <div className='users'>
            <div className="info">
            <h1>Categorries</h1>
            <button onClick={()=>setOpen(true)}>Add new User</button>

            </div>
            {category?<Datatable slug="category" setCurrItem={setCurrItem} rows={category} columns={columns} setEdit={setEdit} />: <button onClick={()=> {dispatch({type:"GETCATS"}); console.log(state); setCategory(state.category)}}>fetch</button>}
            {open && <Add slug="category" columns={columns} setOpen={setOpen} />}
            {edit && <Edit slug="category" currCategory={currItem} columns={columns} setEdit={setEdit}/>}
        </div>
    )
}
