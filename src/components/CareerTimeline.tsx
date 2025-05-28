import React, { useEffect, useRef, useState } from 'react';
import './CareerTimeline.css';

interface Project {
  name: string;
  icon: string;
  link: string;
  description: string;
}

interface Position {
  position: string;
  duration: string;
  description: string;
  skills: string[];
  projects?: Project[];
}

interface CompanyStep {
  id: number;
  company: string;
  positions: Position[];
  icon: string;
  totalDuration: string;
}

const careerData: CompanyStep[] = [
  {
    id: 1,
    company: "Tech Startup Inc.",
    totalDuration: "2020 - 2022",
    icon: "🎮",
    positions: [
      {
        position: "Junior Game Developer",
        duration: "2020 - 2021",
        description: "Started my journey in game development, working on mobile games and learning the fundamentals.",
        skills: ["Unity", "C#", "Mobile Development", "Version Control"],
        projects: [
          {
            name: "Idle Fish tycoon",
            icon: "https://play-lh.googleusercontent.com/lR4mfEI50hA2WQmKtI347YypAxc-JyGfj7IQLy78XHbA5ZOUB2BkhZUnnJLy5Z4FDg=s48-rw",
            link: "https://play.google.com/store/apps/details?id=com.greenbuttongames.FishIdle&hl=en_US&gl=US",
            description: "Hybrid casual game with idle and tycoon elements"
          },
          {
            name: "Runner Adventure",
            icon: "🏃",
            link: "https://example.com/runner-adventure",
            description: "Endless runner with power-ups and challenges"
          }
        ]
      },
      {
        position: "Middle Game Developer",
        duration: "2021 - 2022",
        description: "Progressed to more complex projects, took on mentoring responsibilities and improved game monetization systems.",
        skills: ["Advanced Unity", "Mentoring", "Game Analytics", "Monetization Systems"],
        projects: [
          {
            name: "Enhanced Fish Tycoon",
            icon: "🐟",
            link: "https://example.com/enhanced-fish-tycoon",
            description: "Major update with new features and improved monetization"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    company: "GameStudio Pro",
    totalDuration: "2022 - 2023",
    icon: "🚀",
    positions: [
      {
        position: "Game Developer",
        duration: "2022 - 2023",
        description: "Developed complex gameplay mechanics and optimized performance for various platforms.",
        skills: ["Advanced Unity", "Performance Optimization", "Multiplayer Systems", "Shader Programming"],
        projects: [
          {
            name: "Space Combat Arena",
            icon: "🚀",
            link: "https://example.com/space-combat",
            description: "Multiplayer space shooter with custom physics"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    company: "Innovation Games",
    totalDuration: "2023 - Present",
    icon: "⭐",
    positions: [
      {
        position: "Senior Game Developer",
        duration: "2023 - Present",
        description: "Leading development teams and architecting scalable game systems for AAA projects.",
        skills: ["Team Leadership", "System Architecture", "Cross-platform Development", "AI Implementation"]
      }
    ]
  }
];

const CareerTimeline: React.FC = () => {
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const stepId = parseInt(entry.target.getAttribute('data-step-id') || '0');
          if (entry.isIntersecting) {
            setVisibleSteps(prev => new Set(Array.from(prev).concat(stepId)));
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-50px 0px'
      }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const getStepSide = (index: number): 'left' | 'right' => {
    return index % 2 === 0 ? 'left' : 'right';
  };

  return (
    <section className="career-timeline">
      <div className="container">
        <h2>My Career Journey</h2>
        <div className="timeline">
          <div className="timeline-line"></div>
          {careerData.map((company, index) => {
            const stepSide = getStepSide(index);
            const hasMultiplePositions = company.positions.length > 1;
            
            return (
              <div
                key={company.id}
                ref={(el) => { stepRefs.current[index] = el; }}
                data-step-id={company.id}
                className={`timeline-step ${visibleSteps.has(company.id) ? 'visible' : ''} ${
                  stepSide === 'right' ? 'step-right' : 'step-left'
                } ${
                  hasMultiplePositions ? 'multi-position-company' : 'single-position-company'
                }`}
              >
                <div className="timeline-marker">
                  <span className="timeline-icon">{company.icon}</span>
                  {hasMultiplePositions && <div className="progression-indicator">{company.positions.length}</div>}
                </div>
                <div className="timeline-content">
                  <div className="timeline-card">
                    <div className="company-header">
                      <h3>{company.company}</h3>
                      <span className="company-duration">{company.totalDuration}</span>
                      {hasMultiplePositions && (
                        <div className="progression-badge">
                          <span>🚀 {company.positions.length} Positions</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="positions-container">
                      {company.positions.map((position, positionIndex) => (
                        <div key={positionIndex} className={`position-item ${hasMultiplePositions ? 'multi-position' : 'single-position'}`}>
                          <div className="position-header">
                            <h4>{position.position}</h4>
                            <span className="position-duration">{position.duration}</span>
                            {hasMultiplePositions && positionIndex > 0 && (
                              <div className="promotion-arrow">↗️</div>
                            )}
                          </div>
                          <p>{position.description}</p>
                          
                          {position.projects && position.projects.length > 0 && (
                            <div className="projects-section">
                              <h5>Key Projects:</h5>
                              <div className="projects-grid">
                                {position.projects.map((project, projectIndex) => (
                                  <a
                                    key={projectIndex}
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-item"
                                    title={project.description}
                                  >
                                    <span className="project-icon">
                                      {project.icon.startsWith('http') ? (
                                        <img 
                                          src={project.icon} 
                                          alt={project.name}
                                          className="project-icon-img"
                                        />
                                      ) : (
                                        project.icon
                                      )}
                                    </span>
                                    <span className="project-name">{project.name}</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div className="position-skills">
                            {position.skills.map((skill, skillIndex) => (
                              <span key={skillIndex} className="skill-tag">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CareerTimeline; 