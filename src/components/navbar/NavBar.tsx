import './navbar.scss'

export const NavBar=()=>{
    return(
        <div className='navbar'>
            <div className="logo">
                <img src="logo.svg" alt="" />
                <span>Repairz Admin</span>
            </div>
            <div className="icons">
                <img src="/search.svg" alt="" className="icon" />
                <img src="/app.svg" alt="" className="icon" />
                <img src="expand.svg" alt="" className="icon" />
                <div className="notification">
                    <img src="notifications.svg" alt="" />
                    <span>1</span>
                    
                </div>
                <div className="users">
                    <img src="https://images.pexels.com/photos/6274712/pexels-photo-6274712.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" />
                    <span>myk</span>
                </div>
                <img src="settings.svg" alt="" className="icon" />
            </div>

        </div>
    )
}