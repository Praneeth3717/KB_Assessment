import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import apiCalls from '../utils/api';

const { verifyUser } =apiCalls

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await verifyUser();
        if (res.status === 200) setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div className='w-screen h-screen flex justify-center items-center'><p>Loading...</p></div>; 
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;