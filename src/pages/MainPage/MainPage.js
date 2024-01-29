import React, { useEffect } from 'react';
import './MainPage.scss';
import VisitorNotes from "../../components/VisitorNotes/VisitorNotes";
import About from "../../components/About/About";
import Main from "../../components/Main/Main";
import Technology from "../../components/Technology/Technology";


export default function MainPage({ formData }){
    useEffect(() => {
        console.log("FormData in MainPage:", formData);
    }, [formData]);
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

