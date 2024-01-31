import React, { useState } from 'react';
import './VisitorNotes.scss'; 

import { ReactComponent as VisitorBackgroundSVG } from '../../assets/images/visitorbackground.svg';


function VisitorNotes() {
  const [notes, setNotes] = useState([]); // This will hold an array of notes
  const [input, setInput] = useState(''); // This will hold the current value of the text input

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendClick = () => {
    if (input.trim()) {
      setNotes([...notes, input.trim()]);
      setInput(''); 
    }
  };

  return (
    <div className="visitor-notes-container">
    <VisitorBackgroundSVG className="background-svg" />


      <div className="notes-list">
        {notes.map((note, index) => (
          <div key={index} className="note">
            {note}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          className='input-area-text'
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Tell me something"
        />
        <button className='input-area-btn' onClick={handleSendClick}>Send</button>
      </div>


    </div>
    
  );
}

export default VisitorNotes;
