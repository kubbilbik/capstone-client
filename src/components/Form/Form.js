import React, { useState } from 'react';
import './Form.scss';
import { useNavigate } from 'react-router-dom';

export default function Form({ onFormSubmit }){
    const navigate = useNavigate();
    const [step, setStep] = useState(0); 

    const [formData, setFormData] = useState({
      name: '',
      birthday: '',
      description:'',
      email:'',
      linkedin:'',
      git:'',
      image: null,
      technologies: [], 
    });


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');



    

    const programmingLanguages = [
      "C+", "C#", "JAVA", "JAVASCRIPT", "KOTLIN", "PHP", "REACT", "RUBY", "SASS", "SWIFT", "TYPESCRIPT", "HTML", "CSS", "MONGODB", "NODEJS", "MYSQL"
    ];

    const nextStep = () => {
      if (step < formSteps.length - 1) {
          setStep(step + 1);
      } else {
          handleSubmit();
      }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData({
          ...formData,
          image: e.target.files[0] || null, 
        });
    };

    const handleCheckboxChange = (e) => {
      const { value, checked } = e.target;
      setFormData(prevData => ({
          ...prevData,
          technologies: checked
              ? [...prevData.technologies, value]
              : prevData.technologies.filter(tech => tech !== value),
      }));
    };


    // const pollForDescription = async (maxAttempts = 5, interval = 5000) => {
    //   for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    //     try {
    //       const response = await fetch('http://localhost:3001/generate-description');
    //       if (response.ok) {
    //         const data = await response.json();
    //         return data; 
    //       }
    //       await new Promise(resolve => setTimeout(resolve, interval));
    //     } catch (error) {
    //       console.error('Polling error:', error);
    //     }
    //   }
    //   throw new Error('Description generation timeout');
    // };
    
const handleSubmit = async (event) => {
  event.preventDefault();
  setLoading(true);
  setError('');

  const formDataToSend = new FormData();
  Object.keys(formData).forEach(key => {
    if (key !== 'technologies' && key !== 'image') {
      formDataToSend.append(key, formData[key]);
    }
  });

  if (formData.technologies.length > 0) {
    formDataToSend.append('technologies', formData.technologies.join(','));
  }

  if (formData.image) {
    formDataToSend.append('image', formData.image);
  }

  try {
    const formResponse = await fetch('http://localhost:3001/submit-form', {
      method: 'POST',
      body: formDataToSend, // FormData is directly usable with fetch to send multipart/form-data
    });

    if (formResponse.ok) {
      const responseJson = await formResponse.json();
      console.log('Form submission successful', responseJson);
      try {
          const gptResponse = await fetch('http://localhost:3001/generate-description', {
          method: 'POST',
          body: formDataToSend.description,
        })
      } catch (error) {
        console.error('Error:', error);
        setError('An unexpected error occurred.');
      }
      navigate('/main', { state: { formData: formData } });
    } else {
      console.error('Form submission failed');
      setError('Form submission failed.');
    }
  } catch (error) {
    console.error('Error:', error);
    setError('An unexpected error occurred.');
  } finally {
    setLoading(false);
  }
};

    




    const formSteps = [

        <div className="form__input">
          <h4 className="form__input-label" htmlFor="title-input">Hands Up! What’s Your Name?</h4>
          <input 
            className="form__input-text" 
            id="name" 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>,
        
        <div className="form__input">
          <h4 className="form__input-label" htmlFor="title-input">When Is Your Birthday?</h4>
          <input 
            className="form__input-text" 
            id="birthday" 
            type="text" 
            name="birthday" 
            value={formData.birthday} 
            onChange={handleChange} 
            required 
          />
        </div>,

        <div className="form__input">
          <h4 className="form__input-label" htmlFor="title-input">What´s Your E-mail?</h4>
          <input 
            className="form__input-text" 
            id="email" 
            type="text" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>,

        <div className="form__input">
            <h4 className="form__input-label" htmlFor="title-input">What´s Your Linkedin?</h4>
            <input 
            className="form__input-text" 
            id="linkedin" 
            type="text" 
            name="linkedin" 
            value={formData.linkedin} 
            onChange={handleChange} 
            required 
            />
        </div>,

        <div className="form__input">
            <h4 className="form__input-label" htmlFor="title-input">What´s Your GitHub?</h4>
            <input 
            className="form__input-text" 
            id="git" 
            type="text" 
            name="git" 
            value={formData.git} 
            onChange={handleChange} 
            required 
            />
        </div>,

        <div className="form__input">
            <h4 className="form__input-label" htmlFor="title-input">Upload Your Image:</h4>
            <input 
            className="form__input-file" 
            id="image" 
            type="file" 
            name="image" 
            onChange={handleFileChange} 
            required 
            />
        </div>,

        <div className="form__input">
        <h4 className="form__input-label" htmlFor="tech-input">What Programming Languages Do You Use?</h4>
        <div className="form__input-checkbox-group">
            {programmingLanguages.map((language, index) => (
                <label key={index}>
                    <input 
                        type="checkbox" 
                        name="technologies" 
                        value={language.toLowerCase()} 
                        checked={formData.technologies.includes(language.toLowerCase())}
                        onChange={handleCheckboxChange} 
                    />
                    {language}
                </label>
            ))}
        </div>
        </div>,
        
        <div className="form__input">
            <h4 className="form__input-label" htmlFor="description-input">Give Me Some Key Words About You!</h4>
            <textarea 
            className="form__input-file" 
            id="description" 
            type="text" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            required 
            />
        </div>,
    ];
    

    return (
      <div className="form">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <form onSubmit={(e) => e.preventDefault()}>
                {formSteps[step]}
                <div className="form-actions">
                    {step < formSteps.length - 1 ? (
                        <button type="button" onClick={nextStep}>Next</button>
                    ) : (
                        <button type="button" onClick={handleSubmit}>Submit</button>
                    )}
                </div>
            </form>
        </div>
  );
}