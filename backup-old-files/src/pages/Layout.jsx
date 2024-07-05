import { Outlet, NavLink, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Layout.css'
// import Logo from "../assets/images/Other/Personal_Logo.png"

export const Layout = () => {
    /*Hides hamburger menu by default */
    const [isNavVisible, setIsNavVisible] = useState(false);
    const [isLightMode, setIsLightMode] = useState(false);

    /*Shows the hamburger menu, disables scrolling and hides content */
    const toggleNav = () => {
        setIsNavVisible(!isNavVisible);

        const body = document.body;
        const main = document.querySelector('main')
        const footer = document.querySelector('footer')

        /* Shows menu, lock scroll and hide content & footer */
        if (!isNavVisible) {
            body.classList.add('body-no-scroll');
            main.classList.add('content-hide');
            footer.classList.add('content-hide');

            /* Hides menu, unlock scroll and show content & footer */
        } else {
            body.classList.remove('body-no-scroll');
            main.classList.remove('content-hide');
            footer.classList.remove('content-hide');
        }
    }

    /* When clicking a link, calls the toggle nav function to make sure the menu closes automatically */
    const closeNav = () => {
        if (isNavVisible) {
            toggleNav();
        };
    }

    /* When light/dark mode button is clicked the light-mode class is added/removed to the body*/
    const toggleLightMode = () => {
        setIsLightMode(!isLightMode);

        const body = document.body;

        body.classList.toggle('light-mode');

        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            document.getElementById('theme-toggle').textContent = 'dark_mode';
        } else {
            localStorage.setItem('theme', 'dark');
            document.getElementById('theme-toggle').textContent = 'light_mode';
        }
    }

    /* Reads local storage to see which mode the user had chosen previously so it doesn't reset upon page reload */
    // useEffect(() => {
    //     const savedTheme = localStorage.getItem('theme');
    //     const themeToggleIcon = document.getElementById('theme-toggle');

    //     if (savedTheme === 'light') {
    //         document.body.classList.add('light-mode');
    //         themeToggleIcon.textContent = 'dark_mode';
    //     } else {
    //         document.body.classList.remove('light-mode');
    //         themeToggleIcon.textContent = 'light_mode';
    //     }
    // }, []);


    return (
        <>
            {/* Navigation */}
            <div className="nav-color-fade"></div>
            <header className='navbar content-width'>
                {/* <Link to="/" id="logo"><img src={Logo} alt="Adrian's Logo. A rose combined with a mountain." /></Link> */}
                {/* Hamburger menu */}
                {/* <input type="checkbox" id="nav-toggle" className="nav-toggle" />
                <label htmlFor="nav-toggle" className="hamburger-menu" onClick={toggleNav}>
                    <span className="material-symbols-outlined">menu</span>
                </label> */}
                {/* Nav links */}
                <nav className={`nav-menu ${isNavVisible ? 'is-visible' : ''}`}>
                    <ul>
                        <li><NavLink to="/" onClick={closeNav}>Home</NavLink ></li>
                        <li><NavLink to="/about" onClick={closeNav}>About</NavLink></li>
                        <li><NavLink to="/portfolio" onClick={closeNav}>Portfolio</NavLink></li>
                        <li><NavLink to="/resume" onClick={closeNav}>Resumé</NavLink></li>
                        <li><NavLink to="/contact" id='hire-me-button' onClick={closeNav}>Get in touch!</NavLink></li>
                    </ul>
                </nav>
                {/* <span className="material-symbols-outlined" id="theme-toggle" onClick={toggleLightMode}>{isLightMode ? 'dark_mode' : 'light_mode'}</span> */}
            </header>
            {/* Webpage */}
            <Outlet />
            {/* Footer */}
            {/* <footer className='content-width'>
                <section className="img-links-container">
                    <div className="img-button-container">
                    </div>
                    <ul>
                        <a href="https://github.com/Adrozs" target="_blank" className="social-link"><i
                            className="fa-brands fa-linkedin"></i></a>
                        <a href="https://www.linkedin.com/in/adrozs/" target="_blank" className="social-link"><i
                            className="fa-brands fa-github"></i></a>
                        <a href="mailto:adrozsahegyi@gmail.com" target="_blank" className="social-link"><i
                            className="fa-solid fa-envelope"></i></a>
                    </ul>
                </section>

                <p id="copyright-text">© Copyright 2024 Adrian Rozsahegyi. All rights reserved.</p>
            </footer> */}
        </>
    )
}