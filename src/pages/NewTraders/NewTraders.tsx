import {  GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import Datatable from '../../components/dataTable/Datatable'
import { useContext, useEffect,useState } from 'react';
import { CategoryContext } from '../../contexts/CategoryContext/CategoryContext';
import { Edit } from '../../components/edit/edit';
import { ActiveUnactive } from '../../components/ActiveUnactiveForm/ActiveUnactive';
import { useNavigate } from 'react-router-dom';



export const NewTraderList = () => {
  const navigate=useNavigate();
  const {LoadTraders,traders}=useContext(CategoryContext);
  const [open,setOpen]=useState(false);
  const [edit,setEdit]=useState(false);
  const [currItem,setCurrItem]=useState({
    id : 0,
    name: "CategoryNameHere",
    image: "Image path"
});
  useEffect(()=>{
    LoadTraders();
  },[])
  const columns: GridColDef[]=[
    {field:"id",headerName:"id",width:90},
    {field:"email",headerName:"email",width:180},
    {field:"name",headerName:"Trader Name",width:130},
    {field:"cityid",headerName:"City Id",width:80},
    {field:"isActive",headerName:"is Active",width:100,renderCell:(trader)=>{
        return(
          <span>{trader.row.isActive===0?"UNACTIVE":"ACTIVE"}</span>
        )
    }},
    {field:"phone",headerName:"Phone",width:130},
    {
        field:"country_code",headerName:"Country code",width:80
    },{
      field : "Profile",headerName: "Trader Profile",width:180,renderCell:(params)=>{
        return <div className='action'>
          {params.id}
            <img src="/view.svg" alt="" onClick={()=>navigate(`/admin/traderprofile/${params.id}`)}/>
        </div>
      }
    }
]
  return (
    <div>
        <h1>Trader List</h1>
            {traders&&<Datatable setCurrItem={setCurrItem} setEdit={setEdit} columns={columns} rows={traders}/>}
            {/* {edit && <Edit columns={columns} currCategory={currItem} slug='traders' setEdit={setEdit}/>}
             */}
             {
              edit && <ActiveUnactive columns={columns} currItem={currItem} slug='newtraders' setEdit={setEdit}/>
             }
    </div>
  )
}
