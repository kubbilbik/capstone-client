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

    const programmingLanguages = [
      "C+", "C#", "JAVA", "JAVASCRIPT", "KOTLIN", "PHP", "REACT", "RUBY", "SASS", "SWIFT", "TYPESCRIPT"
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
      setFormData((prevData) => {
          const technologies = checked
              ? [...prevData.technologies, value]
              : prevData.technologies.filter((tech) => tech !== value);
    
          return {
              ...prevData,
              technologies,
          };
      });
   };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

      const handleSubmit = async (event) => {
      event.preventDefault();
  
      setLoading(true);
      setError('');
  
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'technologies') {
          value.forEach(technology => {
            formDataToSend.append('technologies', technology);
          });
        } else if (key === 'image' && value) {
          formDataToSend.append('image', value);
        } else {
          formDataToSend.append(key, value.toString());
        }
      });
  
      try {
        const formResponse = await fetch('http://localhost:3001/submit-form', {
          method: 'POST',
          body: formDataToSend,
        });
  
        if (formResponse.ok) {
          // Form submission succeeded, wait for a bit before fetching the description
          setTimeout(async () => {
            try {
              const descriptionResponse = await fetch('http://localhost:3001/generate-description');
              if (descriptionResponse.ok) {
                const descriptionData = await descriptionResponse.json();
                setFormData(prev => ({ ...prev, description: descriptionData.generatedDescription }));
                navigate('/main', { state: { formData: { ...formData, description: descriptionData.generatedDescription } } });
              } else {
                console.error('Error retrieving description');
                setError('Error retrieving description.');
              }
            } catch (error) {
              console.error('Error:', error);
              setError('An error occurred while fetching the description.');
            } finally {
              setLoading(false);
            }
          }, 3000); // Wait for 1 second
        } else {
          console.error('Form submission failed');
          setError('Form submission failed.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        setError('An unexpected error occurred.');
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
    

    return(
        <div className="form">
          {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
            <form className="form__upload" onSubmit={(e) => e.preventDefault()}>
                {formSteps[step]}
                <div className="form-actions">
                    {step < formSteps.length - 1 ? (
                        <button className="button-next" type="next" onClick={nextStep}>Next</button>
                    ) : (
                        <button type="submit" onClick={handleSubmit}>Submit</button>
                    )}
                </div>
            </form>
        </div>       
    )
                    }