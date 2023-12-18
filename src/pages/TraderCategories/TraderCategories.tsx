import { useContext, useState } from "react"
import { CategoryContext } from "../../contexts/CategoryContext/CategoryContext"
import './TraderCategories.scss'
import { useNavigate } from "react-router-dom"


export const TraderCategories = () => {
    const navigate=useNavigate();
    const {LoadCategories,category,subCategory}=useContext(CategoryContext);
  return (
    <div className="trader-cats">
        <h1>All Categories</h1>
        {
            
            category.map((cat)=>{
                const [display,setDisplay]=useState(false);
                return (
                   <div className="item">
                     <div className="cat" key={cat.id}>
                     <img src={cat.image} alt="" />
                      <p> category name : {cat.name} </p>
                      
                      <button onClick={()=>setDisplay(!display)}>show</button>
                    </div>
                    <div className="accordian" style={{display:`${display?"":"none"}`}}>
                        {
                            subCategory.filter(elem=>elem.parent_id===cat.id)
                            .map((subcat)=>{
                                return(
                                    <div className="accordian-item" onClick={()=>navigate(`/trader/${subcat.id}/services/?category=${subcat.name}`)}>
                                        <img src={subcat.image} alt="" />
                                        <p>category name : {subcat.name}</p>
                                        
                                    </div>
                                )
                            })
                        }
                      </div>
                   </div>
                )
            })
        }
    </div>
  )
}
