import React from 'react';
import { useParams, Link } from 'react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, formatDate } from '../utils/blogUtils';
import './BlogPost.css';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return (
      <div className="blog-post">
        <div className="container">
          <h1>Post Not Found</h1>
          <p>The requested blog post could not be found.</p>
          <Link to="/blog" className="back-to-blog">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="blog-post">
        <div className="container">
          <h1>Post Not Found</h1>
          <p>The requested blog post could not be found.</p>
          <Link to="/blog" className="back-to-blog">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post">
      <div className="container">
        <article className="post-article">
          <header className="post-article-header">
            <Link to="/blog" className="back-to-blog">← Back to Blog</Link>
            
            <h1 className="post-article-title">{post.title}</h1>
            
            <div className="post-article-meta">
              <span className="post-article-date">{formatDate(post.date)}</span>
              <span className="post-separator">•</span>
              <span className="post-article-time">{post.timeToRead}</span>
              <span className="post-separator">•</span>
              <span className="post-article-category">{post.category}</span>
            </div>
            
            <div className="post-article-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
          </header>
          
          <div className="post-article-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code(props) {
                  const { children, className, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || '');
                  return match ? (
                    <SyntaxHighlighter
                      PreTag="div"
                      children={String(children).replace(/\n$/, '')}
                      language={match[1]}
                      style={tomorrow}
                    />
                  ) : (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost; 