import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/portfolio';
import './blog.css';

// Memoized blog card component to prevent unnecessary re-renders
const BlogCard = React.memo<{ post: typeof blogPosts[0] }>(({ post }) => {
  // Memoize date formatting
  const formattedDate = React.useMemo(
    () => new Date(post.date).toLocaleDateString(),
    [post.date]
  );

  return (
    <article className="blog-card">
      <div className="blog-meta">
        <span className="blog-date">{formattedDate}</span>
        <span className="blog-read-time">{post.readTime} min read</span>
      </div>
      <h2 className="blog-title">
        <Link to={`/blog/${post.id}`}>{post.title}</Link>
      </h2>
      <p className="blog-excerpt">{post.excerpt}</p>
      <div className="blog-tags">
        {post.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <Link to={`/blog/${post.id}`} className="blog-link">
        Read more →
      </Link>
    </article>
  );
});

BlogCard.displayName = 'BlogCard';

/**
 * Blog List Page
 * Display all blog posts
 */
export const BlogPage: React.FC = () => {
  return (
    <div className="blog-page">
      <div className="container">
        <header className="blog-header">
          <h1>Blog</h1>
          <p>Thoughts on development, technology, and learning</p>
        </header>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Blog Post Page
 * Display individual blog post
 */
export const BlogPostPage: React.FC = () => {
  const { id } = { id: 'building-othello' }; // This would come from useParams in real app
  const post = blogPosts.find((p) => p.id === id);

  // Memoize formatted dates
  const formattedDate = React.useMemo(
    () => post ? new Date(post.date).toLocaleDateString() : '',
    [post]
  );

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
      <div className="container">
        <Link to="/blog" className="back-link">
          ← Back to blog
        </Link>
        <article className="blog-post">
          <header className="post-header">
            <h1>{post.title}</h1>
            <div className="post-meta">
              <span className="post-date">{formattedDate}</span>
              <span className="post-read-time">{post.readTime} min read</span>
            </div>
            <div className="post-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </header>
          <div className="post-content">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </article>
      </div>
    </div>
  );
};
