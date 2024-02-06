import React, { useState } from 'react';
import './VisitorNotes.scss'; 
import { ReactComponent as VisitorBackgroundSVG } from '../../assets/images/visitorbackground.svg';

function VisitorNotes() {
  const [notes, setNotes] = useState([]); 
  const [input, setInput] = useState(''); 

  const getTodaysDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-US"); 
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendClick(); 
    }
  };
  const handleSendClick = () => {
    if (input.trim()) {
      const visitorLocation = "Toronto";
      const todaysDate = getTodaysDate();

      const noteObject = {
        note: input.trim(),
        details: `Visitor from ${visitorLocation} - ${todaysDate}`
      };
      
      setNotes([...notes, noteObject]);
      setInput(''); 
    }
  };

  return (
    <div className="visitor-notes-container">
      <VisitorBackgroundSVG className="background-svg" />

      <div className="notes-list">
        {notes.map((noteObj, index) => (
          <div key={index} className="note">
            <p className="note-details-first">{noteObj.note}</p> 
            <p className="note-details-second">{noteObj.details}</p> 
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          className='input-area-text'
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Tell me something"
        />
        <button className='input-area-btn' onClick={handleSendClick} >Send</button>
      </div>

    </div>
  );
}

export default VisitorNotes;
