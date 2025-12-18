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

import ManageProducts from "../pages/ManageProducts";
import ManageUsers from "../pages/ManageUsers";
import DashboardHome from "../pages/DashboardHome";
import QuickLinks from "../components/QuickLinks";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";
import Error from "../pages/Error";
import Products from "../pages/Products";

import PrivateRoute from "./PrivateRoute";
import ProductDetails from "../pages/ProductDetails";
// import PendingOrders from "../pages/PendingOrders";

import BookingForm from "../pages/BookingForm";
import PaymentSuccess from "../pages/payments/PaymentSuccess";
import PaymentCancelled from "../pages/payments/PaymentCancelled";
import OrderDetails from "../pages/OrderDetails";
import UpdateProduct from "../pages/UpdateProduct";
import PendingOrders from "../pages/PendingOrders";



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
        path: 'payment-success',
        element: <PaymentSuccess></PaymentSuccess>
      }, 
      {
        path: 'payment-cancelled', 
       element: <PaymentCancelled></PaymentCancelled>
      }, 
    {
        path:'my-orders',
        element:<MyOrders></MyOrders>
      },
        {
    path: "order-details/:id", 
    element: <OrderDetails />,
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
    path: 'manage-products',
    element: <ManageProducts />, 
    
},
{
    path: 'update-product/:id',
    element: <UpdateProduct />, 
},
    {
        path:'manage-users',
        element:<ManageUsers></ManageUsers>
      }

    ]
   
  },

  
    {
        path: "/quick",
        element: <QuickLinks></QuickLinks>,
        children:[

             {
        path: "/quick/about",
        element: <About></About>
    },
    {
        path: "/quick/contact",
        element: <Contact></Contact>
    },
    {
        path: "/quick/terms",
        // element: <Terms></Terms>
        element: <PrivateRoute>
          <Terms></Terms>
        </PrivateRoute>
    },
    {
        path: "/quick/privacy",
        element: <Privacy></Privacy>
    }
        ]
        
    },
    {
      path:'/products',
      element:<Products></Products>

    },
    {
    path: '/products/:id',
    element: <ProductDetails />, 
},
    {

      path:'/book-order/:id',
      element: <BookingForm></BookingForm>
    },
  {
        path: '/*',
        element: <Error></Error>
      },
]);