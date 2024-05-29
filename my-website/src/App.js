import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WaphFunctionalities from './WaphFunctionalities';
import usePageTracking from './usePageTracking';

const App = () => {
  return (
    <Router>
      <div className="App container-fluid bg-dark text-light d-flex flex-column min-vh-100">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <NavLink
              className={({ isActive }) => isActive ? "navbar-brand active" : "navbar-brand"}
              to="/"
            >
              Home
            </NavLink>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item"></li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                    to="/waph-functionalities"
                  >
                    WAPH Functionalities
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/waph-functionalities" element={<WaphFunctionalities />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home = () => {
  usePageTracking();
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    const username = getCookie('username');
    const lastVisit = getCookie('lastVisit');
    const currentVisit = new Date().toLocaleString();

    if (!username) {
      setWelcomeMessage('Welcome to my homepage!');
      setCookie('username', 'YOURusername', 365);
    } else {
      setWelcomeMessage(`Welcome back! Your last visit was ${lastVisit}`);
    }

    setCookie('lastVisit', currentVisit, 365);
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=UA-315439340-1`;
    script.async = true;
    document.head.appendChild(script);

    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-315439340-1');
    `;
    document.head.appendChild(inlineScript);
  }, []);

  return (
    <div className="row flex-grow-1">
      <aside className="col-md-3 bg-secondary text-center p-4 d-flex flex-column justify-content-center">
        <img src="./myhead.jpg" alt="Headshot" className="img-thumbnail mx-auto mb-3" width="200" />
        <h2>Zaid Najar</h2>
        <p><a href="mailto:najarzs@mail.uc.edu" className="text-light">najarzs@mail.uc.edu</a></p>
        <p>(614) 943-0626</p>
        <p><a href="https://linkedin.com/in/zaidnajar" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-block mb-2">LinkedIn</a></p>
        <button className="btn btn-primary btn-block mb-4" onClick={() => window.open('/Najar.Zaid.Resume.2023..pdf', '_blank')}>View Resume</button>
        <div className="mt-4">
          <h4>Skills</h4>
          <div className="skill">
            <p>Java</p>
            <div className="progress">
              <div className="progress-bar bg-info" role="progressbar" style={{ width: '70%' }}>
                <span className="percentage">70%</span>
              </div>
            </div>
          </div>
          <div className="skill">
            <p>C++</p>
            <div className="progress">
              <div className="progress-bar bg-info" role="progressbar" style={{ width: '85%' }}>
                <span className="percentage">85%</span>
              </div>
            </div>
          </div>
          <div className="skill">
            <p>Python</p>
            <div className="progress">
              <div className="progress-bar bg-info" role="progressbar" style={{ width: '85%' }}>
                <span className="percentage">85%</span>
              </div>
            </div>
          </div>
          <div className="skill">
            <p>HTML</p>
            <div className="progress">
              <div className="progress-bar bg-info" role="progressbar" style={{ width: '90%' }}>
                <span className="percentage">90%</span>
              </div>
            </div>
          </div>
          <div className="skill">
            <p>JavaScript</p>
            <div className="progress">
              <div className="progress-bar bg-info" role="progressbar" style={{ width: '80%' }}>
                <span className="percentage">80%</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <main className="col-md-9 p-4 d-flex flex-column justify-content-center">
        <div className="header text-center mb-4">
          <h1 className="display-4">Zaid Najar's Portfolio</h1>
          <p className="lead">WAPH-Project 1</p>
        </div>
        <section className="mb-4">
          <h3>Background</h3>
          <p>I am a student at the University of Cincinnati, from Westerville, Ohio and I am currently pursuing a Bachelor's degree in Computer Science and a Master's of Business Administration.</p>
        </section>
        <section className="mb-4">
          <h3>Experience</h3>
          <p>I have worked as a Software Development Co-op at Siemens Digital Industries Software. In this position, I worked on the Solutionlink team, which is a project management site used by large companies to digitize their data. I used AngularJS, HTML, and C# to develop new pages and fix bugs.</p>
        </section>
        <p>
          Learn more about the <a href="/waph.html" className="text-light">Web Application Programming and Hacking course</a>.
        </p>
        <div className="alert alert-info mt-4">{welcomeMessage}</div>
      </main>
    </div>
  );
};

const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export default App;
