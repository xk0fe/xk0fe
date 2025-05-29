import React from 'react';
import { logos } from '../../assets/images/logos';

interface CompanyLogoProps {
  logoKey?: string;
  company: string;
  customLogoBackground?: string;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({ 
  logoKey, 
  company, 
  customLogoBackground 
}) => {
  if (!logoKey) return null;

  const logo = logos[logoKey];
  
  return (
    <img 
      src={logo.src} 
      alt={logo.alt || `${company} logo`}
      className={`company-logo ${
        logo.aspectRatio ? 
        `${logo.aspectRatio}-logo` : 
        'square-logo'
      } ${logo.className || ''}`}
      style={{
        backgroundColor: customLogoBackground || "#ffffff"
      }}
    />
  );
};

export default CompanyLogo; 