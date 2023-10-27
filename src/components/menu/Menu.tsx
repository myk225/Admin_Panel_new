import { Link } from 'react-router-dom'
import './menu.scss'
import { data } from '../../data'
export const Menu=()=>{
        return(

            <div className='menu'>
                {
                    data.map((item)=>{
                            return(

                                <div className="item" key={item.id}>
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
            </div>
        )
}