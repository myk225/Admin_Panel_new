import './products.scss'
import {Authentication} from '../../contexts/authContext/authContext'
import { useContext, useState } from 'react'
export const Products=()=>{
    const [creds,setCreds]=useState({email:"",password:""})
    const myAuth=useContext(Authentication);
        function handleChange(e){
            setCreds({...creds,[e.target.name]:e.target.value})
        }
       const handleClick=(e)=>{
        e.preventDefault();
        
        myAuth.authenticate(creds)
       }
        return(
           
            <div>
                Hello i am products page 
                <form>
                    <label htmlFor="email">email</label>
                    <input type="text" name='email' value={creds.email} id='email' onChange={handleChange} />
                    <label htmlFor="password">password</label>
                    <input type="text" value={creds.password} name="password" id="password" onChange={handleChange} />
                    <button onClick={handleClick}>LOG IN</button>
                </form>
               
            </div>
           
        )
}