import { useParams } from 'react-router-dom';
import './singleservice.scss';
import { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../contexts/AdminContext/AdminContext';

import Rating from '@mui/material/Rating';
import { TraderContext } from '../../contexts/TraderContext/TraderContext';

export const SingleService = () => {
    
    const {id}=useParams();
    function handlePrev(){
        const allSlides=document.querySelectorAll('.myslides');
        console.log(allSlides);
    }
    const {fetchSingleService,service}=useContext(AdminContext);
   const {serviceActive,getTraderServiceInfo,requestService}=useContext(TraderContext);
   function handleSubmit(e){
    e.preventDefault();
    console.log(inputs);
    if(inputs.consent){
        requestService(inputs);
    }else{
        alert("please check the tick");
    }
    
   }
    useEffect(()=>{
        fetchSingleService(id);
        getTraderServiceInfo(id);
    },[])
   
    const [inputs,setInputs]=useState({
        service_id : id,consent:false
    });
    function handleChange(e){
        setInputs({...inputs,[e.target.name]:e.target.value});
        console.log(inputs);
    }
    const handleSwitch=()=>{
        setInputs({...inputs,consent:!inputs.consent})
      }
  return (
    <div className='singleService'>
        <div className="left">
        <h2>{service.title}</h2>
        <img src={service.image} alt="alt" />
        <div className="userrating">
            <h2>User Rating</h2>
                {/* {
                   
                }
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Star_icon_stylized.svg/2153px-Star_icon_stylized.svg.png" alt="" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Star_icon_stylized.svg/2153px-Star_icon_stylized.svg.png" alt="" /> */}

            <Rating name="read-only"  size="large" value={service.rating} readOnly precision={0.5} />

        </div>
        <p><span>Price</span> : {service.price}</p>
        <p><span>Category : </span> category todo</p>
        <p><span>Description</span> : {service.description}</p>
       
        <p><span>Breif Description : </span>{service.long_description}</p>
        
        </div>
        <hr />
        <div className="right">
                <div className="top">
                    {!serviceActive.isRegistered ?
                     <div>
                        <h1>Register for this service</h1>
                       <form>
                        <div className="item">
                        <input type="number" onChange={handleChange} value={inputs.traderPrice} name='traderPrice' placeholder="Add your price here" />
                        </div>
                        <div className="item">
                        <input type="checkbox" name="consent"  onClick={handleSwitch} id="consent" />
                        <label htmlFor="consent">
                        i understand that it might take couple  hours for admins approval
                        </label>
                        </div>
                        <div className="item">
                            <button onClick={handleSubmit}>register</button>
                        </div>
                        </form> 
                   </div>
                   :
                   <div className='top'>
                        {
                            serviceActive.isActive===0?
                            <div className='info'>
                                
                                <p><span>Your Price : </span>{serviceActive.traderPrice}</p>
                                <p><span>Status : </span> Pending</p>
                                <p><span>message : </span> </p>
                                <p>We are currently viewing your request, this might take some time please have pateince.</p>
                                <p>regards,<br />
                                Admin
                                </p>
                            </div>: 
                            
                            <div className='info'>
                                
                                <p><span>Your Price : </span>{serviceActive.traderPrice}</p>
                                <p><span>Status : </span> Approved</p>
                                <p><span>message : </span> </p>
                                <p>Hello,</p>
                                <p>Congrats,your request has been approved</p>
                                <p>regards,<br />
                                Admin
                                </p>
                            </div>
                        } 
                   </div>
                   }
                </div>
            {/* <div className="slider">
            
                <div className="item">
                    <img className='myslides' src="https://static.toiimg.com/photo/75503656.cms" alt="" />
                </div>
                <div className="item">
                    <img className='myslides' src="https://media.wired.com/photos/61fa9154844ec857b713851b/master/pass/Science_GettyImages-924600910.jpg" alt="" />
                </div>
            </div> */}
                {/* <button onClick={handlePrev}>previous</button>
                <button>next</button> */}
               
        </div>
        
    </div>
  )
}
