import { useRef, useState } from "react";
import './upload.scss'
export const TraderUploads = ({isSubmitted,isAdmin}) => {
    const isUploaded=isSubmitted===0? false: true;
    const formRef=useRef(null);
    const [inputs,setInputs]=useState({docs1:"http://localhost:3500/uploads/basicFile.pdf"});
    const [open,setOpen]=useState(false);
    const handleChange=(e)=>{
        const fileType=e.target.value.split(".").pop();
        setInputs({...inputs,[e.target.name]:e.target.value});
        const [File,result]=e.target.files;
       console.log(result);
        const path=URL.createObjectURL(File);
        setInputs({...inputs,[path]:path})
        // console.log(path);
        // console.log(inputs);
        if(fileType==="pdf"){
            alert(fileType);    
            setInputs({...inputs,[e.target.name]:e.target.value});
            console.log(inputs);


        }

    }
    const handleSubmit= async(e)=>{
        e.preventDefault();
        console.log(inputs);
        
        const formData=new FormData(formRef.current);
        
      
        for( const pair of formData.entries()){
            console.log(`${pair[0]} : ${pair[1]}`)
        }
        const response=await fetch(`http://localhost:3500/test/uploadingTest`,{
            method: "POST",
            headers:{
                "Authorization":localStorage.getItem("token")
            },body:formData
        })
        const res=await response.json();
            
        alert(res.message);

    }
  return (
    <div className="uploadMain">
        {
            !isUploaded&&isAdmin===0 &&
            <>
                <form ref={formRef} className="uploadForm">
           <label htmlFor="">upload all docs herre</label>
           <div className="item">
           <label htmlFor="doc1">PDF FILE</label> <input type="file" onChange={handleChange} webkitdirectory name="docs1" id="docs1" accept="application/pdf" />
            {/* <object data={`http://localhost:3500/uploads/basicFile.pdf`} type=""></object> */}
                <button type="button" onClick={()=>setOpen(true)}>view</button>
           </div>
            <div className="item">
                <label htmlFor="docs2">Image type</label>
            <input type="file" onChange={handleChange}  name="docs2" id="docs2" accept="image/*"/>
            </div>
            <div className="item">
                <label htmlFor="docs3">word doc/docx</label>
            <input type="file" onChange={handleChange} name="docs3" id="docs3" accept="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,,text/plain" />
            </div>
            <button onClick={handleSubmit}>submit</button>
        </form>
        {
            open&&<div className="add">
                <div className="modal" style={{"width" :"90%",height:"80%"}}>
                    <span className="close" onClick={()=>setOpen(false)}>X</span>
                    <object data={inputs.path} width="100%" height="100%" type=""></object>
                    
                </div>
            </div>
        }
            </>
        }
        {/* {
            isUploaded&&
            <>
            <div className="profile">
                <object width='100%' height="100%" data="http://localhost:3500/uploads/basicFile.pdf" type=""></object>
            </div>
            </>
        } */}
    </div>
  )
}
