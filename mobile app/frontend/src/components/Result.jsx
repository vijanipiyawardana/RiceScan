import React from 'react';

const Result = ({ imageSrc, result, onReset }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 animate-fade-in">
            <div className="glass-panel p-8 rounded-3xl max-w-md w-full text-center shadow-2xl transform transition-all hover:scale-[1.01]">
                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-agri-green to-rice-golden">
                    Classification Result
                </h2>

                <div className="relative mb-8 rounded-2xl overflow-hidden shadow-lg border-4 border-rice-husk/20">
                    <img
                        src={imageSrc}
                        alt="Captured"
                        className="w-full h-auto object-cover max-h-80"
                    />
                </div>

                <div className="space-y-4 mb-8">
                    <div className="bg-rice-paper/80 p-4 rounded-xl shadow-sm">
                        <p className="text-sm text-agri-brown/70 uppercase tracking-wider mb-1">Detected Class</p>
                        <p className="text-2xl font-bold text-agri-brown">{result.class}</p>
                    </div>

                    <div className="bg-rice-paper/80 p-4 rounded-xl shadow-sm">
                        <p className="text-sm text-agri-brown/70 uppercase tracking-wider mb-1">Confidence</p>
                        <p className="text-2xl font-bold text-agri-green-dark">{(result.confidence * 100).toFixed(1)}%</p>
                    </div>
                </div>

                <button
                    onClick={onReset}
                    className="w-full py-4 rounded-xl btn-secondary text-white font-bold text-lg tracking-wide"
                >
                    Scan Another
                </button>
            </div>
        </div>
    );
};

export default Result;
