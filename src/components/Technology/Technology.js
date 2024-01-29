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





export default function Technology( { formData }){
        const [time, setTime] = useState(new Date()); 
      
        useEffect(() => {
          const timerId = setInterval(() => {
            setTime(new Date());
          }, 100); 
      
          return () => clearInterval(timerId);
        }, []); 
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
      
        const currentTimeString = `${hours}:${minutes}:${seconds}`;
    
      
        const renderSelectedTechImages = () => {
          if (!formData || !formData.technologies) {
              return <p>No technologies selected.</p>;
          }
  
          return formData.technologies.map((tech) => {
              switch (tech) {
                  case 'cSharp': return <img className='tech-img' src={cSharp} alt='C#' />;
                  case 'cPlus': return <img className='tech-img' src={cPlus} alt='C++' />;
                  case 'java': return <img className='tech-img' src={java} alt='java' />;
                  case 'kotlin': return <img className='tech-img' src={kotlin} alt='kotlin' />;
                  case 'php': return <img className='tech-img' src={php} alt='php' />;
                  case 'python': return <img className='tech-img' src={python} alt='python' />;
                  case 'ruby': return <img className='tech-img' src={ruby} alt='ruby' />;
                  case 'swift': return <img className='tech-img' src={swift} alt='swift' />;
                  case 'typescript': return <img className='tech-img' src={typescript} alt='typescript' />;
                  case 'react': return <img className='tech-img' src={react} alt='react' />;
                  case 'sass': return <img className='tech-img' src={sass} alt='sass' />;

                  // Diğer teknolojiler için benzer case'ler...
                  default: return null;
              }
          });
      };

    return(
        <>
        <div className='technology'>

            <div>
                <p>Would you like to take a coffee break?</p>
                <p>{currentTimeString}</p>
            </div>
            <div>
                {renderSelectedTechImages()}
            </div>

        </div>

        </>
    )
}