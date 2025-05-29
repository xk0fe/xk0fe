import React from 'react';
import { isImageUrl } from '../../utils/timelineUtils';

interface ProjectIconProps {
  icon: string | any;
  name: string;
}

const ProjectIcon: React.FC<ProjectIconProps> = ({ icon, name }) => {
  if (typeof icon === 'string' && isImageUrl(icon)) {
    return (
      <img 
        src={icon} 
        alt={name}
        className="project-icon-img"
      />
    );
  }

  return (
    <span style={{ display: 'block' }}>
      {icon}
    </span>
  );
};

export default ProjectIcon; 