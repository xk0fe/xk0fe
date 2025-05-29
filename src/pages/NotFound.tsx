import React from 'react';
import { Link } from 'react-router';
import './NotFound.css';

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <div className="container">
          <div className="not-found-header">
            <h1 className="error-code">404</h1>
            <div className="error-message">
              <h2>🎮 GAME OVER</h2>
              <p>The page you're looking for has been consumed by a bug!</p>
            </div>
          </div>
          
          <div className="not-found-body">
            <div className="error-details">
              <div className="pixel-art">
                <div className="pixel-ghost">
                  <div className="ghost-body">
                    <div className="ghost-eyes">
                      <span>• •</span>
                    </div>
                    <div className="ghost-mouth">o</div>
                  </div>
                  <div className="ghost-tail">
                    <span>~~~</span>
                  </div>
                </div>
              </div>
              
              <div className="error-text">
                <h3>Oops! This dimension doesn't exist</h3>
                <p>
                  Looks like you've wandered into the void of the k0fe universe. 
                  Don't worry, even the best developers get lost sometimes!
                </p>
              </div>
            </div>
            
            <div className="not-found-actions">
              <Link to="/" className="btn btn-primary">
                🏠 Return Home
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                📧 Report Bug
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 