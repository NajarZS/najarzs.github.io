import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Zaid Najar</h1>
        <img src="path/to/your/headshot.jpg" alt="Headshot" className="App-headshot" />
        <p>Email: <a href="mailto:najarzs@mail.uc.edu">najarzs@mail.uc.edu</a></p>
        <p>Phone: (614) 943-0626</p>
        <p><a href="https://linkedin.com/in/zaidnajar" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
      </header>
      <section>
        <h2>Background</h2>
        <p>Education: B.S. in Computer Science, University of Cincinnati</p>
        <p>Master of Business Administration, University of Cincinnati</p>
      </section>
      <section>
        <h2>Experience</h2>
        <ul>
          <li>Software Development Co-op at Siemens Digital Industries Software</li>
          <li>Server / To-Go Employee at Texas Roadhouse</li>
        </ul>
      </section>
      <section>
        <h2>Skills</h2>
        <ul>
          <li>Java, C++, Python, MATLAB, AngularJS, HTML, JavaScript</li>
          <li>Windows, Linux, macOS</li>
        </ul>
      </section>
    </div>
  );
}

export default App;
