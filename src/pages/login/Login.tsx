import './login.scss'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//$2y$12$VZ4t32yfrHVie.442oPFf.r1j2H2ugEnsdAjA58KlO3PqgeiUJlEK
export const Login = () => {
  const navigate=useNavigate();
  const [inputs,setInputs]=useState({isAdmin:true});
  
  const handleChange=(e)=>{
    setInputs({...inputs,[e.target.name]:e.target.value});
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(inputs);
    let url;
   
      url=`http://localhost:3500/admin/login`;
    try {
      
     const response=await fetch(url,{
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify(inputs)
     })
     const res=await response.json();
     if(res.token){
      localStorage.setItem("token",res.token);
      localStorage.setItem("isAdmin",inputs.isAdmin.toString());
      localStorage.setItem("isTrader",(!inputs.isAdmin).toString())
      alert(res.message);
     inputs.isAdmin? navigate("/admin") : navigate("/trader")
     }else{
      alert(res.message)
     }
    } catch (error:any) {
        alert(error.message);
    }
    
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
      <h3>Trader? </h3>
      <div className="btn-grp">
      <button onClick={()=>navigate('/register')}>Register</button>
      <button onClick={()=> navigate('/trader/login')}>Trader Login</button>
      </div>
    </div>
    <div className="right">
      <h1>Login Here</h1>
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
