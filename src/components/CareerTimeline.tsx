import React from 'react';
import './CareerTimeline.css';
import { careerData } from '../data/careerData';
import { useTimelineVisibility } from '../hooks/useTimelineVisibility';
import TimelineStep from './timeline/TimelineStep';

const CareerTimeline: React.FC = () => {
  const { visibleSteps, stepRefs } = useTimelineVisibility();

  return (
    <section className="career-timeline">
      <div className="container">
        <h2>Experience</h2>
        <div className="timeline">
          <div className="timeline-line"></div>
          {[...careerData].reverse().map((company, index) => (
            <TimelineStep
              key={company.id}
              company={company}
              index={index}
              isVisible={visibleSteps.has(company.id)}
              stepRef={(el) => { stepRefs.current[index] = el; }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerTimeline; 