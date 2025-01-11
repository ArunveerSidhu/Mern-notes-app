import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidePannel from '../SidePanel';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
        <SidePannel/>
    </>
  );
}

export default Home;