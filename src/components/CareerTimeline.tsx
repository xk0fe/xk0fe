import React, { useEffect, useRef, useState } from 'react';
import './CareerTimeline.css';
import { logos } from '../assets/images/logos';
import { gameIcons } from '../assets/images/gameIcons';

interface Project {
  name: string;
  icon: string | any;
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
  logoKey?: string;
  customLogoBackground?: string;
}

const careerData: CompanyStep[] = [
  {
    id: 0,
    company: "Indie",
    totalDuration: "2010 - 2019",
    icon: "🚀",
    positions: [
      {
        position: "Unity",
        duration: "2013 - 2019",
        description: "Developed multiple mobile games. Finished with an open source platformer game for the Android platform using Unity",
        skills: ["C#", "JavaScript", "Unity", "Android", "Firebase", "Google Play Services", "Photon", "Version Control", "Blender"],
        projects: [
          {
            name: "Super Tap Hero",
            icon: gameIcons.supertaphero_icon,
            link: "https://github.com/xk0fe/Super-Tap-Hero",
            description: "Strategy auto battler"
          },
          {
            name: "ZigZag",
            icon: gameIcons.zigzag_icon,
            link: "https://apkpure.com/es/19-49-zigzag-ball/com.k0fe.zigzag",
            description: "Arcade game"
          },
          {
            name: "Room Of Tankz",
            icon: gameIcons.roomoftankz_icon,
            link: "https://github.com/xk0fe/RoomOfTankz",
            description: "Clone of Battle City game with multiplayer support"
          },
          {
            name: "Demigod RL: Black Plague",
            icon: "⚔️",
            link: "https://gamejolt.com/games/demigod/262001",
            description: "3D RPG game"
          },
          {
            name: "Cyber 武士道",
            icon: "🔫",
            link: "https://gamejolt.com/games/cyber/77683",
            description: "3D RPG game"
          }
        ]
      },
      {
        position: "Game Maker",
        duration: "2012 - 2017",
        description: "Developed different games using Game Maker 8 and Game Maker Studio, mostly RPG.",
        skills: ["GML", "Aseprite", "Adobe Photoshop"],
        projects: [
          {
            name: "Meditate",
            icon: "🧘",
            link: "https://gamejolt.com/games/meditate/67264",
            description: "Meditation simulator"
          },
          {
            name: "ev0lut!0ff",
            icon: "🧬",
            link: "https://gcup.ru/forum/69-25053-1",
            description: "2D RPG game"
          }
        ]
      },
      {
        position: "RPG Maker 2003 && VX Ace",
        duration: "2015 - 2016",
        description: "Developed a clone of the game Final Fantasy I. Participated in a game jam themed as 'Bad Box Art'.",
        skills: ["Ruby", "Aseprite"],
        projects: [
          {
            name: "Final of An-tasy",
            icon: "⚔️",
            link: "https://steamcommunity.com/sharedfiles/filedetails/?id=460240946",
            description: "JRPG game"
          },
          {
            name: "Sarada no Kuni no Tomato Hime",
            icon: "🍅",
            link: "https://gamejolt.com/games/hime/136422",
            description: "JRPG game"
          }
        ]
      },
      {
        position: "Ren'Py",
        duration: "2014 - 2015",
        description: "Developed a life simulator game where player starts as a homeless person and needs to survive on the streets.",
        skills: ["Adobe Photoshop", "articy:draft", "Python"],
        projects: [
          {
            name: "Homeless Simulator",
            icon: "💰",
            link: "",
            description: "Tycoon game"
          }
        ]
      },
      {
        position: "Raycasting Game Maker",
        duration: "2010",
        description: "Developed my first game using a game editor.",
        skills: ["Adobe Photoshop", "Level Design"],
        projects: [
          {
            name: "Prisoner: Escape",
            icon: "🔒",
            link: "",
            description: "Doom like game"
          }
        ]
      }
    ]
  },
  {
    id: 1,
    company: "Green Button Games",
    totalDuration: "2019 - 2021",
    icon: "🎮",
    logoKey: "greenButtonGames",
    positions: [
      {
          position: "Unity Lead Game Developer",
          duration: "2020 - 2021",
          description: "Progressed to more complex projects, took on mentoring responsibilities and improved game monetization systems.",
          skills: ["Team Leadership", "Mentoring", "Unity Analytics", "Facebook Analytics", "Game Analytics", "IronSource", "Monetization Systems", "ECS"],
          projects: [
              {
                  name: "Idle Fish Tycoon",
                  icon: gameIcons.idlefish_icon,
                  link: "https://play.google.com/store/apps/details?id=com.greenbuttongames.FishIdle&hl=en_US&gl=US",
                  description: "Hybrid casual game with idle and tycoon elements"
              },
              {
                name: "Fight Club Tycoon",
                icon: "https://media.licdn.com/dms/image/sync/v2/D5627AQGmZehSDA0aFg/articleshare-shrink_1280_800/articleshare-shrink_1280_800/0/1711975966813?e=1749074400&v=beta&t=fyvRaaJ5Nu3HWWxboEJFE85RQwpin1e6EYDyDX82tVY",
                link: "https://play.google.com/store/apps/details?id=com.greenbuttongames.FishIdle&hl=en_US&gl=US",
                description: "Hybrid casual game with idle and tycoon elements"
              }
          ]
      },
      {
        position: "Unity Game Developer",
        duration: "2019 - 2020",
        description: "Started my commercial career in game development. Insanely fast paced environment, making me learn a lot of things fast.",
        skills: ["Unity", "C#", "iOS", "Android", "Xcode", "Android Studio"],
        projects: [
          {
            name: "Brick Building Puzzle Game",
            icon: "🧩",
            link: "",
            description: "Brick building puzzle game"
          },
          {
            name: "Physics Based Olympic Runner Game",
            icon: "🏃",
            link: "",
            description: "Endless runner with power-ups and challenges"
          },
          {
            name: "Blacksmith Simulator",
            icon: "⚒️",
            link: "",
            description: "Smelter ore and craft items"
          },
          {
            name: "Hyper Casual Tower Defense Game",
            icon: "🛡️",
            link: "",
            description: "Protecc 🌍 from 👽"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    company: "Balagur Games",
    totalDuration: "2021 - 2022",
    icon: "🚀",
    logoKey: "balagurGames",
    positions: [
      {
        position: "Unity Game Developer",
        duration: "2021 - 2022",
        description: "Worked in a team of 4 people to develop a mobile auto battler game",
        skills: ["Firebase", "iOS", "Android", "Unity", "ECS"],
        projects: [
          {
            name: "dOOdes: fun auto chess battler",
            icon: gameIcons.doodes_icon,
            link: "https://example.com/space-combat",
            description: "Strategy auto battler"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    company: "ChillBase",
    totalDuration: "2022 - 2024",
    icon: "⭐",
    logoKey: "chillbase",
    customLogoBackground: "#000000",
    positions: [
      {
        position: "Software Developer",
        duration: "2022 - 2024",
        description: "Developed client & server side features for a massive multiplayer roleplay game",
        skills: [".NET Core", "SQL", "MariaDB", "Prometheus", "Docker", "TeamCity", "ECS"],
        projects: [
          {
            name: "One State RP",
            icon: gameIcons.onestate_icon,
            link: "https://play.google.com/store/apps/details?id=com.Chillgaming.oneState&hl=pt_BR",
            description: "Open World Multiplayer Roleplay"
          }
        ]
      }
    ]
  },
  {
    id: 4,
    company: "Golf Daddy",
    totalDuration: "2024 - Present",
    icon: "⭐",
    logoKey: "golfDaddy",
    positions: [
      {
        position: "Unity Developer",
        duration: "2024 - Present",
        description: "Developed client side features for a golf course simulator using Unity and React Native",
        skills: ["Unity", "C#", "React Native", "TypeScript", "AR"]
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
        <h2>Experience</h2>
        <div className="timeline">
          <div className="timeline-line"></div>
          {[...careerData].reverse().map((company, index) => {
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
                <div className="timeline-content">
                  <div className="timeline-card">
                    <div className="company-header">
                      <div className="company-title">
                        {company.logoKey && (
                          <img 
                            src={logos[company.logoKey].src} 
                            alt={logos[company.logoKey].alt || `${company.company} logo`}
                            className={`company-logo ${
                              logos[company.logoKey].aspectRatio ? 
                              `${logos[company.logoKey].aspectRatio}-logo` : 
                              'square-logo'
                            } ${logos[company.logoKey].className || ''}`}
                            style={{
                              backgroundColor: company.customLogoBackground || "#ffffff"
                            }}
                          />
                        )}
                        <h3>{company.company}</h3>
                      </div>
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
                              <div className="promotion-arrow">↑</div>
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
                                      {typeof project.icon === 'string' && (
                                        project.icon.startsWith('http') || 
                                        project.icon.startsWith('/') || 
                                        project.icon.startsWith('data:') ||
                                        project.icon.includes('.')
                                      ) ? (
                                        <img 
                                          src={project.icon} 
                                          alt={project.name}
                                          className="project-icon-img"
                                          onError={(e) => {
                                            console.log(`Failed to load image for ${project.name}:`, project.icon);
                                            e.currentTarget.style.display = 'none';
                                            const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                                            if (nextElement) {
                                              nextElement.style.display = 'block';
                                            }
                                          }}
                                          onLoad={() => {
                                            console.log(`Successfully loaded image for ${project.name}`);
                                          }}
                                        />
                                      ) : (
                                        <span style={{display: typeof project.icon === 'string' && (
                                          project.icon.startsWith('http') || 
                                          project.icon.startsWith('/') || 
                                          project.icon.startsWith('data:') ||
                                          project.icon.includes('.')
                                        ) ? 'none' : 'block'}}>
                                          {project.icon}
                                        </span>
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