import React from 'react';
import { CompanyStep } from '../../data/careerData';
import { getStepSide } from '../../utils/timelineUtils';
import CompanyLogo from './CompanyLogo';
import PositionItem from './PositionItem';

interface TimelineStepProps {
  company: CompanyStep;
  index: number;
  isVisible: boolean;
  stepRef: (el: HTMLDivElement | null) => void;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ 
  company, 
  index, 
  isVisible, 
  stepRef 
}) => {
  const stepSide = getStepSide(index);
  const hasMultiplePositions = company.positions.length > 1;

  return (
    <div
      ref={stepRef}
      data-step-id={company.id}
      className={`timeline-step ${isVisible ? 'visible' : ''} ${
        stepSide === 'right' ? 'step-right' : 'step-left'
      } ${
        hasMultiplePositions ? 'multi-position-company' : 'single-position-company'
      }`}
    >
      <div className="timeline-content">
        <div className="timeline-card">
          <div className="company-header">
            <div className="company-title">
              <CompanyLogo 
                logoKey={company.logoKey}
                company={company.company}
                customLogoBackground={company.customLogoBackground}
              />
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
              <PositionItem
                key={positionIndex}
                position={position}
                index={positionIndex}
                hasMultiplePositions={hasMultiplePositions}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineStep; 