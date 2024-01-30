import React from 'react';
import { useLocation } from 'react-router-dom';

import './MainPage.scss';
import VisitorNotes from "../../components/VisitorNotes/VisitorNotes";
import About from "../../components/About/About";
import Main from "../../components/Main/Main";
import Technology from "../../components/Technology/Technology";


export default function MainPage(){
    const location = useLocation();
    const formData = location.state?.formData; 

   
    console.log("FormData in MainPage:", formData);

    return(
        <>
            <div className="horizontal-scroll-container">
                <About formData={formData} />
                <Main formData={formData} />
                <VisitorNotes />
                <Technology  formData={formData} />
            </div>
        </>
    )
}

