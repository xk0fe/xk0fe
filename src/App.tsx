import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import './App.css';
import emailjs from "@emailjs/browser";

function App() {
  useEffect(() => {
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    if (!publicKey) {
      console.error('EmailJS public key is not set');
    } else {
      emailjs.init(publicKey);
      console.log('EmailJS initialized successfully');
    }
  }, []);

  return (
    <BrowserRouter basename="/xk0fe">
      <div className="App">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            {/* Catch-all route for 404 errors */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;