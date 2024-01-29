import './About.scss';

export default function About({ formData }){
    const birthday = formData && formData.birthday ? formData.birthday : "Belirtilmemiş";

    return(
        <>
            <div className='about'>
                <div className='about-title'>
                    <h3 className='about-title-abt'>About</h3>
                </div>
                <div className='about-container'>
                    <h1 className='about-bday'>{birthday}</h1>
                    <p className='about-message'>Thank you, mom&dad, for ushering me into this somber world.</p>
                </div>
            </div>

        </>
    )
} 