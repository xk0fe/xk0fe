import React from 'react';
import './Blog.css';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
}

const Blog: React.FC = () => {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Getting Started with React and TypeScript",
      excerpt: "Learn how to set up a modern React application with TypeScript, including best practices and common patterns.",
      date: "2024-01-15",
      author: "John Doe",
      readTime: "5 min read",
      category: "React"
    },
    {
      id: 2,
      title: "Building Responsive Navigation Components",
      excerpt: "A comprehensive guide to creating flexible and accessible navigation components that work on all devices.",
      date: "2024-01-10",
      author: "Jane Smith",
      readTime: "8 min read",
      category: "CSS"
    },
    {
      id: 3,
      title: "Modern JavaScript Features You Should Know",
      excerpt: "Explore the latest JavaScript features including async/await, destructuring, and arrow functions.",
      date: "2024-01-05",
      author: "Mike Johnson",
      readTime: "6 min read",
      category: "JavaScript"
    },
    {
      id: 4,
      title: "Deploying React Apps to GitHub Pages",
      excerpt: "Step-by-step guide to deploying your React applications to GitHub Pages with automatic builds.",
      date: "2024-01-01",
      author: "Sarah Wilson",
      readTime: "4 min read",
      category: "Deployment"
    }
  ];

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="blog">
      <div className="blog-header">
        <div className="container">
          <h1>Blog</h1>
          <p>Thoughts, tutorials, and insights about web development</p>
        </div>
      </div>

      <div className="blog-content">
        <div className="container">
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-card-header">
                  <span className="blog-category">{post.category}</span>
                  <span className="blog-read-time">{post.readTime}</span>
                </div>
                <h2 className="blog-title">{post.title}</h2>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-meta">
                  <span className="blog-author">By {post.author}</span>
                  <span className="blog-date">{formatDate(post.date)}</span>
                </div>
                <button className="blog-read-more">Read More</button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog; 