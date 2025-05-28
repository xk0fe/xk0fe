// Logo imports - centralized management
import greenButtonGamesLogo from './greenbuttongames_logo.svg';
import chillbaseLogo from './chillbase_logo.svg';
import balagurGamesLogo from './balagur_logo.jpg';
import golfDaddyLogo from './golfdaddy_logo.svg';


// Logo configuration interface
export interface LogoConfig {
  src: string;
  alt?: string;
  aspectRatio?: 'square' | 'wide' | 'tall';
  className?: string;
}

// Export all logos for easy importing
export const logos: Record<string, LogoConfig> = {
  greenButtonGames: {
    src: greenButtonGamesLogo,
    alt: 'Green Button Games logo',
    aspectRatio: 'square'
  },
  balagurGames: {
    src: balagurGamesLogo,
    alt: 'Balagur Gameslogo',
    aspectRatio: 'square'
  },
  chillbase: {
    src: chillbaseLogo,
    alt: 'ChillBase logo',
    aspectRatio: 'wide'
  },
  golfDaddy: {
    src: golfDaddyLogo,
    alt: 'Golf Daddy logo',
    aspectRatio: 'wide'
  }
};

// Helper function to get logo with custom background color
export const getLogoWithBackground = (logoKey: string, customBackgroundColor?: string): LogoConfig => {
  const logo = logos[logoKey];
  if (!logo) {
    throw new Error(`Logo '${logoKey}' not found`);
  }
  
  return {
    ...logo,
  };
};

// Type definition for better TypeScript support
export type LogoKey = keyof typeof logos;

// Default export for the logos object
export default logos; 