import './FormPage.scss';
import { useNavigate } from 'react-router-dom';

import React from 'react';
import Form from '../../components/Form/Form';



export default function FormPage(){

    const navigate = useNavigate();

    const handleFormSubmit = (formData) => {
        console.log("Form Data in FormPage:", formData);
        navigate('/main', { state: { formData } });
    };


    return(
        <div className='page-form'>
            <Form onFormSubmit={handleFormSubmit} />
        </div>
        
    )
}