import { Home } from "./pages/home/Home"
import { Products} from "./pages/products/Products"
import {Users} from "./pages/users/Users"
import { RouterProvider, createBrowserRouter,Outlet } from "react-router-dom";
import {NavBar} from './components/navbar/NavBar';
import  {Menu} from './components/menu/Menu'
import {Footer} from './components/footer/Footer'
import { Login } from "./pages/login/Login";
const Layout=()=>{
  return(
    <div className="main">
        <NavBar/>
        <div className="container">
          <div className="menuContainer">
          <Menu/>
          </div>
          <div className="contentContainer">
              <Outlet/>
            </div>
        </div>
      <Footer/>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path : '/',
        element : <Home/>
      },
      {
        path : '/users',
        element : <Users/>
      },
      {
        path : 'products',
        element : <Products/> 
      }
    ]
  },
  {
    path:'/login',
    element : <Login/>
  }
]);

function App() {

  return (
      <RouterProvider router={router}></RouterProvider>
  )
}

export default App
