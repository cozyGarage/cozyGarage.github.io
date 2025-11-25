/**
 * Blog Content Index
 * 
 * Centralized export for all blog post content.
 * Each blog post is stored in a separate file for better organization and code splitting.
 * 
 * @module blog
 */

import { buildingOthelloPost } from './building-othello';
import { reactPerformancePost } from './react-performance';
import { typescriptBestPracticesPost } from './typescript-best-practices';

/**
 * All blog posts exported as an array
 * Sorted by date (newest first)
 */
export const allBlogPosts = [
  reactPerformancePost,      // Nov 8, 2024
  typescriptBestPracticesPost, // Nov 5, 2024
  buildingOthelloPost,       // Nov 1, 2024
];

/**
 * Export individual posts for direct imports
 */
export {
  buildingOthelloPost,
  reactPerformancePost,
  typescriptBestPracticesPost,
};

/**
 * Get a blog post by ID
 * @param id - Unique blog post identifier
 * @returns Blog post or undefined if not found
 */
export function getBlogPostById(id: string) {
  return allBlogPosts.find(post => post.id === id);
}

/**
 * Get blog posts by tag
 * @param tag - Tag to filter by (case-insensitive)
 * @returns Array of matching blog posts
 */
export function getBlogPostsByTag(tag: string) {
  const lowerTag = tag.toLowerCase();
  return allBlogPosts.filter(post => 
    post.tags.some(t => t.toLowerCase() === lowerTag)
  );
}

/**
 * Get recent blog posts
 * @param limit - Maximum number of posts to return
 * @returns Array of recent blog posts
 */
export function getRecentBlogPosts(limit: number = 3) {
  return allBlogPosts.slice(0, limit);
}
