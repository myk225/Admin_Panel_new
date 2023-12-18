import {  GridColDef } from '@mui/x-data-grid';
import Datatable from '../../components/dataTable/Datatable'
import { useContext, useEffect, useState } from 'react';
import { TraderContext } from '../../contexts/TraderContext/TraderContext';
import { TraderAcceptOrder } from './TraderAcceptOrder';

const columns:GridColDef[]=[
    {field :"id",headerName:"id"},
    {field :"date_of_service",headerName:"Order Date",width:100},
    {
    field:"payment_method",headerName:"Payment Type",width:120
    },
    {
    field:"username",headerName:"Customer-Name",width:120,
    },
    {
      field:"address",headerName:"Address",width: 150,
    },
    {
      field:"status",headerName:"Status",width: 150,
    },
    {
      field:"final_total",headerName:"Total Amount",width:100
    },
    
  ]
  
export const TraderOrders = () => {

  const {traderOrders,fetchTraderOrders,fetchEmployees}=useContext(TraderContext);
  const [currItem,setCurrItem]=useState({
   
  });
  const [open,setOpen]=useState(false);
  useEffect(()=>{
    fetchTraderOrders();
    fetchEmployees();
  },[])
  return (
    <div>
      
      {traderOrders ? <Datatable setEdit={setOpen} setCurrItem={setCurrItem} columns={columns} rows={traderOrders} slug="traderOrders"/>:<div>Loading....</div>}
      {open&&<TraderAcceptOrder id={1} currItem={currItem} columns={columns} setEdit={setOpen}/> }
    </div>
  )
}
