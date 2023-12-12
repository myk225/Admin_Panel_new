import Datatable from "../../components/dataTable/Datatable"
import {  GridColDef } from '@mui/x-data-grid';
import { useContext, useState,useEffect } from 'react';
import { Add } from '../../components/add/Add';
import { AdminContext } from "../../contexts/AdminContext/AdminContext";
import { AcceptService } from "../../components/AdminServiceApproval/AcceptService";
// we need all the sub categories in order to add services
const columns:GridColDef[]=[
    {field:"id",headerName:"id"},
    {field:"trader_id",headerName:"traderId"},
    {field:"title",headerName:"Title",width:280},
    {field:"image",headerName:"Image",type:"file",width:150,renderCell:(item)=>{
        return(
            <img src={item.row.image} alt="" />
        )
    }},{
        field:"price",headerName:"Price"
    },{
        field:"traderPrice",headerName:"Trader Price",width:150
    },{
        field:"isActive",headerName:"is Active",width:100,renderCell:(service)=>{
            return(
              <span>{service.row.isActive==0?"UNACTIVE":"ACTIVE"}</span>
            )
        }
    },
    {
        field:"duration",headerName:"Duration"
    }
]
export const TraderServices = () => {
    const {traderServices,fetchTraderServices}=useContext(AdminContext);
    
    const [open,setOpen]=useState(false);
    useEffect(() => {
      fetchTraderServices();
      console.log(traderServices);
    }, [])
    
  const [currItem,setCurrItem]=useState({
   
});
  return (
    <div className='services'>
    <div className="info">
        <h1>Trader Services</h1>
        {/* <button onClick={()=>setOpen(true)}>Add new Service</button> */}

        </div>
    {
        traderServices? <Datatable setEdit={setOpen} slug='services' columns={columns} rows={traderServices} setCurrItem={setCurrItem}/> : ""
    }
    {/* {
      open?<Add setOpen={setOpen} slug="services" columns={columns}/>:""
    } */}
   
    {
      open && <AcceptService columns={columns} setOpen={setOpen} currItem={currItem}/>
    }
</div>
  )
}
