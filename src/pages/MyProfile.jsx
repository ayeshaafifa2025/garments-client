

import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router';
import useAuth from "../hooks/useAuth";

const MyProfile = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return null;
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

        <button
          onClick={handleLogout}
          className="btn btn-neutral w-full mt-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MyProfile;










