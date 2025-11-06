import { Link, useNavigate } from 'react-router-dom';
import './datatable.scss'

import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import zIndex from '@mui/material/styles/zIndex';


type props={
  columns: GridColDef[],
  rows: object[],
  slug: string,
  setEdit:React.Dispatch<React.SetStateAction<boolean>>,
  setCurrItem:React.Dispatch<React.SetStateAction<{}>>
  
}

const Datatable = (props:props) => {
  const navigate=useNavigate();
  let display="none";
    const handleDelete=(id:number)=>{
      console.log(id);
    }
    const actionColumn:GridColDef={
      field:"action",
      headerName:"Action",
      width:200,
      renderCell:(params)=>{
        if(params.row.status==="completed"){
          return(
            <div className="action">
              Completed
            </div>
          )
        }
        if(props.action==false){
          return(
            <div className="action">
             <div className='edit'  style={{display:"",   "pointer-events": "none",
    opacity: 0.4}} onClick={()=>{props.setEdit(true);
                                    props.setCurrItem(params.row)}}>
            <img src="/view.svg" alt="" />
            </div>
            <div className="delete" onClick={()=>navigate(`/trader/services/${params.row.service_id}`)}>
              <img src="https://t4.ftcdn.net/jpg/03/46/94/29/360_F_346942945_CUomGigJstGLILauW3CoX7UBOh3QLA2O.jpg" alt="" />
            
            </div>
            </div>
          )
        }
        return(
          <div className="action" >
            
            <div className='edit' style={{display:""}} onClick={()=>{props.setEdit(true);
                                    props.setCurrItem(params.row)}}>
            <img src="/view.svg" alt="" />
            </div>
            <div className="delete" onClick={()=>handleDelete(params.row.id)}>
              <img src="/delete.svg" alt="" />
            </div>
          </div>
        )
      }
    }
  return (
    <div className='datatable'>
         <DataGrid
         density='comfortable'
        rows={props.rows}
        columns={[...props.columns,actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
       className='datagrid width'
       
       slots={{toolbar:GridToolbar}}
       slotProps={{
        toolbar:{
            showQuickFilter:true,
            quickFilterProps:{debounceMs: 600}
        }
       }}/>
    </div>
  )
}

export default Datatable