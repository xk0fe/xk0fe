import React from 'react';
import { Project } from '../../data/careerData';
import ProjectIcon from './ProjectIcon';

interface ProjectsListProps {
  projects: Project[];
}

const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="projects-section">
      <h5>Key Projects:</h5>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-item"
            title={project.description}
          >
            <span className="project-icon">
              <ProjectIcon icon={project.icon} name={project.name} />
            </span>
            <span className="project-name">{project.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProjectsList; 