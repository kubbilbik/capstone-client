import React, { useState } from 'react';
import './Form.scss';
import { useNavigate } from 'react-router-dom';


export default function Form({ onFormSubmit }){
    const navigate = useNavigate();

    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
    name: '',
    birthday: '',
    city1:'',
    city2:'',
    description:'',
    email:'',
    linkedin:'',
    git:'',
    image:'',
    technologies:'',
    });

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
          image: e.target.files[0],
        });
      };


    // const handleMultiSelectChange = (e) => {
    //     const options = e.target.options;
    //     const selectedOptions = [];
    //     for (let i = 0, l = options.length; i < l; i++) {
    //       if (options[i].selected) {
    //         selectedOptions.push(options[i].value);
    //       }
    //     }
    //     setFormData({
    //       ...formData,
    //       technologies: selectedOptions,
    //     });
    // };


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("FormData:", formData);
        onFormSubmit(formData);
    
        // const formData = {
        //     birthday: data.get('birthday'),
        //     city1: data.get('city1'),
        //     city2: data.get('city2'),
        //     email: data.get('email'),
        //     linkedin: data.get('linkedin'),
        //     git: data.get('git'),
        //     description: data.get('description'),
        //     image: data.get('image'),
        //     technologies: Array.from(data.getAll('technologies')) 
        // };
        
        navigate('/main', { state: { formData } });

    
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
            <h4 className="form__input-label" htmlFor="title-input">Where Are You From?</h4>
            <input 
            className="form__input-text" 
            id="city1" 
            type="text" 
            name="city1" 
            value={formData.city1} 
            onChange={handleChange} 
            required 
            />
        </div>,
        
        <div className="form__input">
        <h4 className="form__input-label" htmlFor="title-input">Where Do You Live?</h4>
        <input 
          className="form__input-text" 
          id="city2" 
          type="text" 
          name="city2" 
          value={formData.city2} 
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
            <form className="form__upload" onSubmit={(e) => e.preventDefault()}>
                {formSteps[step]}
                <div className="form-actions">
                {step < formSteps.length - 1 ? (
                    <button type="button" onClick={nextStep}>Next</button>
                ) : (
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                )}
                </div>
            </form>
        </div>
    
        // <div className="form" >
        //     <form className="form__upload" onSubmit={handleSubmit}>

        //         <div className="form__input">
        //             <h4 className="form__input-label" htmlFor="title-input">Hands Up! What´s Your Name?</h4>
        //             <input className="form__input-text" id="title-input" type="text" placeholder="" name="name" required />
        //         </div>
        //         <div className="form__input">
        //             <h4 className="form__input-label" htmlFor="title-input">When Is Your Birthday?</h4>
        //             <input className="form__input-text" id="birthday-input" type="text" placeholder="" name="birthday" required />
        //         </div>
        //         <div className="form__input">
        //             <h4 className="form__input-label" htmlFor="title-input">Where Are You From?</h4>
        //             <input className="form__input-text" id="title-input" type="text" placeholder="" name="city1" required />
        //         </div>
        //         <div className="form__input">
        //             <h4 className="form__input-label" htmlFor="title-input">Where Do You Live?</h4>
        //             <input className="form__input-text" id="title-input" type="text" placeholder="" name="city2" required />
        //         </div>
        //         <div className="form__input">
        //             <h4 className="form__input-label" htmlFor="description-input">Give Me Some Key Words About You!</h4>
        //             <textarea className="form__input-textArea" id="description-input" placeholder="" name="description" required></textarea>
        //         </div>

        //         <div className="form__input">
        //             <h4 className="form__input-label" htmlFor="title-input">What´s Your E-mail?</h4>
        //             <input className="form__input-text" id="title-input" type="text" placeholder="" name="email" required />
        //         </div>
        //         <div className="form__input">
        //             <h4 className="form__input-label" htmlFor="title-input">What´s Your Linkedin?</h4>
        //             <input className="form__input-text" id="title-input" type="text" placeholder="" name="linkedin" required />
        //         </div>
        //         <div className="form__input">
        //             <h4 className="form__input-label" htmlFor="title-input">What´s Your GitHub?</h4>
        //             <input className="form__input-text" id="title-input" type="text" placeholder="" name="git" required />
        //         </div>

        //         <div className="form__input">
        //             <h4 className="form__input-label" htmlFor="image-upload">Upload Your Image:</h4>
        //             <input className="form__input-file" id="image-upload" type="file" name="image" />
        //         </div>



        //         <div className="form__input">
        //             <h4 className="form__input-label" htmlFor="tech-input">What Programming Languages Do You Use?</h4>
        //             <select className="form__input-select" id="tech-input" name="technologies" multiple required>
        //                 <option value="cPlus">C+</option>
        //                 <option value="cSharp">C#</option>
        //                 <option value="java">JAVA</option>
        //                 <option value="javascript">JAVASCRIPT</option>
        //                 <option value="kotlin">KOTLIN</option>
        //                 <option value="php">PHP</option>
        //                 <option value="react">REACT</option>
        //                 <option value="ruby">RUBY</option>
        //                 <option value="sass">SASS</option>
        //                 <option value="swift">SWIFT</option>
        //                 <option value="typescript">TYPESCRIPT</option>
        //             </select>
        //         </div>
        //         <div className="form-actions-btn">
        //             <button className="submit-button" type="submit">Submit</button>
        //         </div>


        //     </form> 

            

        // </div>
        
    )
}