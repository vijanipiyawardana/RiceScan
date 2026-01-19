import React, { useState } from 'react';
import axios from 'axios';
import Home from './components/Home';
import CameraCapture from './components/CameraCapture';
import Result from './components/Result';

function App() {
  const [view, setView] = useState('home'); // 'home', 'camera', 'result'
  const [image, setImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageSelect = (file) => {
    setImage(file);
    setImageSrc(URL.createObjectURL(file));
    classifyImage(file);
  };

  const classifyImage = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Assuming backend is running on localhost:8000
      const response = await axios.post('http://localhost:8000/classify', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
      setView('result');
    } catch (error) {
      console.error('Error classifying image:', error);
      alert('Failed to classify image. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setView('home');
    setImage(null);
    setImageSrc(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-agri-brown/20 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-agri-green border-t-rice-golden rounded-full animate-spin mb-4"></div>
            <p className="text-xl font-semibold animate-pulse">Analyzing...</p>
          </div>
        </div>
      )}

      {view === 'home' && (
        <Home
          onFileSelect={handleImageSelect}
          onCameraStart={() => setView('camera')}
        />
      )}

      {view === 'camera' && (
        <CameraCapture
          onCapture={handleImageSelect}
          onCancel={() => setView('home')}
        />
      )}

      {view === 'result' && result && (
        <Result
          imageSrc={imageSrc}
          result={result}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

export default App;
