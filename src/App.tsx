import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Blog from './pages/Blog';
import './App.css';

function App() {
  return (
    <BrowserRouter basename="/xk0fe">
      <div className="App">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;