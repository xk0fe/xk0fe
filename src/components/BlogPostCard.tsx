import React from 'react';
import { Link } from 'react-router';
import { BlogPost, formatDate } from '../utils/blogUtils';
import './BlogPostCard.css';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <article className="blog-post-card">
      <div className="post-header">
        <h2 className="post-title">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <div className="post-meta">
          <span className="post-date">{formatDate(post.date)}</span>
          <span className="post-separator">•</span>
          <span className="post-time">{post.timeToRead}</span>
          <span className="post-separator">•</span>
          <span className="post-category">{post.category}</span>
        </div>
      </div>
      
      <p className="post-description">{post.description}</p>
      
      <div className="post-tags">
        {post.tags.map((tag, index) => (
          <span key={index} className="tag">
            #{tag}
          </span>
        ))}
      </div>
      
      <div className="post-footer">
        <Link to={`/blog/${post.slug}`} className="read-more">
          Read More →
        </Link>
      </div>
    </article>
  );
};

export default BlogPostCard; 