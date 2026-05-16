"use client";
import { useState } from 'react';

export default function FileUpload() {
    const [files, setFiles] = useState<File[]>([]);

    const handleUpload = () => {
        // Mock upload visual state
        alert("Files sent to Document AI parsing pipeline!");
        setFiles([]);
    };

    return (
        <div className="p-6 bg-gray-900 rounded-2xl border border-gray-800 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-emerald-500 opacity-75"></div>
            <h3 className="text-xl font-bold text-white mb-2">Upload Records</h3>
            <p className="text-sm text-gray-400 mb-5">Ingest Constitutions or M-Pesa Statements</p>

            <div className="border-2 border-dashed border-gray-700 hover:border-emerald-500 hover:bg-gray-800/80 transition-all rounded-xl p-8 text-center cursor-pointer flex flex-col items-center justify-center bg-gray-800/30">
                <div className="bg-gray-800 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-3xl block">📄</span>
                </div>
                <span className="text-gray-200 font-medium">Click to browse or drag & drop</span>
                <span className="text-xs text-gray-500 mt-2">Supports PDF, DOCX, XLSX (Max: 10MB)</span>
                <input
                    type="file"
                    multiple
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => {
                        if (e.target.files) {
                            setFiles(Array.from(e.target.files));
                        }
                    }}
                />
            </div>

            {files.length > 0 && (
                <div className="mt-5 space-y-3">
                    {files.map((f, i) => (
                        <div key={i} className="p-3 bg-gray-800 rounded-lg flex items-center justify-between border border-gray-700 shadow-sm">
                            <span className="text-sm text-gray-300 truncate pr-4">{f.name}</span>
                            <span className="text-xs text-emerald-400 bg-emerald-900/30 px-2 py-1 rounded">Ready</span>
                        </div>
                    ))}
                    <button
                        onClick={handleUpload}
                        className="w-full mt-3 bg-white text-gray-900 hover:bg-gray-200 font-bold py-2.5 rounded-lg transition-colors shadow-md"
                    >
                        Process Documents
                    </button>
                </div>
            )}
        </div>
    );
}
