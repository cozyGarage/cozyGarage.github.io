/**
 * Portfolio Data
 * Centralized data for the portfolio website
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  category: 'game' | 'web' | 'ml' | 'other';
  featured: boolean;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'ml' | 'tools' | 'other';
  level: number; // 1-5
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  readTime: number;
}

// Personal Information
export const personalInfo = {
  name: 'Trung Nguyen',
  title: 'Full Stack Developer & ML Enthusiast',
  bio: 'Passionate developer with expertise in building web applications and exploring machine learning. I love creating interactive experiences and solving complex problems.',
  email: 'sendtotrungnguyen@outlook.com',
  github: 'https://github.com/cozyGarage',
  linkedin: 'https://linkedin.com/in/nguyenthanhtrung8888',
  location: 'Vienna, Austria',
};

// Projects
export const projects: Project[] = [
  {
    id: 'othello',
    title: 'Othello Game',
    description: 'Interactive Othello (Reversi) game with clean UI and smart gameplay',
    longDescription:
      'A fully-featured Othello game built with React and TypeScript. Features include move validation, AI opponent, move history, and beautiful animations.',
    technologies: ['React', 'TypeScript', 'Vite', 'CSS3'],
    image: '/projects/othello.png',
    demoUrl: '/play',
    githubUrl: 'https://github.com/cozyGarage/cozyGarage.github.io',
    category: 'game',
    featured: true,
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description: 'Personal portfolio showcasing projects and technical skills',
    longDescription:
      'A modern, responsive portfolio website built from scratch to showcase my work and technical abilities.',
    technologies: ['React', 'TypeScript', 'CSS3', 'Vite'],
    image: '/projects/portfolio.png',
    demoUrl: '/',
    category: 'web',
    featured: true,
  },
  {
    id: 'resume-engine',
    title: 'Resume Engine',
    description: 'AI-powered resume builder and analyzer',
    longDescription:
      'A lightweight, performant Snake game built with React and TypeScript. Features touch and keyboard controls, high score persistence, and configurable speed/board size.',
    technologies: ['React', 'TypeScript', 'HTML5 Canvas', 'Vite', 'CSS3'],
    image: '/projects/snake.png',
    demoUrl: '/play/snake',
    githubUrl: 'https://github.com/cozyGarage/cozy-snake',
    category: 'game',
    featured: false,
  },
  {
    id: 'task-manager',
    title: 'Task Manager',
    description: 'Kanban-style task manager with drag-and-drop and real-time sync',
    longDescription:
      'A full-stack task management application featuring a React frontend and a Node.js/Express backend. Implements drag-and-drop columns, user authentication, and WebSocket-based real-time updates.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Socket.IO'],
    image: '/projects/task-manager.png',
    demoUrl: '/task-manager',
    githubUrl: 'https://github.com/cozyGarage/task-manager',
    category: 'web',
    featured: true,
  },
  {
    id: 'image-classifier',
    title: 'Image Classifier',
    description: 'Convolutional neural network for image classification with a Flask API',
    longDescription:
      'A research/utility project that trains a CNN for multi-class image classification using TensorFlow. Exposes a simple Flask API for inference and includes scripts for data preprocessing and training.',
    technologies: ['Python', 'TensorFlow', 'Flask', 'NumPy', 'scikit-learn'],
    image: '/projects/image-classifier.png',
    githubUrl: 'https://github.com/cozyGarage/image-classifier',
    category: 'ml',
    featured: false,
  },
  // Add more projects here
];

// Skills
export const skills: Skill[] = [
  // Frontend
  { name: 'React', category: 'frontend', level: 5 },
  { name: 'TypeScript', category: 'frontend', level: 4 },
  { name: 'HTML/CSS', category: 'frontend', level: 5 },
  { name: 'JavaScript', category: 'frontend', level: 5 },

  // Backend
  { name: 'Node.js', category: 'backend', level: 4 },
  { name: 'Python', category: 'backend', level: 4 },

  // ML
  { name: 'TensorFlow', category: 'ml', level: 3 },
  { name: 'PyTorch', category: 'ml', level: 3 },

  // Tools
  { name: 'Git', category: 'tools', level: 5 },
  { name: 'Docker', category: 'tools', level: 3 },
  { name: 'Bun', category: 'tools', level: 4 },
];

// Experience
export const experience: Experience[] = [
  {
    title: 'Software Developer',
    company: 'Tech Company',
    location: 'Remote',
    period: '2023 - Present',
    description: [
      'Developed web applications using React and TypeScript',
      'Implemented machine learning models for data analysis',
      'Collaborated with cross-functional teams',
    ],
    technologies: ['React', 'TypeScript', 'Python', 'TensorFlow'],
  },
];

// Blog Posts
export const blogPosts: BlogPost[] = [
  {
    id: 'building-othello',
    title: 'Building an Othello Game with React',
    excerpt: 'A deep dive into creating a fully-featured Othello game using React and TypeScript.',
    content: `# Building an Othello Game with React

This is a sample blog post about building the Othello game...

## Introduction

Othello is a classic strategy board game...

## Technical Implementation

We used React for the UI and TypeScript for type safety...`,
    date: '2024-11-01',
    tags: ['React', 'TypeScript', 'Game Development'],
    readTime: 8,
  },
  {
    id: 'ml-basics',
    title: 'Getting Started with Machine Learning',
    excerpt: 'An introduction to machine learning concepts and practical applications.',
    content: `# Getting Started with Machine Learning

Machine learning is transforming how we build applications...`,
    date: '2024-10-15',
    tags: ['Machine Learning', 'Python', 'AI'],
    readTime: 12,
  },
  {
    id: 'react-performance',
    title: 'Optimizing React Applications for Performance',
    excerpt: 'Learn essential techniques to improve your React app\'s performance and user experience.',
    content: `# Optimizing React Applications for Performance

Performance is crucial for modern web applications. This guide covers essential optimization techniques...

## React.memo and useMemo

Prevent unnecessary re-renders with memoization...

## Code Splitting

Implement lazy loading and dynamic imports...

## Bundle Analysis

Use tools like Webpack Bundle Analyzer to identify large dependencies...`,
    date: '2024-11-08',
    tags: ['React', 'Performance', 'JavaScript'],
    readTime: 10,
  },
  {
    id: 'typescript-best-practices',
    title: 'TypeScript Best Practices for Large Applications',
    excerpt: 'Essential TypeScript patterns and practices for scalable, maintainable codebases.',
    content: `# TypeScript Best Practices for Large Applications

TypeScript provides excellent tooling for large-scale applications...

## Type Definitions

Create comprehensive type definitions for your data models...

## Generic Types

Leverage TypeScript generics for reusable components...

## Utility Types

Use built-in utility types like Partial, Pick, and Omit...

## Error Handling

Implement proper error types and handling patterns...`,
    date: '2024-11-05',
    tags: ['TypeScript', 'JavaScript', 'Best Practices'],
    readTime: 15,
  },
  {
    id: 'web-accessibility',
    title: 'Building Accessible Web Applications',
    excerpt: 'Essential guidelines for creating inclusive web experiences for all users.',
    content: `# Building Accessible Web Applications

Web accessibility ensures that your applications are usable by everyone, including people with disabilities...

## Semantic HTML

Use proper semantic elements for screen readers...

## Keyboard Navigation

Ensure all interactive elements are keyboard accessible...

## Color Contrast

Maintain proper color contrast ratios...

## ARIA Labels

Use ARIA attributes to provide additional context...`,
    date: '2024-10-28',
    tags: ['Accessibility', 'Web Development', 'UX'],
    readTime: 11,
  },
  {
    id: 'modern-css',
    title: 'Modern CSS Techniques and Layouts',
    excerpt: 'Explore contemporary CSS features for creating beautiful, responsive designs.',
    content: `# Modern CSS Techniques and Layouts

CSS has evolved significantly with new features for modern web development...

## CSS Grid

Powerful two-dimensional layout system...

## Flexbox Mastery

One-dimensional layout solutions...

## Custom Properties

Dynamic CSS variables for theming...

## Container Queries

Responsive design based on container size...`,
    date: '2024-10-20',
    tags: ['CSS', 'Web Development', 'Design'],
    readTime: 9,
  },
  {
    id: 'api-design',
    title: 'Designing RESTful APIs: Best Practices',
    excerpt: 'Learn how to design clean, maintainable, and scalable REST APIs.',
    content: `# Designing RESTful APIs: Best Practices

Well-designed APIs are the foundation of scalable applications...

## Resource Naming

Use clear, consistent naming conventions...

## HTTP Methods

Proper use of GET, POST, PUT, DELETE...

## Status Codes

Appropriate HTTP status code usage...

## Versioning

API versioning strategies...

## Documentation

Comprehensive API documentation with OpenAPI...`,
    date: '2024-10-10',
    tags: ['API', 'Backend', 'REST'],
    readTime: 13,
  },
  {
    id: 'testing-strategies',
    title: 'Comprehensive Testing Strategies for Web Applications',
    excerpt: 'Implement robust testing practices to ensure code quality and reliability.',
    content: `# Comprehensive Testing Strategies for Web Applications

Testing is essential for maintaining code quality and preventing regressions...

## Unit Testing

Test individual functions and components...

## Integration Testing

Test component interactions and API calls...

## End-to-End Testing

Full user workflow testing...

## Test-Driven Development

Write tests before implementing features...`,
    date: '2024-09-25',
    tags: ['Testing', 'Quality Assurance', 'Development'],
    readTime: 14,
  },
];
