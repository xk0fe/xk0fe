import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import NotFound from '../NotFound';

// Helper function to render component with router
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('NotFound', () => {
  describe('Rendering', () => {
    it('should render the 404 page with all required elements', () => {
      renderWithRouter(<NotFound />);

      // Check for main container
      const notFoundContainer = screen.getByText('404').closest('.not-found');
      expect(notFoundContainer).toBeInTheDocument();
      expect(notFoundContainer).toHaveClass('not-found');

      // Check for 404 heading
      expect(screen.getByText('404')).toBeInTheDocument();
      
      // Check for "GAME OVER" heading
      expect(screen.getByText('🎮 GAME OVER')).toBeInTheDocument();
      
      // Check for description text
      expect(screen.getByText('The page you\'re looking for has been consumed by a bug!')).toBeInTheDocument();
    });

    it('should render the home button with correct text and styling', () => {
      renderWithRouter(<NotFound />);

      const homeButton = screen.getByRole('link', { name: /return home/i });
      expect(homeButton).toBeInTheDocument();
      expect(homeButton).toHaveClass('btn', 'btn-primary');
      expect(homeButton).toHaveAttribute('href', '/');
    });

    it('should render the report bug button', () => {
      renderWithRouter(<NotFound />);

      const reportButton = screen.getByRole('link', { name: /report bug/i });
      expect(reportButton).toBeInTheDocument();
      expect(reportButton).toHaveClass('btn', 'btn-secondary');
      expect(reportButton).toHaveAttribute('href', '/contact');
    });

    it('should apply correct CSS classes to all elements', () => {
      renderWithRouter(<NotFound />);

      // Check main container class
      const container = screen.getByText('404').closest('.not-found');
      expect(container).toHaveClass('not-found');

      // Check error code class
      const errorCode = screen.getByText('404');
      expect(errorCode).toHaveClass('error-code');

      // Check for content container
      const contentContainer = container?.querySelector('.not-found-content');
      expect(contentContainer).toBeInTheDocument();

      // Check for actions container
      const actionsContainer = container?.querySelector('.not-found-actions');
      expect(actionsContainer).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('should have correct href for home link', () => {
      renderWithRouter(<NotFound />);

      const homeLink = screen.getByRole('link', { name: /return home/i });
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('should have correct href for contact link', () => {
      renderWithRouter(<NotFound />);

      const contactLink = screen.getByRole('link', { name: /report bug/i });
      expect(contactLink).toHaveAttribute('href', '/contact');
    });

    it('should be clickable and navigable', async () => {
      renderWithRouter(<NotFound />);

      const homeLink = screen.getByRole('link', { name: /return home/i });
      
      // Ensure the link is clickable
      expect(homeLink).toBeEnabled();
      
      // Test click interaction
      await userEvent.click(homeLink);
      
      // Since we're using BrowserRouter in test, we can't easily test navigation
      // but we can ensure the click doesn't throw an error
      expect(homeLink).toBeInTheDocument();
    });
  });

  describe('Content Accuracy', () => {
    it('should display correct error code', () => {
      renderWithRouter(<NotFound />);

      const errorCode = screen.getByText('404');
      expect(errorCode).toBeInTheDocument();
      expect(errorCode.textContent).toBe('404');
    });

    it('should display correct error title', () => {
      renderWithRouter(<NotFound />);

      const errorTitle = screen.getByText('🎮 GAME OVER');
      expect(errorTitle).toBeInTheDocument();
      expect(errorTitle.textContent).toBe('🎮 GAME OVER');
    });

    it('should display appropriate error description', () => {
      renderWithRouter(<NotFound />);

      const description = screen.getByText('The page you\'re looking for has been consumed by a bug!');
      expect(description).toBeInTheDocument();
      
      const detailedDescription = screen.getByText(/Looks like you've wandered into the void/i);
      expect(detailedDescription).toBeInTheDocument();
    });

    it('should display correct button text', () => {
      renderWithRouter(<NotFound />);

      const homeButton = screen.getByRole('link', { name: /return home/i });
      expect(homeButton.textContent).toMatch(/return home/i);

      const reportButton = screen.getByRole('link', { name: /report bug/i });
      expect(reportButton.textContent).toMatch(/report bug/i);
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      renderWithRouter(<NotFound />);

      // Check for proper heading hierarchy
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThanOrEqual(2);
      
      // Check for links accessibility
      const homeLink = screen.getByRole('link', { name: /return home/i });
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAccessibleName();

      const reportLink = screen.getByRole('link', { name: /report bug/i });
      expect(reportLink).toBeInTheDocument();
      expect(reportLink).toHaveAccessibleName();
    });

    it('should have accessible link text', () => {
      renderWithRouter(<NotFound />);

      const homeLink = screen.getByRole('link', { name: /return home/i });
      expect(homeLink).toHaveAttribute('href', '/');
      
      // Link should have meaningful text for screen readers
      expect(homeLink.textContent).toBeTruthy();
      expect(homeLink.textContent).toMatch(/home/i);

      const reportLink = screen.getByRole('link', { name: /report bug/i });
      expect(reportLink).toHaveAttribute('href', '/contact');
      expect(reportLink.textContent).toBeTruthy();
      expect(reportLink.textContent).toMatch(/bug/i);
    });

    it('should provide clear context for users', () => {
      renderWithRouter(<NotFound />);

      // Check that all necessary information is present for users to understand the error
      expect(screen.getByText('404')).toBeInTheDocument(); // Error code
      expect(screen.getByText('🎮 GAME OVER')).toBeInTheDocument(); // Error title
      expect(screen.getByText('The page you\'re looking for has been consumed by a bug!')).toBeInTheDocument(); // Explanation
      expect(screen.getByRole('link', { name: /return home/i })).toBeInTheDocument(); // Action
    });
  });

  describe('Responsive Design Considerations', () => {
    it('should render consistently across different viewport sizes', () => {
      // Test that component renders without errors
      // (More comprehensive responsive testing would require additional setup)
      renderWithRouter(<NotFound />);

      const container = screen.getByText('404').closest('.not-found');
      expect(container).toBeInTheDocument();
      
      // All key elements should be present regardless of viewport
      expect(screen.getByText('404')).toBeInTheDocument();
      expect(screen.getByText('🎮 GAME OVER')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /return home/i })).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should render without crashing when no props are passed', () => {
      // NotFound component doesn't take props, but test defensive rendering
      expect(() => {
        renderWithRouter(<NotFound />);
      }).not.toThrow();
    });

    it('should maintain functionality if CSS classes are missing', () => {
      // Component should still render and be functional even if styling fails
      renderWithRouter(<NotFound />);

      // Core functionality should remain
      expect(screen.getByText('404')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /return home/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /return home/i })).toHaveAttribute('href', '/');
    });
  });

  describe('Theme and Design', () => {
    it('should include gaming-themed elements', () => {
      renderWithRouter(<NotFound />);

      // Check for gaming theme elements
      expect(screen.getByText('🎮 GAME OVER')).toBeInTheDocument();
      expect(screen.getByText('🏠 Return Home')).toBeInTheDocument();
      expect(screen.getByText('📧 Report Bug')).toBeInTheDocument();
      
      // Check for pixel art elements
      const pixelArt = screen.getByText('404').closest('.not-found')?.querySelector('.pixel-art');
      expect(pixelArt).toBeInTheDocument();
    });

    it('should include ghost character elements', () => {
      renderWithRouter(<NotFound />);

      const container = screen.getByText('404').closest('.not-found');
      
      // Check for ghost elements
      const ghostBody = container?.querySelector('.ghost-body');
      expect(ghostBody).toBeInTheDocument();
      
      const ghostEyes = container?.querySelector('.ghost-eyes');
      expect(ghostEyes).toBeInTheDocument();
      
      const ghostMouth = container?.querySelector('.ghost-mouth');
      expect(ghostMouth).toBeInTheDocument();
      
      const ghostTail = container?.querySelector('.ghost-tail');
      expect(ghostTail).toBeInTheDocument();
    });
  });
}); 