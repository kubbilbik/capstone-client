import React, { useState } from 'react';
import './App.scss';
import FormPage from './pages/FormPage/FormPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import LoadingPage from './pages/LoadingPage/LoadingPage';



function App() {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
    console.log("Received Data in App:", data);
  };

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<FormPage onFormSubmit={handleFormSubmit} />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/main" element={<MainPage formData={formData} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
