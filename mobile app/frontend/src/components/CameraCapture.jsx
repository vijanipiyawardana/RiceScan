import React, { useRef, useEffect, useState } from 'react';

const CameraCapture = ({ onCapture, onCancel }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null);

    useEffect(() => {
        startCamera();
        return () => stopCamera();
    }, []);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Could not access camera. Please allow permissions.");
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    const takePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            canvas.toBlob((blob) => {
                onCapture(blob);
                stopCamera();
            }, 'image/jpeg');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-4">
            <div className="w-full max-w-md bg-gray-900 rounded-2xl overflow-hidden shadow-2xl relative">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-auto object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />

                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
                    <button
                        onClick={stopCamera}
                        className="px-6 py-2 rounded-full bg-gray-600 hover:bg-gray-500 text-white font-semibold transition-all">
                        Cancel
                    </button>
                    <button
                        onClick={takePhoto}
                        className="px-6 py-2 rounded-full bg-white text-gray-900 font-bold hover:scale-105 transition-all shadow-lg">
                        Take Photo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CameraCapture;
