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
  email: 'contact@example.com',
  github: 'https://github.com/cozyGarage',
  linkedin: 'https://linkedin.com/in/yourprofile',
  location: 'Vietnam',
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
];
