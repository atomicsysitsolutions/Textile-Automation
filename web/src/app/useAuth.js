'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // Add state for user role
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole')

    console.log(role);

    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    } else {
      setIsAuthenticated(false);
      router.push('/login');
    }
  },[router]);
  return { isAuthenticated, userRole }; // Return both isAuthenticated and userRole
};

export default useAuth;