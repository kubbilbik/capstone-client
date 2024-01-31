import './Technology.scss';
import React, { useState, useEffect } from 'react';

import cSharp from '../../assets/images/cSharp.png';
import cPlus from '../../assets/images/cPlus.png';
import java from '../../assets/images/java.png';
import kotlin from '../../assets/images/kotlin.png';
import php from '../../assets/images/php.png';
import python from '../../assets/images/python.png';
import ruby from '../../assets/images/ruby.png';
import swift from '../../assets/images/swift.png';
import typescript from '../../assets/images/typscript.png';
import react from '../../assets/images/react.png';
import sass from '../../assets/images/sass.png';


const techImages = {
    cSharp: cSharp,
    cPlus: cPlus,
    java: java,
    kotlin: kotlin,
    php: php,
    python: python,
    ruby: ruby,
    swift: swift,
    typescript: typescript,
    react: react,
    sass: sass,
};


export default function Technology({ formData }) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    const formatTime = (time) => {
        return time.toString().padStart(2, '0');
    };

    const currentTimeString = `${formatTime(time.getHours())}:${formatTime(time.getMinutes())}:${formatTime(time.getSeconds())}`;


    const renderSelectedTechImages = () => {
        const technologiesArray = Array.isArray(formData.technologies) 
        ? formData.technologies 
        : formData.technologies.split(',');
    
        return technologiesArray.map((tech) => {
          const imageSrc = techImages[tech];
          return imageSrc ? (
            <div key={tech} className="floating">
              <img className='tech-img' src={imageSrc} alt={`Programming Language`} />
            </div>
          ) : null;
        });
      };
      


    return (
        <>
            <div className='technology'>
                <div>
                    <p>Would you like to take a coffee break?</p>
                    <p>{currentTimeString}</p>
                </div>
                <div className='technology-images'>
                    {renderSelectedTechImages()}
                </div>
            </div>
        </>
    )
}