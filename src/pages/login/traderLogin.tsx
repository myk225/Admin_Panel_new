import './login.scss'
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Authentication } from '../../contexts/authContext/authContext';
//$2y$12$VZ4t32yfrHVie.442oPFf.r1j2H2ugEnsdAjA58KlO3PqgeiUJlEK
export const TraderLogin = () => {
  const navigate=useNavigate();
  const [inputs,setInputs]=useState({isAdmin:false});
  const {logIn}=useContext(Authentication);
  const handleChange=(e)=>{
    setInputs({...inputs,[e.target.name]:e.target.value});
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(inputs);
    await logIn(inputs)
    
     navigate("/trader/dashboard")
    
  }
  const handleSwitch=()=>{
    setInputs({...inputs,isAdmin:!inputs.isAdmin})
  }
  return (
    <div className='login'>
    <div className="card">
    <div className="left">
      <h2>HELLO WELCOME TO PANEL</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis ea autem eius debitis vero aliquam vel, obcaecati, non repellat et amet, nemo similique optio libero iste natus sed tempora sapiente.

      </p>
      <span>Not registered? </span>
      <div className="btn-grp">
      <button onClick={()=>navigate('/register')}>Register</button>
      <button onClick={()=> navigate('/login')}>Admin Login</button>
      </div>
    </div>
    <div className="right">
      <h1>Trader Login Here</h1>
      <form id='registerForm'>
       
        <input type="email" name='email' placeholder='jhondoe@gmail.com' onChange={handleChange}/>
        
        <input type="password" name='password' placeholder=' password' onChange={handleChange}/>
        <input type="checkbox" name="isAdmin" id='toggleSwitch'  onClick={handleSwitch} className='switch'/>
        <button onClick={handleSubmit}>Login</button>
      </form>
    </div>
    </div>
  </div>
  )
}
