import React from 'react';

const Home = ({ onFileSelect, onCameraStart }) => {

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            onFileSelect(e.target.files[0]);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-agri-green-dark via-agri-green to-rice-golden">
                    RiceScan
                </h1>

                <p className="text-lg text-agri-brown opacity-80">Automated Rice Variety Identification from Images</p>
            </div>

            <div className="grid gap-6 w-full max-w-xs">
                <label className="cursor-pointer group relative">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <div className="btn-secondary h-40 rounded-3xl flex flex-col items-center justify-center gap-3 group-hover:scale-105 transition-transform">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xl font-bold">Upload Image</span>
                    </div>
                </label>

                <button
                    onClick={onCameraStart}
                    className="btn-primary h-40 rounded-3xl flex flex-col items-center justify-center gap-3 hover:scale-105 transition-transform"
                >
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-xl font-bold">Use Camera</span>
                </button>
            </div>
        </div>
    );
};

export default Home;
