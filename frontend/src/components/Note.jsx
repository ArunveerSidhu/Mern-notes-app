import React from 'react';

const Note = ({ title, content, isPinned, isArchived, onPin, onArchive, onDelete, onUpdate }) => {
    return (
        <div className={`bg-[#FFF5E4] p-4 rounded-xl shadow-md border border-[#E7C8A0] 
                        transition-all duration-300 hover:shadow-lg relative
                        ${isPinned ? 'border-[#BE8C63] border-2' : ''}`}>
            {/* Note Header */}
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-[#8B7355] font-semibold text-lg pr-8">{title}</h3>
                <div className="flex space-x-1">
                    {/* Pin Button */}
                    <button
                        onClick={onPin}
                        className={`p-1.5 rounded-lg hover:bg-[#FAF0E6] transition-colors
                                ${isPinned ? 'text-[#BE8C63]' : 'text-[#8B7355]'}`}
                        aria-label={isPinned ? "Unpin note" : "Pin note"}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                        </svg>
                    </button>

                    {/* Archive Button */}
                    <button
                        onClick={onArchive}
                        className={`p-1.5 rounded-lg hover:bg-[#FAF0E6] transition-colors
                                ${isArchived ? 'text-[#BE8C63]' : 'text-[#8B7355]'}`}
                        aria-label={isArchived ? "Unarchive note" : "Archive note"}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Note Content */}
            <p className="text-[#8B7355] mb-4 whitespace-pre-wrap">{content}</p>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 mt-4 border-t border-[#E7C8A0] pt-3">
                {/* Update Button */}
                <button
                    onClick={onUpdate}
                    className="p-1.5 rounded-lg hover:bg-[#FAF0E6] transition-colors text-[#8B7355]"
                    aria-label="Edit note"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                    </svg>
                </button>

                {/* Delete Button */}
                <button
                    onClick={onDelete}
                    className="p-1.5 rounded-lg hover:bg-[#FAF0E6] transition-colors text-[#8B7355]"
                    aria-label="Delete note"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Note;
