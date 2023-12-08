import './subcategory.scss'
import {  GridColDef } from '@mui/x-data-grid';
import Datatable from '../../components/dataTable/Datatable';

import { useContext, useEffect, useState } from 'react';
import { Add } from '../../components/add/Add';
import { Edit } from '../../components/edit/edit';
import { CategoryContext } from '../../contexts/CategoryContext/CategoryContext';

const columns:GridColDef[]=[
    {field :"id",headerName:"id"},
    {field:"parent_id",headerName:"parent id"},
    {
        field:"name",headerName:"Category title",width:200
        },
    {field :"image",headerName:"Image",type:"file",width:150,renderCell:(params)=>{
        console.log(params.row);   
        return (
            <img src={params.row.image} alt="no" />
        )
    }},
    
]


export const SubCategory = () => {
    useEffect(()=>{
        LoadCategories()
    },[])
    const {subCategory,LoadCategories}=useContext(CategoryContext);
    const [open,setOpen]=useState(false);
    const [edit,setEdit]=useState(false);
    const [currItem,setCurrItem]=useState({
        id : 0,
        name: "CategoryNameHere",
        image: "Image path"
    });
  return (
    <div className='subcategory'>
         <div className="info">
            <h1>Sub Categories</h1>
            <button onClick={()=>setOpen(true)}>Add new User</button>
            </div>
            {subCategory ? <Datatable slug="subCategory" columns={columns} rows={subCategory} setCurrItem={setCurrItem} setEdit={setEdit}/> : "" }
            {open && <Add slug="subCategory" columns={columns} setOpen={setOpen} />}
            {edit && <Edit slug="subCategory" currCategory={currItem} columns={columns} setEdit={setEdit}/>}
       
    </div>
  )
}

