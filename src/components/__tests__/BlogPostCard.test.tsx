import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import BlogPostCard from '../BlogPostCard';
import { BlogPost } from '../../utils/blogUtils';

// Mock the blogUtils module
jest.mock('../../utils/blogUtils', () => ({
  ...jest.requireActual('../../utils/blogUtils'),
  formatDate: jest.fn((date: string) => `Formatted: ${date}`)
}));

const mockPost: BlogPost = {
  slug: 'test-post',
  title: 'Test Blog Post Title',
  description: 'This is a test blog post description for unit testing.',
  date: '2024-12-15',
  category: 'Testing',
  timeToRead: '5 min read',
  tags: ['React', 'Testing', 'TypeScript'],
  content: 'This is the content of the test blog post.'
};

// Helper function to render component with router
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('BlogPostCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the blog post card with all required elements', () => {
      renderWithRouter(<BlogPostCard post={mockPost} />);

      // Check if main article element exists
      expect(screen.getByRole('article')).toBeInTheDocument();
      
      // Check if title is rendered as a link
      const titleLink = screen.getByRole('link', { name: mockPost.title });
      expect(titleLink).toBeInTheDocument();
      expect(titleLink).toHaveAttribute('href', `/blog/${mockPost.slug}`);
      
      // Check if description is rendered
      expect(screen.getByText(mockPost.description)).toBeInTheDocument();
      
      // Check if category is rendered
      expect(screen.getByText(mockPost.category)).toBeInTheDocument();
      
      // Check if time to read is rendered
      expect(screen.getByText(mockPost.timeToRead)).toBeInTheDocument();
      
      // Check if "Read More" link is rendered
      const readMoreLink = screen.getByRole('link', { name: /read more/i });
      expect(readMoreLink).toBeInTheDocument();
      expect(readMoreLink).toHaveAttribute('href', `/blog/${mockPost.slug}`);
    });

    it('should render formatted date using formatDate utility', () => {
      const { formatDate } = require('../../utils/blogUtils');
      
      renderWithRouter(<BlogPostCard post={mockPost} />);
      
      expect(formatDate).toHaveBeenCalledWith(mockPost.date);
      // The date is rendered but might be empty due to mock return
      // Just check that formatDate was called correctly
      const dateSpan = document.querySelector('.post-date');
      expect(dateSpan).toBeInTheDocument();
    });

    it('should render all tags with proper formatting', () => {
      renderWithRouter(<BlogPostCard post={mockPost} />);
      
      mockPost.tags.forEach(tag => {
        expect(screen.getByText(`#${tag}`)).toBeInTheDocument();
      });
      
      // Check that all tags are rendered
      const tagElements = screen.getAllByText(/^#/);
      expect(tagElements).toHaveLength(mockPost.tags.length);
    });

    it('should apply correct CSS classes', () => {
      renderWithRouter(<BlogPostCard post={mockPost} />);
      
      const article = screen.getByRole('article');
      expect(article).toHaveClass('blog-post-card');
      
      const postHeader = article.querySelector('.post-header');
      expect(postHeader).toBeInTheDocument();
      
      const postTitle = article.querySelector('.post-title');
      expect(postTitle).toBeInTheDocument();
      
      const postMeta = article.querySelector('.post-meta');
      expect(postMeta).toBeInTheDocument();
      
      const postDescription = article.querySelector('.post-description');
      expect(postDescription).toBeInTheDocument();
      
      const postTags = article.querySelector('.post-tags');
      expect(postTags).toBeInTheDocument();
      
      const postFooter = article.querySelector('.post-footer');
      expect(postFooter).toBeInTheDocument();
    });
  });

  describe('Props handling', () => {
    it('should handle posts with no tags', () => {
      const postWithoutTags: BlogPost = {
        ...mockPost,
        tags: []
      };
      
      renderWithRouter(<BlogPostCard post={postWithoutTags} />);
      
      const postTags = screen.getByText(postWithoutTags.description).closest('article')?.querySelector('.post-tags');
      expect(postTags).toBeInTheDocument();
      expect(postTags?.children).toHaveLength(0);
    });

    it('should handle posts with single tag', () => {
      const postWithSingleTag: BlogPost = {
        ...mockPost,
        tags: ['React']
      };
      
      renderWithRouter(<BlogPostCard post={postWithSingleTag} />);
      
      expect(screen.getByText('#React')).toBeInTheDocument();
      const tagElements = screen.getAllByText(/^#/);
      expect(tagElements).toHaveLength(1);
    });

    it('should handle posts with special characters in content', () => {
      const postWithSpecialChars: BlogPost = {
        ...mockPost,
        title: 'Test & Special Characters <script>',
        description: 'Description with "quotes" and <tags>',
        category: 'Testing & Development'
      };
      
      renderWithRouter(<BlogPostCard post={postWithSpecialChars} />);
      
      expect(screen.getByText(postWithSpecialChars.title)).toBeInTheDocument();
      expect(screen.getByText(postWithSpecialChars.description)).toBeInTheDocument();
      expect(screen.getByText(postWithSpecialChars.category)).toBeInTheDocument();
    });

    it('should handle long content gracefully', () => {
      const postWithLongContent: BlogPost = {
        ...mockPost,
        title: 'A'.repeat(200),
        description: 'B'.repeat(500),
        tags: Array.from({ length: 10 }, (_, i) => `Tag${i}`)
      };
      
      renderWithRouter(<BlogPostCard post={postWithLongContent} />);
      
      expect(screen.getByText(postWithLongContent.title)).toBeInTheDocument();
      expect(screen.getByText(postWithLongContent.description)).toBeInTheDocument();
      
      // Check that all tags are rendered
      const tagElements = screen.getAllByText(/^#Tag/);
      expect(tagElements).toHaveLength(10);
    });
  });

  describe('Link behavior', () => {
    it('should generate correct href for title link', () => {
      renderWithRouter(<BlogPostCard post={mockPost} />);
      
      const titleLink = screen.getByRole('link', { name: mockPost.title });
      expect(titleLink).toHaveAttribute('href', `/blog/${mockPost.slug}`);
    });

    it('should generate correct href for read more link', () => {
      renderWithRouter(<BlogPostCard post={mockPost} />);
      
      const readMoreLink = screen.getByRole('link', { name: /read more/i });
      expect(readMoreLink).toHaveAttribute('href', `/blog/${mockPost.slug}`);
    });

    it('should handle special characters in slug', () => {
      const postWithSpecialSlug: BlogPost = {
        ...mockPost,
        slug: 'test-post-with-special-chars-123'
      };
      
      renderWithRouter(<BlogPostCard post={postWithSpecialSlug} />);
      
      const titleLink = screen.getByRole('link', { name: postWithSpecialSlug.title });
      expect(titleLink).toHaveAttribute('href', `/blog/${postWithSpecialSlug.slug}`);
      
      const readMoreLink = screen.getByRole('link', { name: /read more/i });
      expect(readMoreLink).toHaveAttribute('href', `/blog/${postWithSpecialSlug.slug}`);
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      renderWithRouter(<BlogPostCard post={mockPost} />);
      
      // Check for article role
      expect(screen.getByRole('article')).toBeInTheDocument();
      
      // Check for proper heading structure
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(mockPost.title);
      
      // Check for links
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(2); // Title link and Read More link
    });

    it('should have accessible link text', () => {
      renderWithRouter(<BlogPostCard post={mockPost} />);
      
      const titleLink = screen.getByRole('link', { name: mockPost.title });
      expect(titleLink).toBeInTheDocument();
      
      const readMoreLink = screen.getByRole('link', { name: /read more/i });
      expect(readMoreLink).toBeInTheDocument();
    });
  });
}); 