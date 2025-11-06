import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home.jsx';
import About from './About.jsx';
import Services from './Services.jsx';
import Contact from './Contact.jsx';


function App() {
  return (
    <div>
      <nav style={{ backgroundColor: '#eee', padding: '10px' }}>
        <Link to="/" style={{ margin: '10px' }}>Home</Link>
        <Link to="/about" style={{ margin: '10px' }}>About</Link>
        <Link to="/services" style={{ margin: '10px' }}>Services</Link>
        <Link to="/contact" style={{ margin: '10px' }}>Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
