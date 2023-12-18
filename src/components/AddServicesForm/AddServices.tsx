import { useContext, useEffect, useMemo } from 'react';
import './addservices.scss';
import { CategoryContext } from '../../contexts/CategoryContext/CategoryContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TraderContext } from '../../contexts/TraderContext/TraderContext';

function useQuery(){
  const {search}=useLocation();
  return useMemo(()=> new URLSearchParams(search),[search])
}
export const AddServices = () => {

  const navigate=useNavigate();
  const {id}=useParams();
  const query=useQuery();
    const {services,fetchSubCatServices}=useContext(TraderContext);
    console.log(services);
    useEffect(()=>{
      fetchSubCatServices(id)
    },[])
  return (
    <div>
        <h1>{query.get("category")}</h1>
        <div className='servicesInfo'>
        
        
        {
            services.map((item)=>
            <div className="item">
                <img src={item.image} alt="" />
                <div className='navigator'>
                <p>{item.title}</p>
              <button onClick={()=>navigate(`/trader/services/${item.id}`)}>check</button>
                </div>
              
            </div>
                )
        }

        
    </div>
    </div>
  )
}
