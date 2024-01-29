import './Main.scss';
import Picture from '../../assets/images/kb.png'; 

import React from 'react';


export default function Main({ formData }) {
    const city1 = formData && formData.city1 ? formData.city1 : "null";
    const city2 = formData && formData.city2 ? formData.city2 : "null";
    const email = formData && formData.email ? formData.email : "null";
    const linkedin = formData && formData.linkedin ? formData.linkedin : "null";
    const git = formData && formData.git ? formData.git : "null";
    const description = formData && formData.description ? formData.description : "null";
    const imageSrc = formData && formData.image ? URL.createObjectURL(formData.image) : Picture;



    return (
        <>
            <div className='main'>
                <div className='main-city'>
                    <h2 className='main-city-first'>{city1}</h2>
                    <h2 className='main-city-second'>{city2}</h2>
                </div>
                <div className='main-container'>
                    <div className='main-container-first'>
                        <p className='main-container-first-about'>
                           {description}
                        </p>
                        <p className='main-container-first-mail'>{email}</p>
                        <p className='main-container-first-linkedin'>{linkedin}</p>
                        <p className='main-container-first-github'>{git}</p>

                    </div>
                    <div className='main-container-second'>
                        <img className='main-container-second-img' src={imageSrc} alt='Client'/>
                    </div>
                </div>

            </div>

        </>
    )
}