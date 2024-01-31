import './About.scss';
import React from 'react';


export default function About({ formData }){
    const birthday = formData && formData.birthday ? formData.birthday : "null";

    const birthdayParts = birthday.split('.');
    
    return(
        <>
            <div className='about'>
                <div className='about-title'>
                    <h3 className='about-title-abt'>About Me</h3>
                </div>
                <div className='about-container'>
                    {birthdayParts.map((part, index) => (
                    <React.Fragment key={index}>
                        <span className='about-bday'>{part}.</span>
                        {index < birthdayParts.length - 1 && <br />}
                    </React.Fragment>
                    ))}
                    <p className='about-message'>Thank you, mom&dad, for ushering me into this somber world.</p>
                </div>
            </div>

        </>
    )
} 