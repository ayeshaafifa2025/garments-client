

import React, { useState } from 'react'; 
import useAxiosSecure from '../hooks/useAxiosSecure'; 
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2'; 
import { Helmet } from 'react-helmet-async';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['allUsers', searchQuery, filterRole, filterStatus], 
        queryFn: async () => {
            const params = new URLSearchParams({
                search: searchQuery,
                role: filterRole,
                status: filterStatus
            }).toString();
            const res = await axiosSecure.get(`/users/all?${params}`); 
            return res.data;
        }
    });

    if (isLoading) return <p className="text-center text-xl py-10">Loading Users...</p>;

    const handleStatusUpdate = async (id, updateFields, successMsg) => {
        try {
            const res = await axiosSecure.patch(`/users/update-status/${id}`, updateFields);
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({ title: "Success!", text: successMsg, icon: "success" });
            }
        } catch {
            Swal.fire({ icon: "error", title: "Failed!", text: "Could not update user status/role." });
        }
    };

    const handleSuspend = async (user) => {
        const { value: formValues } = await Swal.fire({
            title: `Suspend ${user.displayName} (${user.role})`,
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Suspend Reason">' +
                '<textarea id="swal-input2" class="swal2-textarea" placeholder="Admin Feedback"></textarea>',
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                const reason = document.getElementById('swal-input1').value;
                const feedback = document.getElementById('swal-input2').value;
                if (!reason || !feedback) {
                    Swal.showValidationMessage('Both reason and feedback are required.');
                    return false;
                }
                return { suspendReason: reason, suspendFeedback: feedback };
            }
        });
        if (formValues) {
            handleStatusUpdate(user._id, { status: 'suspended', suspendReason: formValues.suspendReason, suspendFeedback: formValues.suspendFeedback }, `${user.displayName} has been suspended.`);
        }
    };

    const handleApprove = (user) => {
        handleStatusUpdate(user._id, { role: user.demandedRole, status: 'active', demandedRole: null }, `${user.displayName} is now an ${user.demandedRole}.`);
    };

    const isSuspended = (user) => user.status === 'suspended';

    return (
      <div className="p-4 md:p-8">
        <Helmet><title>manage-users</title></Helmet>
        <h2 className="text-3xl font-bold mb-6 text-center">👥 Manage Users: {users.length}</h2>

        <div className="flex flex-col md:flex-row gap-4 mb-6 bg-gray-100 p-4 rounded-lg shadow-inner">
            <input
                type="text"
                placeholder="Search by Name or Email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
                <option value="all">Filter by Role (All)</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="buyer">Buyer</option>
                <option value="user">User (Pending)</option>
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
                <option value="all">Filter by Status (All)</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
            </select>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                    <tr>
                        <th className="py-3 px-4 text-left">#</th>
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-left">Email</th>
                        <th className="py-3 px-4 text-center">Current Role</th>
                        <th className="py-3 px-4 text-center">Demanded Role</th>
                        <th className="py-3 px-4 text-center">Status</th>
                        <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                    {users.map((user, index) => (
                        <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-4">{index + 1}</td>
                            <td className="py-3 px-4">{user.displayName}</td>
                            <td className="py-3 px-4">{user.email}</td>
                            <td className="py-3 px-4 text-center">
                                <span className={`py-1 px-3 rounded-full text-xs font-semibold ${
                                    user.role === 'admin' ? 'bg-indigo-200 text-indigo-600' :
                                    user.role === 'manager' ? 'bg-green-200 text-green-600' :
                                    'bg-blue-200 text-blue-600'
                                }`}>{user.role}</span>
                            </td>
                            <td className="py-3 px-4 text-center">
                                <span className={`py-1 px-3 rounded-full text-xs font-semibold ${
                                    user.demandedRole === 'buyer' ? 'bg-teal-200 text-teal-600' :
                                    user.demandedRole === 'manager' ? 'bg-orange-200 text-orange-600' :
                                    'bg-gray-200 text-gray-600'
                                }`}>{user.demandedRole || 'N/A'}</span>
                            </td>
                            <td className="py-3 px-4 text-center">
                                <span className={`py-1 px-3 rounded-full text-xs font-semibold ${
                                    user.status === 'pending' ? 'bg-yellow-200 text-yellow-600' :
                                    user.status === 'suspended' ? 'bg-red-200 text-red-600' :
                                    'bg-green-200 text-green-600'
                                }`}>{user.status || 'active'}</span>
                            </td>
                            <td className="py-3 px-4 text-center flex flex-wrap justify-center gap-2">
                                {user.role === 'user' && user.status === 'pending' && (
                                    <button onClick={() => handleApprove(user)} className="text-black bg-gradient-to-r from-purple-300 via-cyan-200 to-teal-300 px-2 py-1 rounded-md font-medium shadow-sm hover:scale-105 transition duration-200">
                                        Approve ({user.demandedRole})
                                    </button>
                                )}
                                {!isSuspended(user) && user.role !== 'admin' && (
                                    <button onClick={() => handleSuspend(user)} className="text-black bg-gradient-to-r from-purple-300 via-cyan-200 to-teal-300 px-2 py-1 rounded-md font-medium shadow-sm hover:scale-105 transition duration-200">
                                        Suspend
                                    </button>
                                )}
                                {isSuspended(user) && (
                                    <button onClick={() => handleStatusUpdate(user._id, { status: 'active', suspendReason: null, suspendFeedback: null }, `${user.displayName} is now active.`)} className="text-black bg-gradient-to-r from-purple-300 via-cyan-200 to-teal-300 px-2 py-1 rounded-md font-medium shadow-sm hover:scale-105 transition duration-200">
                                        Activate
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {users.length === 0 && <p className="text-center py-8 text-lg text-gray-500">No users found matching the filters.</p>}
        </div>
      </div>
    );
};

export default ManageUsers;
