import './FormPage.scss';
import { useNavigate } from 'react-router-dom';

import React from 'react';
import Form from '../../components/Form/Form';
import { ReactComponent as BackgroundSVG } from '../../assets/images/background.svg';



export default function FormPage(){

    const navigate = useNavigate();

    const handleFormSubmit = (formData) => {
        console.log("Form Data in FormPage:", formData);
        navigate('/main', { state: { formData } });
    };


    return(
        <div className='page-form'>
            <BackgroundSVG className="background-svg" />
            <Form onFormSubmit={handleFormSubmit} />
        </div>
        
    )
}