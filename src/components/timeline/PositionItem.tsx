import React from 'react';
import { Position } from '../../data/careerData';
import ProjectsList from './ProjectsList';
import SkillTags from './SkillTags';

interface PositionItemProps {
  position: Position;
  index: number;
  hasMultiplePositions: boolean;
}

const PositionItem: React.FC<PositionItemProps> = ({ 
  position, 
  index, 
  hasMultiplePositions 
}) => {
  return (
    <div className={`position-item ${hasMultiplePositions ? 'multi-position' : 'single-position'}`}>
      <div className="position-header">
        <h4>{position.position}</h4>
        <span className="position-duration">{position.duration}</span>
        {hasMultiplePositions && index > 0 && (
          <div className="promotion-arrow">↑</div>
        )}
      </div>
      <p>{position.description}</p>
      
      <ProjectsList projects={position.projects || []} />
      <SkillTags skills={position.skills} />
    </div>
  );
};

export default PositionItem; 