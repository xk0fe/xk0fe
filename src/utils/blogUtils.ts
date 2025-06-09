import matter from 'gray-matter';
import { blogPostsData, BlogPost } from '../data/blogPosts';

export type { BlogPost };

// Get all blog posts
export const getAllPosts = (): BlogPost[] => {
  try {
    // Sort posts by date (newest first)
    return blogPostsData.sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
};

// Get a single post by slug
export const getPostBySlug = (slug: string): BlogPost | null => {
  try {
    return blogPostsData.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error('Error getting post by slug:', error);
    return null;
  }
};

// Get posts by category
export const getPostsByCategory = (category: string): BlogPost[] => {
  try {
    return blogPostsData.filter((post: BlogPost) => post.category.toLowerCase() === category.toLowerCase());
  } catch (error) {
    console.error('Error getting posts by category:', error);
    return [];
  }
};

// Get posts by tag
export const getPostsByTag = (tag: string): BlogPost[] => {
  try {
    return blogPostsData.filter((post: BlogPost) => 
      post.tags.some((postTag: string) => postTag.toLowerCase() === tag.toLowerCase())
    );
  } catch (error) {
    console.error('Error getting posts by tag:', error);
    return [];
  }
};

// Get all unique categories
export const getAllCategories = (): string[] => {
  try {
    const categories = blogPostsData.map((post: BlogPost) => post.category).filter(Boolean);
    return Array.from(new Set(categories));
  } catch (error) {
    console.error('Error getting categories:', error);
    return [];
  }
};

// Get all unique tags
export const getAllTags = (): string[] => {
  try {
    const tags = blogPostsData.flatMap((post: BlogPost) => post.tags).filter(Boolean);
    return Array.from(new Set(tags));
  } catch (error) {
    console.error('Error getting tags:', error);
    return [];
  }
};

// Format date for display
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}; 