import React from 'react';
import './Line.scss';

const Line = () => {
  return <div className="line-component">
            <svg width="600" height="100" xmlns="http://www.w3.org/2000/svg">
            <path id="myPath" d="M10 50 L590 50" stroke="black" stroke-width="2" fill="none" />
            </svg>
        </div>;
};

export default Line;
