import React, { useState } from 'react';
import './Form.scss';
import { useNavigate } from 'react-router-dom';

export default function Form({ onFormSubmit }){
    const navigate = useNavigate();
    const [step, setStep] = useState(0); 

    // State to manage form data as a single object for ease of submission and manipulation
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
      "C+", "C#", "JAVA", "JAVASCRIPT", "KOTLIN", "PHP", "REACT", "PYTHON", "RUBY", "SASS", "SWIFT", "TYPESCRIPT", "HTML", "CSS", "MONGODB", "NODEJS", "MYSQL"
    ];

    // Function to advance to the next step of the form or submit if it's the last step
    const nextStep = () => {
      if (step < formSteps.length - 1) {
          setStep(step + 1);
      } else {
          handleSubmit();
      }
    };

    // Handles input changes for text inputs and updates the formData state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    // Handles file input changes specifically for the image upload
    const handleFileChange = (e) => {
        setFormData({
          ...formData,
          image: e.target.files[0] || null, 
        });
    };

    // Handles changes for checkbox inputs to manage the technologies array
    const handleCheckboxChange = (e) => {
      const { value, checked } = e.target;
      setFormData(prevData => ({
          ...prevData,
          technologies: checked
              ? [...prevData.technologies, value] // Add technology if checked
              : prevData.technologies.filter(tech => tech !== value),
      }));
    };

 
  
  // Asynchronous function to handle form submission
  const handleSubmit = async (event) => {
  event.preventDefault();
  setLoading(true);
  setError('');
  

  const formDataToSend = new FormData();
  // Append all formData keys except for 'technologies' and 'image' directly
  Object.keys(formData).forEach(key => {
    if (key !== 'technologies' && key !== 'image') {
      formDataToSend.append(key, formData[key]);
    }
  });

  // Join technologies array into a string to append
  if (formData.technologies.length > 0) {
    formDataToSend.append('technologies', formData.technologies.join(','));
  }

  // Append image file if present
  if (formData.image) {
    formDataToSend.append('image', formData.image);
  }



  try {
    // Attempt to submit the form data to a specified endpoint
    const formResponse = await fetch('http://localhost:3001/submit-form', {
      method: 'POST',
      body: formDataToSend, 
    });

    if (formResponse.ok) {
      // Handle successful form submission here
      const responseJson = await formResponse.json();
      console.log('Form submission successful', responseJson);
      try {
          const gptResponse = await fetch('http://localhost:3001/generate-description', {
          method: 'POST',
          body: formDataToSend.description,
        })
        console.log(gptResponse)
      } catch (error) {
        console.error('Error:', error);
        setError('An unexpected error occurred.');
      }
      navigate('/loading', { state: { formData: formData } });
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