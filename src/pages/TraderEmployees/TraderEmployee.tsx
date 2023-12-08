import Datatable from "../../components/dataTable/Datatable";

import {  GridColDef } from '@mui/x-data-grid';
import { TraderContext } from "../../contexts/TraderContext/TraderContext";
import { useContext, useEffect, useState } from "react";
import { ActiveUnactive } from "../../components/ActiveUnactiveForm/ActiveUnactive";
import { Add } from "../../components/add/Add";

const columns:GridColDef[]=[
    {field:"id",headerName:"id"},
        {field:"name",headerName:"name"},
        {field:"email",headerName:"email",width:250},
        {field:"image",headerName:"Image",type:"file",width:100,renderCell:(item)=>{
            return(
                <img src={item.row.image} alt="" />
            )
        }},{
            field:"country_code",headerName:"Country Code"
        },{
            field:"phone",headerName:"phone"
        },{
            field:"isActive",headerName:"isActive"
        }
]
export const TraderEmployees=()=>{
    const {employees,fetchEmployees}=useContext(TraderContext);
    const [open,setOpen]=useState(false);
    const [openForm,setOpenForm]=useState(false);
    const [currItem,setCurrItem]=useState({});
    useEffect(()=>{
        fetchEmployees();
    },[])
    console.log(employees);
    return(
        <div className="employee-main">
            <div className="info">
                <h1>Trader Employees</h1>
                <button onClick={()=>setOpenForm(true)}>Add new</button>
            </div>
           {employees&& <Datatable setEdit={setOpen} setCurrItem={setCurrItem} columns={columns} rows={employees}/>}
            {
                open&&
                <ActiveUnactive slug="employee" columns={columns} currItem={currItem} setEdit={setOpen}/>
            }
            {
                openForm&&
                <Add slug="employee" setOpen={setOpenForm} columns={columns}/>
            }
        </div>
    )
}