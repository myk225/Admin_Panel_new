import { useEffect } from 'react'
import './orderDetails.scss'
type Props= {
    order_id : number
}
export const OrderDetailsPage = (props:Props) => {
    useEffect(()=>{
        //some fetching function
    },[props.order_id])
  return (
    <div className='details--main'>
        <div className="right">
            <div className="details--item">
                <h2>Customer Details</h2>
                <p>Customer Name : Yaseen Khan</p>
                <p>Customer email : kyaseen228@gmail.com</p>
                <p>Customer Mobile : 9381182842</p>
                <p>city : hyderabad</p>
                <p>pincode : 509001</p>
                <p>state : Telenagana</p>
                <p>country : India</p>
                <p>Address : some road,some place,some landmark</p>
            </div>
            <div className="details--item">
                <h2>Service Provider Details</h2>
                <p><span>Trader Name : </span> mark</p>
                <p><span>Trader Email : </span> mark@gmail.com</p>
                <p><span>employee name : </span> someEmp</p>
                <p><span>employee email : </span> mark@gmail.com </p>
                <p><span>employee number :</span> 904567893</p>
            </div>
        </div>
        <div className="left">
                <div className="details--item">
                    <h2>Order Details</h2>
                    <p><span>order_id : </span> 123</p>
                    <p><span>order date : </span> 21-02-2023</p>
                    <p><span>service date : </span> 27-02-2023</p>
                    <p><span>total : </span> 1234 </p>
                    <p><span>payment method : </span> COD</p>
                </div>
                <div className="details--item order--services">
                    <h2>Order Services (4)</h2>
                    <div className="orderservice--item">
                        <img src="http://localhost:3500/public/images/categories/image-1700311874078.avif" alt="" />
                        <div className=''>
                        <p><span>service name : </span> Ac services</p>
                        <p><span>purchased price</span> 300</p>
                        <p><span>qty : </span> 3</p>
                        
                        </div>
                    </div>
                    <div className="orderservice--item">
                        <img src="http://localhost:3500/public/images/categories/image-1700311874078.avif" alt="" />
                        <div className=''>
                        <p><span>service name : </span> Ac services</p>
                        <p><span>purchased price</span> 300</p>
                        <p><span>qty : </span> 3</p>
                        
                        </div>
                    </div>
                    <div className="orderservice--item">
                        <img src="http://localhost:3500/public/images/categories/image-1700311874078.avif" alt="" />
                        <div className=''>
                        <p><span>service name : </span> Ac services</p>
                        <p><span>purchased price</span> 300</p>
                        <p><span>qty : </span> 3</p>
                        
                        </div>
                    </div>
                    <div className="orderservice--item">
                        <img src="http://localhost:3500/public/images/categories/image-1700311874078.avif" alt="" />
                        <div className=''>
                        <p><span>service name : </span> Ac services</p>
                        <p><span>purchased price</span> 300</p>
                        <p><span>qty : </span> 3</p>
                        
                        </div>
                    </div>
                </div>
        </div>
    </div>
  )
}
