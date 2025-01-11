import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidePanel from '../SidePanel';
import NotesPanel from '../NotesPanel';

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

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);

  return (
      <div className="flex">
        <SidePanel isOpen={isSidePanelOpen} setIsOpen={setIsSidePanelOpen} />
        <NotesPanel isSidePanelOpen={isSidePanelOpen} />
      </div>
  );
}

export default Home;