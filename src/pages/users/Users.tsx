import Datatable from '../../components/dataTable/Datatable'
import './user.scss'
import {  GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { userRows } from '../../data';
import { useState } from 'react';
import { Add } from '../../components/add/Add';
import { Edit } from '../../components/edit/edit';

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'avatar',headerName:'Avatar',width:100,renderCell:(params)=>{
      return <img src={params.row.img || "/noavatar.png"} alt="" />
    }},
    { field: "actons",headerName:"Actions",width:100,renderCell: ()=>{
      return <div className="action">hell</div>
    }},
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];
export const Users=()=>{
    const [open,setOpen]=useState(false);
    const [edit,setEdit]=useState(false);
    return(
        <div className='users'>
            <div className="info">
            <h1>users</h1>
            <button onClick={()=>setOpen(true)}>Add new User</button>

            </div>
            {<Datatable slug="users" rows={userRows} columns={columns} setEdit={setEdit}/>}
            {open && <Add slug="users" columns={columns} setOpen={setOpen} />}
            {edit && <Edit slug="category" columns={columns} setEdit={setEdit}/>}
        </div>
    )
}
