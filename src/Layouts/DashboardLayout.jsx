
// import React from 'react';

// import { Link, NavLink, Outlet } from 'react-router';
// import useRole from '../hooks/useRole';
// import Logo from '../components/Logo';
// import { Helmet } from 'react-helmet-async';

// const DashboardLayout = () => {
//     const { role } = useRole();
//     return (
//        <div>
//         <Helmet>
//                 <title>
//                     Dashboard
//                 </title>
//             </Helmet>

//          <div className="drawer lg:drawer-open max-w-7xl mx-auto ">
//             <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
//             <div className="drawer-content">
               
//                 <nav className="navbar w-full bg-base-300">
//                     <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                     
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
//                     </label>
//                     <div className="px-4">Garments Dashboard</div>
//                 </nav>
            
//                 <Outlet></Outlet>

//             </div>

//             <div className="drawer-side is-drawer-close:overflow-visible">
//                 <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
//                 <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                   
//                     <ul className="menu w-full grow">
                      
//                         <li>
//                             <Link to="/"><Logo></Logo></Link>
//                         </li>
//                         <li>
//                             <Link to="/dashboard" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                             
//                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
//                                 <span className="is-drawer-close:hidden">Home page</span>
//                             </Link>
//                         </li>

//                         {/* our dashboard links */}
// {/* COMMON for all*/}
// {(role === 'admin' || role === 'manager' || role === 'buyer') && (
//                             <li>
//                                 <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Profile" to="/dashboard/my-profile">
//                                     <span className="is-drawer-close:hidden">My Profile</span>
//                                 </NavLink>
//                             </li>
//                          )} 
// {/* SPECIFIC */}
// {/* for buyer */}
//                        {
//                         role === 'buyer' && 
//                         <>
//                          <li>
//                             <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="MyParcels" to="/dashboard/my-orders">
                                
//                                 <span className="is-drawer-close:hidden">My Orders</span>
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payment History" to="/dashboard/track-order/:trackingId">
                                
//                                 <span className="is-drawer-close:hidden">Track Order</span>
//                             </NavLink>
//                         </li>
//                         </>
//                         } 
                       
//                                {/* for manager */}
                             
//                                {role === 'manager' && 
//                                 <>
//                                    <li>
//                                     <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Completed Deliveries" to="/dashboard/add-product">
                                        
//                                         <span className="is-drawer-close:hidden">Add product</span>
//                                     </NavLink>
//                                 </li>
                          

                       
//                                 <li>
//                                     <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Approve Riders" to="/dashboard/approved-orders">
                                       
//                                         <span className="is-drawer-close:hidden">Approved orders</span>
//                                     </NavLink>
//                                 </li>
                            
//                                 <li>
//                                     <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Assign Riders" to="/dashboard/pending-orders">
                                        
//                                         <span className="is-drawer-close:hidden">pending orders</span>
//                                     </NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Assign Riders" to="/dashboard/manage-products">
                                       
//                                         <span className="is-drawer-close:hidden">manage products</span>
//                                     </NavLink>
//                                 </li>
//                                 </>
//                               }
// {/* for admin */}
//                               {
//                                 role === 'admin' && 
//                                 <>
//                                              <li>
//                                     <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Completed Deliveries" to="/dashboard/all-products">
                                        
//                                         <span className="is-drawer-close:hidden">All Products</span>
//                                     </NavLink>
//                                 </li>

//                                     <li>
//                                     <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Assign Riders" to="/dashboard/all-orders">
                                        
//                                         <span className="is-drawer-close:hidden">all orders</span>
//                                     </NavLink>
//                                 </li>

//                                 <li>
//                                     <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Users Management" to="/dashboard/manage-users">
                                     
//                                         <span className="is-drawer-close:hidden">manage users</span>
//                                     </NavLink>
//                                 </li>
                                
//                                 </>
//                                } 
                            
                        

                       
//                     </ul>
//                 </div>
//             </div>
//         </div>
//        </div>
//     );
// };

// export default DashboardLayout;





import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import useRole from '../hooks/useRole';
import Logo from '../components/Logo';
import { Helmet } from 'react-helmet-async';

const DashboardLayout = () => {
    const { role } = useRole();

    return (
        <div>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>

            <div className="drawer lg:drawer-open min-h-screen">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <nav className="navbar bg-base-300 px-4 sm:px-6 lg:px-8">
                        <div className="flex-1">
                            <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost lg:hidden" aria-label="open sidebar">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </label>
                            <span className="text-lg font-bold ml-2 hidden sm:inline">Garments Dashboard</span>
                        </div>
                    </nav>

                    <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50">
                        <Outlet />
                    </main>
                </div>

                <div className="drawer-side">
                    <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                    <div className="flex flex-col w-64 bg-base-200 min-h-screen overflow-y-auto">
                        <div className="px-4 py-4">
                            <Link to="/"><Logo /></Link>
                        </div>

                        <ul className="menu p-4 w-full space-y-2">
                            <li>
                                <Link to="/dashboard" className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4h-2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10z" />
                                    </svg>
                                    <span>Home page</span>
                                </Link>
                            </li>

                            {(role === 'admin' || role === 'manager' || role === 'buyer') && (
                                <li>
                                    <NavLink to="/dashboard/my-profile" className="flex items-center space-x-2">
                                        <span>My Profile</span>
                                    </NavLink>
                                </li>
                            )}

                            {role === 'buyer' && (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/my-orders" className="flex items-center space-x-2">
                                            <span>My Orders</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/track-order/:trackingId" className="flex items-center space-x-2">
                                            <span>Track Order</span>
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            {role === 'manager' && (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/add-product" className="flex items-center space-x-2">
                                            <span>Add Product</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/approved-orders" className="flex items-center space-x-2">
                                            <span>Approved Orders</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/pending-orders" className="flex items-center space-x-2">
                                            <span>Pending Orders</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/manage-products" className="flex items-center space-x-2">
                                            <span>Manage Products</span>
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            {role === 'admin' && (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/all-products" className="flex items-center space-x-2">
                                            <span>All Products</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/all-orders" className="flex items-center space-x-2">
                                            <span>All Orders</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/manage-users" className="flex items-center space-x-2">
                                            <span>Manage Users</span>
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;

