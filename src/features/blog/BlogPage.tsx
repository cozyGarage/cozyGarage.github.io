import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { blogPosts } from '../../data/portfolio';
import './blog.css';

/**
 * Blog List Page
 * Display all blog posts with search and filtering
 */
export const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogPosts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
    return ['all', ...Array.from(tags).sort()];
  }, []);

  // Filter posts based on search and tag
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  return (
    <div className="blog-page">
      <div className="container">
        <header className="blog-header">
          <h1>Blog</h1>
          <p>Thoughts on development, technology, and learning</p>
        </header>

        {/* Search and Filter */}
        <div className="blog-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                className="clear-search"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="tag-filter">
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`tag-filter-btn ${selectedTag === tag ? 'active' : ''}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        {(searchQuery || selectedTag !== 'all') && (
          <div className="blog-results">
            Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
          </div>
        )}

        <div className="blog-grid">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-meta">
                  <span className="blog-date">{new Date(post.date).toLocaleDateString()}</span>
                  <span className="blog-read-time">{post.readTime} min read</span>
                </div>
                <h2 className="blog-title">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h2>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-tags">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="tag"
                      onClick={() => setSelectedTag(tag)}
                      role="button"
                      tabIndex={0}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link to={`/blog/${post.id}`} className="blog-link">
                  Read more →
                </Link>
              </article>
            ))
          ) : (
            <div className="no-results">
              <p>No posts found matching your criteria.</p>
              <button
                className="reset-filters"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag('all');
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Blog Post Page
 * Display individual blog post with reading progress and social sharing
 */
export const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const post = blogPosts.find((p) => p.id === id);

  // Track reading progress
  React.useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const totalDocumentHeight = documentHeight - windowHeight;
      
      if (totalDocumentHeight > 0) {
        const progress = (scrollTop / totalDocumentHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = post ? post.title : '';

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);
    
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'noopener,noreferrer');
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  if (!post) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <h1>Post not found</h1>
          <Link to="/blog">← Back to blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      {/* Reading Progress Bar */}
      <div className="reading-progress-bar" style={{ width: `${readingProgress}%` }} />

      <div className="container">
        <Link to="/blog" className="back-link">
          ← Back to blog
        </Link>

        <article className="blog-post">
          <header className="post-header">
            <h1>{post.title}</h1>
            <div className="post-meta">
              <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
              <span className="post-read-time">{post.readTime} min read</span>
              <span className="post-progress">{Math.round(readingProgress)}% read</span>
            </div>
            <div className="post-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Social Share Buttons */}
          <div className="social-share">
            <span className="share-label">Share this post:</span>
            <button
              className="share-btn twitter"
              onClick={() => handleShare('twitter')}
              aria-label="Share on Twitter"
              title="Share on Twitter"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </button>
            <button
              className="share-btn linkedin"
              onClick={() => handleShare('linkedin')}
              aria-label="Share on LinkedIn"
              title="Share on LinkedIn"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </button>
            <button
              className="share-btn facebook"
              onClick={() => handleShare('facebook')}
              aria-label="Share on Facebook"
              title="Share on Facebook"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </button>
            <button
              className="share-btn copy-link"
              onClick={copyLink}
              aria-label="Copy link"
              title="Copy link"
            >
              {copied ? '✓' : '🔗'}
            </button>
          </div>

          <div className="post-content">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Navigation to other posts */}
          <div className="post-navigation">
            <Link to="/blog" className="all-posts-link">
              View all posts →
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};
