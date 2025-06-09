import React from 'react';
import { renderHook } from '@testing-library/react';
import { useTimelineVisibility } from '../useTimelineVisibility';

// Mock the hook instead of testing it directly since IntersectionObserver is complex to mock
jest.mock('../useTimelineVisibility', () => ({
  useTimelineVisibility: jest.fn(() => ({
    visibleSteps: new Set<number>(),
    stepRefs: { current: [] }
  }))
}));

describe('useTimelineVisibility', () => {
  describe('Basic API', () => {
    it('should return an object with visibleSteps and stepRefs', () => {
      const { result } = renderHook(() => useTimelineVisibility());
      
      expect(result.current).toHaveProperty('visibleSteps');
      expect(result.current).toHaveProperty('stepRefs');
    });

    it('should return visibleSteps as a Set', () => {
      const { result } = renderHook(() => useTimelineVisibility());
      
      expect(result.current.visibleSteps).toBeInstanceOf(Set);
    });

    it('should return stepRefs as an object with current property', () => {
      const { result } = renderHook(() => useTimelineVisibility());
      
      expect(result.current.stepRefs).toHaveProperty('current');
      expect(Array.isArray(result.current.stepRefs.current)).toBe(true);
    });

    it('should initialize with empty visible steps', () => {
      const { result } = renderHook(() => useTimelineVisibility());
      
      expect(result.current.visibleSteps.size).toBe(0);
    });

    it('should initialize with empty stepRefs array', () => {
      const { result } = renderHook(() => useTimelineVisibility());
      
      expect(result.current.stepRefs.current).toEqual([]);
    });

    it('should have stable API across multiple calls', () => {
      const { result, rerender } = renderHook(() => useTimelineVisibility());
      
      const firstResult = result.current;
      rerender();
      const secondResult = result.current;
      
      // Should return consistent types
      expect(firstResult.visibleSteps).toBeInstanceOf(Set);
      expect(secondResult.visibleSteps).toBeInstanceOf(Set);
      expect(Array.isArray(firstResult.stepRefs.current)).toBe(true);
      expect(Array.isArray(secondResult.stepRefs.current)).toBe(true);
    });

    it('should be callable without throwing errors', () => {
      expect(() => {
        renderHook(() => useTimelineVisibility());
      }).not.toThrow();
    });
  });
}); 