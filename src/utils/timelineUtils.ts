export const getStepSide = (index: number): 'left' | 'right' => {
  return index % 2 === 0 ? 'left' : 'right';
};

export const isImageUrl = (icon: string): boolean => {
  return icon.startsWith('http') || 
         icon.startsWith('/') || 
         icon.startsWith('data:') ||
         icon.includes('.');
}; 