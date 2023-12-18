import { Link, useNavigate } from 'react-router-dom'
import './menu.scss'
import { Adata,Tdata } from '../../data'
export const Menu=({slug})=>{
    console.log({slug})
    const navigate=useNavigate();
        const isAdmin=localStorage.getItem("isAdmin")==="true";
        const isTrader=localStorage.getItem("isTrader")==="true";
      
    const handleLogout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('isTrader');
        localStorage.removeItem('user');
        window.location.reload(false);
        // navigate('/login');
    }
        return(

            <div className='menu'>
                {
                    isAdmin&&
                    Adata.map((item)=>{
                            return(

                                <div className="item"  key={item.id}>
                        <span className='title'>
                            {item.title}
                        </span>
                        {
                            item.items.map((listItem)=>{
                                return(
                                    <Link to={listItem.url} className='listitem' key={listItem.id}>
                            <img src={listItem.icon} alt="" />
                            <span className="listitemTitle">
                                {listItem.title}
                            </span>
                        </Link>
                                )
                            })
                        }
                
                </div>
                            )
                    }) }
                    {
                        isTrader && Tdata.map((item)=>{
                            return(

                                <div className="item" style={!slug?{
                                    "pointer-events": "none",
                                    "opacity": "0.4"
                                }:{}} key={item.id}>
                        <span className='title'>
                            {item.title}
                        </span>
                        {
                            item.items.map((listItem)=>{
                                return(
                                    <Link to={listItem.url} className='listitem' key={listItem.id}>
                            <img src={listItem.icon} alt="" />
                            <span className="listitemTitle">
                                {listItem.title}
                            </span>
                        </Link>
                                )
                            })
                        }
                
                </div>
                            )
                    })
                    }
                    <button onClick={handleLogout}>LOGOUT</button>
            </div>
        )
}