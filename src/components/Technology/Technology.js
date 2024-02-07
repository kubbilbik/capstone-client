import './Technology.scss';
import React, { useState, useEffect } from 'react';

import cSharp from '../../assets/images/cSharp.png';
import cPlus from '../../assets/images/cPlus.jpeg';
import java from '../../assets/images/java.png';
import kotlin from '../../assets/images/kotlin.jpg';
import php from '../../assets/images/php.png';
import python from '../../assets/images/python.png';
import ruby from '../../assets/images/ruby.png';
import swift from '../../assets/images/swift.png';
import typescript from '../../assets/images/typescript.png';
import react from '../../assets/images/react.png';
import sass from '../../assets/images/sass.png';
import html from '../../assets/images/html.jpg';
import css from '../../assets/images/css.png';
import mongo from '../../assets/images/mongo.png';
import node from '../../assets/images/node.jpg';
import mysql from '../../assets/images/mysql.png';




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
    html: html,
    css: css,
    mongo: mongo,
    node: node,
    mysql: mysql,
};

Technology.defaultProps = {
    formData: {
      technologies: [], 
    },
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
        const technologiesArray = formData && formData.technologies
        ? formData.technologies
        : Technology.defaultProps.formData.technologies;

        if (!formData || !formData.technologies) {
            console.log("formData or formData.technologies is undefined.");
            return null;
        }
    
        return technologiesArray.map((tech) => {
          const imageSrc = techImages[tech];
          return imageSrc ? (
            <div key={tech}>
              <img className='tech-img' src={imageSrc} alt={`${tech} programming language logo`}
 />
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
                <div className='technology-container'>
                    <h3 className='technology-title-abt'>What Technologies Do I Use?</h3>
                    <div className='technology-images'>
                        {renderSelectedTechImages()}
                    </div>
                </div>
                
            </div>
        </>
    )
}