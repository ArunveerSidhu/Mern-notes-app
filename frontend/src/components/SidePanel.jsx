import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';

const SidePanel = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="relative">
            <div 
                className={`bg-[#FFF5E4] h-screen w-80 fixed top-0 left-0 
                transition-transform duration-300 ease-in-out shadow-xl
                border-r border-[#E7C8A0]/30 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Header Section */}
                <div className="p-6 border-b border-[#E7C8A0]/30">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-[#8B7355] text-lg font-medium">
                                Welcome back,
                            </h2>
                            <p className="text-[#BE8C63] text-xl font-semibold mt-1">
                                {user?.username || 'Guest'}
                            </p>
                        </div>
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-full hover:bg-[#E7C8A0]/20 
                            transition-all duration-300"
                            aria-label="Toggle sidebar"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                className="h-5 w-5 text-[#8B7355]" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M15 19l-7-7 7-7" 
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Navigation Section */}
                <nav className="p-4">
                    <div className="space-y-2">
                        <button className="w-full flex items-center space-x-3 px-4 py-2.5 
                            text-[#8B7355] rounded-lg hover:bg-[#E7C8A0]/20 transition-all duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2z" />
                            </svg>
                            <span className="font-medium">All Notes</span>
                        </button>

                        <button className="w-full flex items-center space-x-3 px-4 py-2.5 
                            text-[#8B7355] rounded-lg hover:bg-[#E7C8A0]/20 transition-all duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="font-medium">Pinned Notes</span>
                        </button>

                        <button className="w-full flex items-center space-x-3 px-4 py-2.5 
                            text-[#8B7355] rounded-lg hover:bg-[#E7C8A0]/20 transition-all duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4z" />
                            </svg>
                            <span className="font-medium">Archived Notes</span>
                        </button>
                    </div>
                </nav>

                {/* Footer Section */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <button 
                        onClick={logout}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 
                        text-[#8B7355] rounded-lg hover:bg-[#E7C8A0]/20 transition-all duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>

            {/* Toggle button for closed state */}
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="fixed top-4 left-4 p-2.5 rounded-lg bg-[#FFF5E4] 
                    hover:bg-[#E7C8A0]/20 transition-all duration-300 
                    shadow-lg border border-[#E7C8A0]/30 z-50"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 text-[#8B7355]" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 5l7 7-7 7" 
                        />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default SidePanel;