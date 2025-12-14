import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyOrders from "../pages/MyOrders";
import TrackOrder from "../pages/TrackOrder";
import MyProfile from "../pages/MyProfile";
import AllProducts from "../pages/AllProducts";
import AddProduct from "../pages/AddProduct";
import ApprovedOrders from "../pages/ApprovedOrders";
import AllOrders from "../pages/AllOrders";
import PendingOrders from "../pages/PendingOrders";
import ManageProducts from "../pages/ManageProducts";
import ManageUsers from "../pages/ManageUsers";
import DashboardHome from "../pages/DashboardHome";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
        {
            index: true, 
            element: <Home></Home>
        }
    ]
  },
   {
    path:'/',
    element: <AuthLayout></AuthLayout>,
    children :[
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/register',
        element:<Register></Register>
      }
    ]
  },
   {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
     children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>
      },
    {
        path:'my-orders',
        element:<MyOrders></MyOrders>
      },
    {
        path:'track-order',
        element:<TrackOrder></TrackOrder>
      },
    {
        path:'my-profile',
        element:<MyProfile></MyProfile>
      },
    {
        path:'all-products',
        element:<AllProducts></AllProducts>
      },
    {
        path:'add-product',
        element:<AddProduct></AddProduct>
      },
    {
        path:'approved-orders',
        element:<ApprovedOrders></ApprovedOrders>
      },
    {
        path:'all-orders',
        element:<AllOrders></AllOrders>
      },
    {
        path:'pending-orders',
        element:<PendingOrders></PendingOrders>
      },
    {
        path:'manage-products',
        element:<ManageProducts></ManageProducts>
      },
    {
        path:'manage-users',
        element:<ManageUsers></ManageUsers>
      }

    ]
   
  },
  {
        path: '/*',
        element: <div>error</div>
      },
]);