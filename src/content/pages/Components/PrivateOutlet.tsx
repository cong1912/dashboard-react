import { Navigate, Outlet } from 'react-router-dom';
import React, { useContext } from 'react';

const PrivateOutlet: React.FC = () => {
  const existedUserSession = JSON.parse(
    localStorage.getItem('token') || 'null'
  );

  return existedUserSession ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateOutlet;
