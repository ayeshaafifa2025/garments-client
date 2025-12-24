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


import BookingForm from "../pages/BookingForm";
import PaymentSuccess from "../pages/payments/PaymentSuccess";
import PaymentCancelled from "../pages/payments/PaymentCancelled";
import OrderDetails from "../pages/OrderDetails";
import UpdateProduct from "../pages/UpdateProduct";
import PendingOrders from "../pages/PendingOrders";
import BuyerRoute from "./BuyerRoute";
import ManagerRoute from "./ManagerRoute";
import AdminRoute from "./AdminRoute";
import AdminOrManagerRoute from "./AdminOrManagerRoute";
import BuyerOrManagerRoute from "./BuyerOrManagerRoute";
import SuspendedActionGuard from "./SuspendedActionGuard";



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
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
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
        element:<BuyerRoute>
          <MyOrders></MyOrders>
        </BuyerRoute>
      },
        {
    path: "order-details/:id", 
    element: <BuyerOrManagerRoute>
      <OrderDetails />
    </BuyerOrManagerRoute>,
},
    {
        path:'track-order/:trackingId',
        element:<BuyerOrManagerRoute>
          <TrackOrder></TrackOrder>
        </BuyerOrManagerRoute>
      },
    {
        path:'my-profile',
        element:<PrivateRoute>
          <MyProfile></MyProfile>
        </PrivateRoute>
      },
    {
        path:'all-products',
        element:<AdminRoute>
          <AllProducts></AllProducts>
        </AdminRoute>
        
      },
    {
        path:'add-product',
        element:<ManagerRoute>
          <SuspendedActionGuard>
            <AddProduct></AddProduct>
          </SuspendedActionGuard>
        </ManagerRoute>
      },
    {
        path:'approved-orders',
        element:<ManagerRoute>
          <ApprovedOrders></ApprovedOrders>
        </ManagerRoute>
      },
    {
        path:'all-orders',
        element:<AdminRoute>
          <AllOrders></AllOrders>
        </AdminRoute>
      },
    {
        path:'pending-orders',
        element:<ManagerRoute>
          <SuspendedActionGuard>
            <PendingOrders></PendingOrders>
          </SuspendedActionGuard>
        </ManagerRoute>
      },
  {
    path: 'manage-products',
    element: <ManagerRoute>
      <ManageProducts />
    </ManagerRoute>, 
    
},
{
    path: 'update-product/:id',
    element: <AdminOrManagerRoute>
      <UpdateProduct />
    </AdminOrManagerRoute>, 
},
    {
        path:'manage-users',
        element:<AdminRoute>
          <ManageUsers></ManageUsers>
        </AdminRoute>
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
        element: <Terms></Terms>
       
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
      element: <PrivateRoute>
        <BuyerRoute>
          <SuspendedActionGuard>
            <BookingForm></BookingForm>
          </SuspendedActionGuard>
        </BuyerRoute>
      </PrivateRoute>
    },
  {
        path: '/*',
        element: <Error></Error>
      },
]);