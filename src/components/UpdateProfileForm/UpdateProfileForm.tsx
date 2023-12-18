import { useState } from 'react';
import './UpdateProfile.scss'


export const UpdateProfileForm = () => {
    const [password,setPassword]=useState(true);
    const fields=["name","email","password","confirm-password","profile"]
    const user_details=JSON.parse(localStorage.getItem("user"));
  return (
    <div className='main--container'>
        <div className="form">
            <form>
                {
                    fields.filter((elem)=>elem!=="password" && elem!=="confirm-password").map((item)=>{
                        return(
                            <div className="form--item">
                    <label htmlFor="name">{item} : </label>
                    <input type="text" placeholder='some'/>
                </div>
                        )
                    })
                }
                <div className="form--item">
                    <label htmlFor="password">password : </label>
                    <input type={password?"password":"text"} id='password' />
                    <p onClick={()=>setPassword(!password)}>{password?"eye-open":"eye-close"}</p>
                </div>
               
            </form>
        </div>
    </div>
  )
}
