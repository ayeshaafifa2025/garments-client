
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { 
        data: userData = {}, 
        isLoading: roleLoading,
        error: roleError 
    } = useQuery({
        
        queryKey: ['userRole', user?.email], 
        enabled: !loading && !!user?.email, 
        
        queryFn: async () => {
           
            const res = await axiosSecure.get(`/users/${user.email}/status-role-info`); 
            
            return res.data; 
        },
        
        onError: (err) => {
             console.error("Error fetching user role/status:", err);
        }
    });
    
  
    const role = userData.role || 'user';
    const status = userData.status || 'pending'; 
    const suspendReason = userData.suspendReason || null;
    const suspendFeedback = userData.suspendFeedback || null;
    
    return { role, status, suspendReason, suspendFeedback, roleLoading, roleError }; 
};

export default useRole;

