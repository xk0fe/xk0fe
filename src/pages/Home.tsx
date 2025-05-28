import React from 'react';
import { Link } from 'react-router';
import logo from '../logo.svg';
import './Home.css';
import CareerTimeline from '../components/CareerTimeline';

const Home: React.FC = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <img src={logo} className="hero-logo" alt="logo" />
          <h1>About me</h1>
          <p className="hero-description">
            A modern game developer built with felash and bones.
          </p>
          <div className="hero-actions">
            <a
              className="btn btn-primary"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            <Link
              className="btn btn-secondary"
              to="/blog"
            >
              Visit Blog
            </Link>
          </div>
        </div>
      </section>
      
      <section className="features">
        <div className="container">
          <h2>Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🚀 Fast Performance</h3>
              <p>Built with React and optimized for speed and performance.</p>
            </div>
            <div className="feature-card">
              <h3>📱 Responsive Design</h3>
              <p>Looks great on all devices, from mobile to desktop.</p>
            </div>
            <div className="feature-card">
              <h3>🎨 Modern UI</h3>
              <p>Clean, modern interface with smooth animations.</p>
            </div>
          </div>
        </div>
      </section>

      <CareerTimeline />
    </div>
  );
};

export default Home; 