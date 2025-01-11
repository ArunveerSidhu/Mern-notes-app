import React from 'react';
import { useAuth } from './context/AuthContext';

const SidePanel = () => {
    const { user } = useAuth();
    console.log('User in SidePanel:', user);

    return (
        <div className="bg-[#FFF5E4] h-screen w-64 p-4 shadow-lg">
            <div className="mb-8">
                <h2 className="text-[#8B7355] text-xl font-semibold">
                    Welcome {user?.username || 'Guest'}
                </h2>
            </div>
            {/* Rest of your side panel content */}
        </div>
    );
};

export default SidePanel;