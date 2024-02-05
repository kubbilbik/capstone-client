import './Main.scss';
import Picture from '../../assets/images/kb.png'; 

import Email from '../../assets/images/email.png';
import Linkedin from '../../assets/images/linkedin.png';
import GitHub from '../../assets/images/github.png';


import React, { useState ,useEffect } from 'react';


export default function Main({ formData }) {
    const email = formData && formData.email ? formData.email : "null";
    const linkedin = formData && formData.linkedin ? formData.linkedin : "null";
    const git = formData && formData.git ? formData.git : "null";
   
    const description = formData && formData.description ? formData.description : "null";
    const imageSrc = formData && formData.image && (formData.image instanceof Blob || formData.image instanceof File) 
                    ? URL.createObjectURL(formData.image) 
                    : Picture;

    const [responseContent, setResponseContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await fetch('http://localhost:3001/generate-description');
                const contentType = response.headers.get('content-type');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Response was not valid JSON');
                }
                const data = await response.json();
                setResponseContent(data.content); 
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);
    
    
    
    useEffect(() => {
    const apiResponse = {
        "id": "",
        "object": "",
        "created": '',
        "model": "",
        "choices": [
        {
            "index": "",
            "message": {
            "role": "",
            "content": ""
            },
            "logprobs": null,
            "finish_reason": ""
        }
        ],
        "usage": {
        "prompt_tokens": "",
        "completion_tokens": "",
        "total_tokens": 267
        },
        "system_fingerprint": null
    };

    if (apiResponse.choices && apiResponse.choices.length > 0) {
        const content = apiResponse.choices[0].message.content;
        setResponseContent(content); 
    }
    }, []);
           
    return (
        <>
            <div className='main'>

                <div className='main-links'>
                    <a className="main-link" href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
                        <img className="main-image" src={Email} alt="Email Icon" />
                    </a>
                    <a className="main-link" href={linkedin} target="_blank" rel="noopener noreferrer">
                        <img className="main-image" src={Linkedin} alt="Linkedin Icon" />
                    </a>
                    <a className="main-link" href={git} target="_blank" rel="noopener noreferrer">
                        <img className="main-image" src={GitHub} alt="GitHub Icon" />
                    </a>

                </div>
                <div className='main-container'>
                    
                    <div className='main-container-first'>
                        <p className='main-container-first-about'>
                           {responseContent}
                        </p>
                    </div>
                    <div className='main-container-second'>
                        <img className='main-container-second-img' src={imageSrc} alt='Client'/>
                    </div>
                </div>

            </div>

        </>
    )
}