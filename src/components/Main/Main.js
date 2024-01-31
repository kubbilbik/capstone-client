import './Main.scss';
import Picture from '../../assets/images/kb.png'; 
import { Link } from 'react-router-dom';

import Email from '../../assets/images/email.png';
import Linkedin from '../../assets/images/linkedin.png';
import GitHub from '../../assets/images/github.png';


import React from 'react';


export default function Main({ formData }) {
    const email = formData && formData.email ? formData.email : "null";
    const linkedin = formData && formData.linkedin ? formData.linkedin : "null";
    const git = formData && formData.git ? formData.git : "null";
   
    const description = formData && formData.description ? formData.description : "null";
    const imageSrc = formData && formData.image && (formData.image instanceof Blob || formData.image instanceof File) 
                    ? URL.createObjectURL(formData.image) 
                    : Picture;

           
    return (
        <>
            <div className='main'>

                <div className='main-links'>
                    <Link className="main-link" to={email}>
                        <img className="main-image" 
                        src={Email} 
                        alt="Email Icon " />
                    </Link>
                    <Link className="main-link" to={linkedin} >
                        <img className="main-image" 
                        src={Linkedin} 
                        alt="Linkedin Icon " />
                    </Link>
                    <Link className="main-link" to={git}>
                        <img className="main-image" 
                        src={GitHub} 
                        alt="GitHub Icon " />
                    </Link>
                </div>
                <div className='main-container'>
                    
                    <div className='main-container-first'>
                        <p className='main-container-first-about'>
                           {description}
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