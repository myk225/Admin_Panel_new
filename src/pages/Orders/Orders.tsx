import './orders.scss'
import {  GridColDef } from '@mui/x-data-grid';
import Datatable from '../../components/dataTable/Datatable'

import { useContext, useEffect, useState } from 'react';

import { AssignOrder } from '../../components/AssignOrder/AssignOrder';
import { OrderContext } from '../../contexts/OrderContext/OrderContext';
// const orders=[
//   {
//     "id": 75,
//     "partner_id": 2000,
//     "employee_id": 100000,
//     "user_id": 22,
//     "total": 200,
//     "tax_percentage": "15",
//     "tax_amount": "",
//     "final_total": 200,
//     "payment_method": "cod",
//     "address_id": 9,
//     "address": "df",
//     "date_of_service": "2023-08-31T20:00:00.000Z",
//     "starting_time": "16:17:00",
//     "ending_time": "00:30:00",
//     "duration": "30",
//     "status": "completed",
//     "remarks": "",
//     "created_at": "2023-08-31T07:48:02.000Z",
//     "username": "user"
//   },
//   {
//     "id": 78,
//     "partner_id": 2,
//     "employee_id": 0,
//     "user_id": 22,
//     "total": 200,
//     "tax_percentage": "15",
//     "tax_amount": "",
//     "final_total": 200,
//     "payment_method": "cod",
//     "address_id": 9,
//     "address": "df",
//     "date_of_service": "2023-08-31T20:00:00.000Z",
//     "starting_time": "17:28:00",
//     "ending_time": "00:30:00",
//     "duration": "30",
//     "status": "completed",
//     "remarks": "",
//     "created_at": "2023-08-31T09:58:32.000Z",
//     "username": "user"
//   },
//   {
//     "id": 79,
//     "partner_id": 1000,
//     "employee_id": 0,
//     "user_id": 22,
//     "total": 119,
//     "tax_percentage": "15",
//     "tax_amount": "",
//     "final_total": 119,
//     "payment_method": "stripe",
//     "address_id": 9,
//     "address": "df",
//     "date_of_service": "2023-09-06T20:00:00.000Z",
//     "starting_time": "17:29:00",
//     "ending_time": "00:45:00",
//     "duration": "45",
//     "status": "Trader assigned",
//     "remarks": "",
//     "created_at": "2023-08-31T09:59:13.000Z",
//     "username": "user"
//   },
//   {
//     "id": 80,
//     "partner_id": 1000,
//     "employee_id": 0,
//     "user_id": 22,
//     "total": 180,
//     "tax_percentage": "15",
//     "tax_amount": "",
//     "final_total": 180,
//     "payment_method": "cod",
//     "address_id": 9,
//     "address": "df",
//     "date_of_service": "2023-09-06T20:00:00.000Z",
//     "starting_time": "17:29:00",
//     "ending_time": "00:30:00",
//     "duration": "30",
//     "status": "Trader assigned",
//     "remarks": "",
//     "created_at": "2023-08-31T09:59:43.000Z",
//     "username": "user"
//   },
//   {
//     "id": 81,
//     "partner_id": 1000,
//     "employee_id": 0,
//     "user_id": 22,
//     "total": 119,
//     "tax_percentage": "15",
//     "tax_amount": "",
//     "final_total": 119,
//     "payment_method": "cod",
//     "address_id": 9,
//     "address": "df",
//     "date_of_service": "2023-09-06T20:00:00.000Z",
//     "starting_time": "17:29:00",
//     "ending_time": "00:45:00",
//     "duration": "45",
//     "status": "Completed",
//     "remarks": "",
//     "created_at": "2023-08-31T10:00:04.000Z",
//     "username": "user"
//   },]
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
// let traders=[{id : 1000,name :"Yaseen"},{id : 2000 ,name:"Jhon"}];
export const Orders = () => {
  const [open,setOpen]=useState(false);
  const [traders,setTraders]=useState([]);
  const getTraders=async()=>{
    const response=await fetch(`http://191.101.14.6:3500/getAllTraders`);
    const res=await response.json();
    setTraders(res.alltraders);
  }
  const {orders,LoadOrders}=useContext(OrderContext);
  useEffect(()=>{
    LoadOrders();
    getTraders();
  },[])
  const [currItem,setCurrItem]=useState({
   
});
console.log(traders);
  return (
    <div className='orders'>
      <h2>Orders</h2>
       {orders ? <Datatable setEdit={setOpen} setCurrItem={setCurrItem} columns={columns} rows={orders} slug="orders"/>:<div>Loading....</div>}
      {open? <AssignOrder slug='slug' traders={traders} columns={columns} currItem={currItem} setEdit={setOpen}/>:""}
      
    </div>
  )
}
