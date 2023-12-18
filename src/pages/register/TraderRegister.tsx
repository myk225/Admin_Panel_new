import { useState } from 'react';
import './register.scss'
import { useNavigate } from 'react-router-dom';
export const TraderRegister = () => {
  const navigate=useNavigate();
    const [inputs,setInputs]=useState({
    

    });
    const handleChange=(e)=>{
      setInputs({...inputs,[e.target.name]:e.target.value});
    }
  const handleSubmit=async(e)=>{
      e.preventDefault();
      const response=await fetch(`http://191.101.14.6:3500/provider/trader/register`,{
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body:JSON.stringify(inputs)
      });  
      const res=await response.json();
      if(res.token!==null){
        alert(res.message);
        console.log(res.token);
        navigate("/");
      }else{

        alert(res.message+"else");
      }
  }
  return (
    <div className='resgister'>
      <div className="card">
      <div className="left">
        <h2>HELLO WELCOME TO PANEL</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis ea autem eius debitis vero aliquam vel, obcaecati, non repellat et amet, nemo similique optio libero iste natus sed tempora sapiente.

        </p>
        <span>already registered </span>
        <button onClick={()=>navigate('/trader/login')}>Login</button>
      </div>
      <div className="right">
        <h1>Trader register</h1>
        <form id='registerForm'>
          <input type="text" name='name' placeholder='jhon doe' onChange={handleChange}/>
          <input type="email" name='email' placeholder='jhondoe@gmail.com' onChange={handleChange}/>
          <input type="text" name='phone' placeholder='phone' onChange={handleChange}/>
          <input type="password" name='password' placeholder=' password' onChange={handleChange}/>
          <input type="password" name='confirmPassword'  placeholder='confirm password' onChange={handleChange}/>
          <button onClick={handleSubmit}>register</button>
        </form>
      </div>
      </div>
    </div>
  )
}
