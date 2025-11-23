import React, { useState, useRef } from "react";

type CopyClipboardProps = {
    value: string; // text to copy
};

const CopyClipboard: React.FC<CopyClipboardProps> = ({ value }) => {
    const [copied, setCopied] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleCopy = () => {
        if (inputRef.current) {
            inputRef.current.select();
            navigator.clipboard.writeText(inputRef.current.value);
            setCopied(true);

            // reset after 2 seconds
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="w-full max-w-[16rem] relative">
            <input
                ref={inputRef}
                type="text"
                className="col-span-6 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={value}
                disabled
                readOnly
            />

            <button
                onClick={handleCopy}
                className="absolute end-2 top-1/2 -translate-y-1/2 text-gray-600 hover:bg-gray-100 rounded-lg p-2 inline-flex items-center justify-center transition"
                aria-label="Copy to clipboard"
            >
                {/* Default Icon */}
                {!copied && (
                    <svg
                        className="w-3.5 h-3.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 20"
                    >
                        <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                    </svg>
                )}

                {/* Success Icon */}
                {copied && (
                    <svg
                        className="w-3.5 h-3.5 text-blue-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 12"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5.917 5.724 10.5 15 1.5"
                        />
                    </svg>
                )}
            </button>

            {/* Tooltip */}
            <div
                className={`absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg shadow-xs top-full mt-1 transition-opacity duration-300 ${copied ? "opacity-100" : "opacity-0"
                    }`}
                role="tooltip"
            >
                {copied ? "Copied!" : "Copy to clipboard"}
            </div>
        </div>
    );
};

export default CopyClipboard;
