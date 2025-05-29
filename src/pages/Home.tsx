import React from 'react';
import { Link } from 'react-router';
import logo from '../assets/images/cup.gif';
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
            hi im k0fe and ive been making games for a long time now
          </p>
          <div className="hero-actions">
            <button
              className="btn btn-primary"
              disabled
              aria-label="Projects coming soon"
            >
              Projects (soon)
            </button>
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
          <h2>Flex Points</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>15 years making games</h3>
              <p>From 2D games for Nintendo DS to 3D VR experiences</p>
            </div>
            <div className="feature-card">
              <h3>6 years of commercial experience</h3>
              <p>Small startups, big companies, deadlines, teams, etc.</p>
            </div>
            <div className="feature-card">
              <h3>15+ shipped games</h3>
              <p>From prototype to final release</p>
            </div>
          </div>
        </div>
      </section>

      <CareerTimeline />
    </div>
  );
};

export default Home; 