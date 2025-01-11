import React from 'react';

const NotesPanel = ({ isSidePanelOpen }) => {
    return (
        <div
            className={`transition-all duration-300 ease-in-out ${
                isSidePanelOpen ? 'ml-80' : 'ml-0'
            } flex-1 p-4`}
        >
            {/* Your notes content goes here */}
            <h1 className="text-2xl font-bold">Notes</h1>
        </div>
    );
};

export default NotesPanel;