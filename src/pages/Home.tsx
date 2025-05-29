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
            A modern game developer built with flesh and bones.
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
          <h2>😎😎😎</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>15 years of game development</h3>
              <p>From 2D games for GameBoy to 3D games for PC.</p>
            </div>
            <div className="feature-card">
              <h3>5 years of commercial experience</h3>
              <p>Small startups, big companies, deadlines, teams,.</p>
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