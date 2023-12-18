import { Home } from "./pages/home/Home"
import { Products} from "./pages/products/Products"
import {Users} from "./pages/users/Users"
import { RouterProvider, createBrowserRouter,Outlet, Navigate } from "react-router-dom";
import {NavBar} from './components/navbar/NavBar';
import  {Menu} from './components/menu/Menu'
import {Footer} from './components/footer/Footer'
import { Login } from "./pages/login/Login";
import { Category } from "./pages/Categories/Category";
import { AuthContext, Authentication } from "./contexts/authContext/authContext";
import User from "./pages/singleUser/User";
import { CategoryState } from "./contexts/CategoryContext/CategoryContext";
import { Orders } from "./pages/Orders/Orders";
import { TraderRegister } from "./pages/register/TraderRegister";
import { Services } from "./pages/Services/Services";
import {SubCategory} from "./pages/SubCategoy/subCategory"
import { OrderContextProvider } from "./contexts/OrderContext/OrderContext";
import { TraderOrders } from "./pages/TraderOrders/TraderOrders";
import { TraderContextProvider } from "./contexts/TraderContext/TraderContext";
import { TraderList } from "./pages/TraderList/TraderList";
import { Single } from "./components/single/single";
import { TraderServices } from "./pages//TraderServices/TraderServices";
import {  AdminContextProvider } from "./contexts/AdminContext/AdminContext";
import { AddServices } from "./components/AddServicesForm/AddServices";
import { SingleService } from "./pages/SingleService/SingleService";
import { TraderEmployees } from "./pages/TraderEmployees/TraderEmployee";
import { TraderRegisteredServices } from "./pages/TraderRegisteredServices/TraderRegisteredServices";
import { TraderCategories } from "./pages/TraderCategories/TraderCategories";
import { TraderLogin } from "./pages/login/traderLogin";
import { OrderDetailsPage } from "./pages/OrderDetailsPage/OrderDetailsPage";
import { TraderUploads } from "./pages/TraderUploads/TraderUploads";
import { TraderProfile } from "./pages/TraderProfile/TraderProfile";
import { useContext } from "react";
import { UpdateProfileForm } from "./components/UpdateProfileForm/UpdateProfileForm";
// let isSubmitted=true,isActive=true;






function App() {
  const {currentUser,currentUser1}=useContext(Authentication);
  console.log(currentUser,currentUser1);
  const Layout=()=>{
    return(
      <div className="main">
          <NavBar/>
          <div className="container">
            <div className="menuContainer">
            <Menu slug={isActive===0?false:true} />
            </div>
            <div className="contentContainer">
                <Outlet/>
              </div>
          </div>
        <Footer/>
      </div>
    )
  }
  let {isAccepted,isActive,isSubmitted}=JSON.parse(localStorage.getItem("user"))||currentUser||{isAccepted:0,isActive:0,isSubmitted:0};
console.log(isSubmitted,"hello");
const ProtectedRoute=({children})=>{
  const isAdmin=localStorage.getItem("isAdmin");
  
  console.log(isAdmin);
  if(isAdmin==="true"){
     return children
  }else{
    return <Navigate to="/login"/>
  }
}
const TraderProtectedRoute=({children})=>{
  const isTrader=localStorage.getItem("isTrader");
  
  if(isTrader==="true"){

    if(isActive===1){
      return children
    }else if(isSubmitted===1){
      <Navigate to="/trader/documents"/>
      return  <div className="main">
      <NavBar/>
      <div className="container">
        <div className="menuContainer">
        <Menu slug={isActive===0?false:true}/>
        </div>
        <div className="contentContainer">
        <TraderProfile/>
          </div>
      </div>
    <Footer/>
  </div>
     
    }else if(isSubmitted===0||isSubmitted===null){
      <Navigate to="/trader/documents"/>
      return  <div className="main">
      <NavBar/>
      <div className="container">
        <div className="menuContainer">
        <Menu slug={isActive===0?false:true}/>
        </div>
        <div className="contentContainer">
        <TraderProfile/>
          </div>
      </div>
    <Footer/>
  </div>
    }
    
  }else{
    return <Navigate to="/trader/login"/>
  }
}
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><Layout/></ProtectedRoute>,
      children:[{
        path:"/",
        element:<>{ localStorage.getItem("isAdmin")&&<Navigate to="/admin"/>}
                    </>   
      },
        {
          path : '/admin',
          element : <Home/>
        },
        {
          path : '/admin/traderlist',
          element :<AdminContextProvider> <TraderList/> </AdminContextProvider>
        },
        {
          path:"/admin/traderprofile/:id",
          element: <TraderProfile/>
        },
        {
          path : '/admin/products',
          element : <Products/> 
        },
        {
          path : '/admin/services',
          element : <Services/> 
        },
        {
          path : '/admin/categories',
          element: <Category/>
        },{
  
          path:"/admin/traderservices",
          element: <AdminContextProvider> <TraderServices/> </AdminContextProvider>
        },
        {
          path:'/admin/subcategories',
          element: <SubCategory/>
        },
        {
          path : "/admin/users/:id",
          element: <User/>
        },{
          path:"/admin/orders",
          element:<Orders/>
        },{
          path:"/admin/orders/orderdetails/:id",
          element: <OrderDetailsPage order_id={123}/>
        }
      ]
    },{
      path:"/trader",
      element: <TraderProtectedRoute ><Layout/></TraderProtectedRoute>,
      children:[{
        path: "/trader",
        element: <>{ localStorage.getItem("isTrader")&&<Navigate to="/trader/dashboard"/>}
        </>  
      },
        {
          path:"/trader/dashboard",
          element:<Home/>
        },{
          path:"/trader/orders",
          element:<TraderOrders/>
        },{
          path:"/trader/orders/:id",
          element: <Single/>
        },{
          path:"/trader/orders/orderdetails/:id",
          element: <OrderDetailsPage order_id={123}/>
        },
        {
          path:"/trader/categories",
          element: <TraderCategories/>
        },{
          path:"/trader/services",
          element:<AddServices/>
        },{
          path:"/trader/:id/services",
          element:<AddServices/>
        },
        {
          path:"/trader/services/:id",
          element: <AdminContextProvider><SingleService/> </AdminContextProvider>
        },{
          path: "/trader/registered/services",
          element: <TraderRegisteredServices/>
        },
        {
          path:"/trader/employees",
          element: <TraderEmployees/>
        },{
          path:"/trader/profile",
          element: <TraderProfile/>
        },{
          path:"/trader/test",
          element: <UpdateProfileForm/> 
        }
      ]
    },
    {
      path:'/login',
      element : <>{localStorage.getItem("isAdmin")==="true"? <Navigate to="/"/> :<Login/>}</>
    },
    {
      path:'/register',
      element : <TraderRegister/>
    },{
      path:"/trader/login",
      element:<>{localStorage.getItem("isTrader")==="true"? <Navigate to="/trader"/>:<TraderLogin/>}</>
    },{
      path: "/uploading/docs",
      element : <TraderUploads/>
    },{
      path:"/trader/documents",
      element : <TraderUploads/>
    }
  ]);
 
 
  return (
      <OrderContextProvider>

        <TraderContextProvider>
      <CategoryState>
      
      <RouterProvider router={router}></RouterProvider>
      
      </CategoryState>
      </TraderContextProvider>
      </OrderContextProvider>
      
    
  )
}

export default App
