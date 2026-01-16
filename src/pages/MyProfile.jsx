


import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router';
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole"; 
import { Helmet } from "react-helmet-async";

const MyProfile = () => {
  const { user, logOut, updateUserProfile } = useAuth();
  const { role, status, suspendReason, suspendFeedback, roleLoading } = useRole(); 
  const navigate = useNavigate();

  // Update System States
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [updateLoading, setUpdateLoading] = useState(false);

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

  // Profile Update Handler
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);

    try {
      await updateUserProfile({
        displayName: displayName,
        photoURL: photoURL
      });
      toast.success("Profile updated! Please refresh to see changes.");
      setIsEditing(false);
    } catch (error) {
      toast.error("Update failed: " + error.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>my-profile</title>
      </Helmet>

      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
        <div className="card bg-base-100 shadow-xl w-full max-w-md p-6 text-center">
          
          {/* Profile Image */}
          <img
            src={user?.photoURL || "https://i.ibb.co/6P0w7GZ/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-cyan-200"
          />

          {!isEditing ? (
         
            <>
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

              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-sm btn-outline btn-info mb-4 w-full"
              >
                Edit Profile
              </button>
            </>
          ) : (
           
            <form onSubmit={handleUpdateProfile} className="text-left space-y-4 mb-6">
              <div className="form-control">
                <label className="label"><span className="label-text">Name</span></label>
                <input 
                  type="text" 
                  className="input input-bordered w-full" 
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Photo URL</span></label>
                <input 
                  type="text" 
                  className="input input-bordered w-full" 
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)} 
                  className="btn btn-ghost flex-1"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={updateLoading} 
                  className="btn btn-success text-white flex-1"
                >
                  {updateLoading ? <span className="loading loading-spinner"></span> : "Save"}
                </button>
              </div>
            </form>
          )}

          
          {status === 'suspended' && (
            <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-left mb-4">
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
            className="text-black bg-gradient-to-r from-purple-300 via-cyan-200 to-teal-300 px-6 py-2 sm:py-3.5 rounded-xl font-medium shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] w-full"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
