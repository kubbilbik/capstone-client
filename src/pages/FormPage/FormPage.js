import './FormPage.scss';
import { useNavigate } from 'react-router-dom';

import React from 'react';
import Form from '../../components/Form/Form';



export default function FormPage({ onFormSubmit }){

    const navigate = useNavigate();

    const handleFormSubmit = (formData) => {
        onFormSubmit(formData); 

        console.log("Form Data in FormPage:", formData);
        navigate('/loading'); 
    };


    return(
        <div className='page-form'>
            <Form onFormSubmit={handleFormSubmit} />
        </div>
        
    )
}