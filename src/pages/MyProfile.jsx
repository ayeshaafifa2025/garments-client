
import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router';
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole"; 
import { Helmet } from "react-helmet-async";

const MyProfile = () => {
  const { user, logOut } = useAuth();
  
  const { role, status, suspendReason, suspendFeedback, roleLoading } = useRole(); 
  const navigate = useNavigate();

  if (!user || roleLoading) {
   
    return <div className="min-h-screen flex items-center justify-center"><progress className="progress w-56"></progress></div>;
  }

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
        navigate('/');
      })
      .catch(() => {
        toast.error("Failed to logout");
      });
  };

  return (
    <div>
    <Helmet>
                <title>
                    my-profile
                </title>
            </Helmet>

    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card bg-base-100 shadow-xl w-full max-w-md p-6 text-center">
        <img
          src={user?.photoURL || "https://i.ibb.co/6P0w7GZ/default-avatar.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
        />

        <h2 className="text-2xl font-semibold mb-1">
          {user?.displayName || "N/A"}
        </h2>

        <p className="text-gray-600 mb-4">{user?.email || "N/A"}</p>
        
       
        <div className="flex justify-center space-x-4 mb-6">
            <span className={`badge ${status === 'active' ? 'badge-success' : status === 'suspended' ? 'badge-error' : 'badge-warning'} text-white font-bold`}>
                Status: {status.toUpperCase()}
            </span>
            <span className={`badge badge-info text-white font-bold`}>
                Role: {role.toUpperCase()}
            </span>
        </div>
        

        
        {status === 'suspended' && (
            <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-left">
                <h3 className="text-lg font-bold text-red-700 mb-2">🛑 Account Suspended!</h3>
                <p className="text-sm text-red-600">
                    <span className="font-semibold">Reason:</span> {suspendReason || 'N/A'}
                </p>
                <p className="text-sm text-red-600">
                    <span className="font-semibold">Admin Feedback:</span> {suspendFeedback || 'No feedback provided.'}
                </p>
            </div>
        )}

        <button
          onClick={handleLogout}
          className="
                text-black bg-gradient-to-r from-purple-300 via-cyan-200 to-teal-300
                px-6 sm:px-2 py-2 sm:py-3.5 
                rounded-xl 
                font-medium shadow-lg transition-all duration-300
                hover:shadow-xl hover:scale-[1.02] 
                hover:from-purple-300 hover:via-cyan-300 hover:to-teal-400
            "
        >
          Logout
        </button>
      </div>
    </div>
</div>
  );
};

export default MyProfile;


