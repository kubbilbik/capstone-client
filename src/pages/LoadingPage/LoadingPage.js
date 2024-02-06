import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CircleLoader from "react-spinners/CircleLoader";


const LoadingPage = () => {
const navigate = useNavigate();
const location = useLocation(); 

useEffect(() => {
  const timer = setTimeout(() => {
    const dataToPass = location.state.formData;
    navigate('/main', { state: { formData: dataToPass } });
  }, 5000);

  return () => clearTimeout(timer);
}, [navigate, location.state]);


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircleLoader
        loading={'#157028'}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />    
    </div>
  );
};

export default LoadingPage;
