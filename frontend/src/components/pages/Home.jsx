import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen bg-[#F5E6D3]">
      <nav className="bg-[#FFF5E4] p-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-[#8B7355] text-xl font-semibold">Notes App</h1>
          <button
            onClick={handleLogout}
            className="bg-[#E7C8A0] text-[#8B7355] px-4 py-2 rounded-lg
                     hover:bg-[#DEB887] transition duration-200"
          >
            Logout
          </button>
        </div>
      </nav>
      
      <main className="container mx-auto p-4">
        {/* Your notes content will go here */}
      </main>
    </div>
  );
}

export default Home;