import { useContext, useState } from 'react';
import Datatable from '../../components/dataTable/Datatable'
import './services.scss'    
import {  GridColDef } from '@mui/x-data-grid';
import { Add } from '../../components/add/Add';
import { CategoryContext } from '../../contexts/CategoryContext/CategoryContext';
import { Edit } from '../../components/edit/edit';
// we need all the sub categories in order to add services

    const columns:GridColDef[]=[
        {field:"id",headerName:"id"},
        {field:"title",headerName:"Title"},
        {field:"description",headerName:"Decription"},
        {field:"image",headerName:"Image",type:"file",width:150,renderCell:(item)=>{
            return(
                <img src={item.row.image} alt="" />
            )
        }},{
            field:"price",headerName:"Price"
        },
        {
            field:"discounted_price",headerName:"Discount Price"
        },
        {
            field:"duration",headerName:"Duration"
        },{
            field:"max_quantity_allowed",headerName:"Max_Quantity"
        }
    ]
export const Services = () => {
    const {services}=useContext(CategoryContext);
    console.log(services);
    const [open,setOpen]=useState(false);
    const [edit,setEdit]=useState(false);
  const [currItem,setCurrItem]=useState({
   
});
  return (
    <div className='services'>
        <div className="info">
            <h1>Services</h1>
            <button onClick={()=>setOpen(true)}>Add new Service</button>

            </div>
        {
            services? <Datatable slug='services' setEdit={setEdit} columns={columns} rows={services} setCurrItem={setCurrItem}/> : ""
        }
        {
          open?<Add setOpen={setOpen} slug="services" columns={columns}/>:""
        }{
            edit&& <Edit slug='services' setEdit={setEdit} columns={columns} currCategory={currItem}/>
        }
    </div>
  )
}
