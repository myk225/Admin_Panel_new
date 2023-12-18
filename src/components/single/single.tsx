import { useContext } from 'react';
import './single.scss'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TraderContext } from '../../contexts/TraderContext/TraderContext';
const order={"id":111,"partner_id":2,"employee_id":0,"user_id":46,"total":119,"tax_percentage":"15","tax_amount":"","final_total":119,"payment_method":"stripe","address_id":16,"address":"123,abc apartment,,California,United States,,94043,9876543210.","date_of_service":"2023-09-11T20:00:00.000Z","starting_time":"15:02:00","ending_time":"00:45:00","duration":"45","status":"awaiting","remarks":"","created_at":"2023-09-06T03:32:51.000Z","order_service_id":97,"service_id":211,"service_title":"MCB fuse replacement","price":250,"discount_price":119,"quantity":1,"rating":null,"userAddress":"123,abc apartment,,,94043,xyz,California,United States"};
const orderDetails=[{"id":131,"partner_id":2,"employee_id":0,"user_id":46,"total":750,"tax_percentage":"15","tax_amount":"","final_total":750,"payment_method":"cod","address_id":16,"address":"123,abc apartment,,California,United States,,94043,9876543210.","date_of_service":"2023-09-13T20:00:00.000Z","starting_time":"16:30:00","ending_time":"01:35:00","duration":"95","status":"awaiting","remarks":"","created_at":"2023-09-06T13:01:39.000Z","order_service_id":115,"service_id":111,"service_title":"Deep clean AC service(window)","price":500,"discount_price":400,"quantity":1,"rating":4,"userAddress":"123,abc apartment,,,94043,xyz,California,United States"},{"id":131,"partner_id":2,"employee_id":0,"user_id":46,"total":750,"tax_percentage":"15","tax_amount":"","final_total":750,"payment_method":"cod","address_id":16,"address":"123,abc apartment,,California,United States,,94043,9876543210.","date_of_service":"2023-09-13T20:00:00.000Z","starting_time":"16:30:00","ending_time":"01:35:00","duration":"95","status":"awaiting","remarks":"","created_at":"2023-09-06T13:01:39.000Z","order_service_id":116,"service_id":112,"service_title":"Deep clean AC Service (split)","price":450,"discount_price":350,"quantity":1,"rating":3,"userAddress":"123,abc apartment,,,94043,xyz,California,United States"}];
type Props={
    order : {},
    
    
}
  
export const Single=({props:Props})=>{
    const {acceptOrder}=useContext(TraderContext);
    const handleAccept=()=>{
        acceptOrder(order.id,true);
    }
    const handleReject=()=>{
        acceptOrder(order.id,false);
    }
    const handleClick=()=>{
        console.log("hello");
    }
    return(
        <div className='single'>
            <div className="view">
            <div className="info">
                    <div className="topInfo">
                        {/* <img src="https://miro.medium.com/v2/resize:fit:785/0*Ggt-XwliwAO6QURi.jpg" alt="" /> */}
                        <h1>Order Id {order.id}</h1>
                        {
                            order.status==="Trader assigned"&&
                            <>
                            <button onClick={handleAccept}>Accept</button>
                            <button onClick={handleReject}>Reject</button></>
                        }
                        {
                            order.status==="Trader accepted"&&
                            <button onClick={handleClick}>Assign Employee</button>
                   
                        }
                    </div>
                    <div className="details">
                        <div className="item">
                            <span className="itemName">
                                Id :
                            </span>
                            <span className="itemValue">
                                {order["id"]}
                            </span>
                        </div><div className="item">
                            <span className="itemName">
                                UserName:
                            </span>
                            <span className="itemValue">
                                Jhon Doe {order.user_id}
                            </span>
                        </div>
                        <div className="item">
                            <span className="itemName">
                                Date of Service:
                            </span>
                            <span className="itemValue">
                                {order.date_of_service}
                            </span>
                        </div>
                        <div className="item">
                            <span className="itemName">
                                Starting Time:
                            </span>
                            <span className="itemValue">
                                {order.starting_time}
                            </span>
                        </div>
                        <div className="item">
                            <span className="itemName">
                                ending_time:
                            </span>
                            <span className="itemValue">
                                {order.ending_time}
                            </span>
                        </div>
                        <div className="item">
                            <span className="itemName">
                                Duration (mins):
                            </span>
                            <span className="itemValue">
                                {order.duration}
                            </span>
                        </div>
                        <div className="item">
                            <span className="itemName">
                                Address:
                            </span>
                            <span className="itemValue">
                                {order.address}
                            </span>
                        </div>
                        <div className="item">
                            <span className="itemName">
                                Status:
                            </span>
                            <span className="itemValue">
                                {order.status}
                            </span>
                        </div>
                    </div>
             </div>
             <hr />
             <div className="chart">
               
                <img src="https://miro.medium.com/v2/resize:fit:785/0*Ggt-XwliwAO6QURi.jpg" alt="" />
                <img src="https://miro.medium.com/v2/resize:fit:785/0*Ggt-XwliwAO6QURi.jpg" alt="" />
               
            </div>
            </div>
           
            <div className="activities">
                <h2>Latest Activities</h2>
                <ul>
                    <li>
                        <div>
                            <p>Awaiting</p>
                            <time>3 days ago</time>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>jhon doe purchased playstation 5 digital edition</p>
                            <time>3 days ago</time>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>jhon doe purchased playstation 5 digital edition</p>
                            <time>3 days ago</time>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>jhon doe purchased playstation 5 digital edition</p>
                            <time>3 days ago</time>
                        </div>
                    </li>
                </ul>

            </div>
        </div>
    )
}