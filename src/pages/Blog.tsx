import React, { useState, useEffect } from 'react';
import { getAllPosts, getAllCategories, getAllTags, BlogPost } from '../utils/blogUtils';
import BlogPostCard from '../components/BlogPostCard';
import './Blog.css';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const allPosts = getAllPosts();
    const allCategories = getAllCategories();
    const allTags = getAllTags();
    
    setPosts(allPosts);
    setFilteredPosts(allPosts);
    setCategories(allCategories);
    setTags(allTags);
  }, []);

  useEffect(() => {
    let filtered = posts;

    if (selectedCategory) {
      filtered = filtered.filter(post => 
        post.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedTag) {
      filtered = filtered.filter(post =>
        post.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  }, [posts, selectedCategory, selectedTag]);

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    setSelectedTag(''); // Clear tag filter when category changes
  };

  const handleTagFilter = (tag: string) => {
    setSelectedTag(tag === selectedTag ? '' : tag);
    setSelectedCategory(''); // Clear category filter when tag changes
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedTag('');
  };

  return (
    <div className="blog">
      <div className="container">
        <header className="blog-header">
          <h1 className="blog-title">
            <span className="cursor-blink">▐</span> Blog
          </h1>
          <p className="blog-subtitle">
            Game development insights, tutorials, and my journey as an indie developer
          </p>
        </header>

        {/* Filters Section */}
        <div className="blog-filters">
          <div className="filter-section">
            <h3>Categories</h3>
            <div className="filter-buttons">
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => handleCategoryFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Tags</h3>
            <div className="filter-buttons">
              {tags.map(tag => (
                <button
                  key={tag}
                  className={`filter-btn tag-btn ${selectedTag === tag ? 'active' : ''}`}
                  onClick={() => handleTagFilter(tag)}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {(selectedCategory || selectedTag) && (
            <div className="filter-section">
              <button className="clear-filters-btn" onClick={clearFilters}>
                Clear Filters ✕
              </button>
            </div>
          )}
        </div>

        {/* Posts Section */}
        <div className="blog-content">
          {filteredPosts.length === 0 && posts.length > 0 ? (
            <div className="no-posts">
              <h2>No posts found</h2>
              <p>Try adjusting your filters or check back later for new content!</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="no-posts">
              <h2>Coming Soon!</h2>
              <p>Blog posts are being loaded. Check back soon for game development insights and tutorials!</p>
            </div>
          ) : (
            <div className="posts-grid">
              {filteredPosts.map((post, index) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        {posts.length > 0 && (
          <div className="blog-stats">
            <div className="stat">
              <span className="stat-number">{filteredPosts.length}</span>
              <span className="stat-label">
                {filteredPosts.length === 1 ? 'Post' : 'Posts'} Shown
              </span>
            </div>
            <div className="stat">
              <span className="stat-number">{posts.length}</span>
              <span className="stat-label">Total Posts</span>
            </div>
            <div className="stat">
              <span className="stat-number">{categories.length}</span>
              <span className="stat-label">Categories</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog; 