/**
 * Portfolio Data Module
 * 
 * Central data store for all portfolio content including:
 * - Personal information and contact details
 * - Project showcase data
 * - Technical skills and proficiency levels
 * - Work experience history
 * - Blog posts (imported from separate blog module)
 * 
 * This file serves as the single source of truth for portfolio content.
 * Update this file to personalize the portfolio with your own information.
 * 
 * @module data/portfolio
 */

import { allBlogPosts } from './blog';

/**
 * Project interface
 * Defines the structure for portfolio projects
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
  "name": "Trung Nguyen",
  "title": "Full Stack Developer & ML Enthusiast",
  "bio": "Passionate developer with expertise in building web applications and exploring machine learning. I love creating interactive experiences and solving complex problems.",
  "email": "sendtotrungnguyen@outlook.com",
  "location": "Vienna, Austria",
  "github": "https://github.com/cozyGarage",
  "linkedin": "https://linkedin.com/in/nguyenthanhtrung8888"
};

// Projects
export const projects: Project[] = [
  {
    "id": "othello",
    "title": "Othello Game",
    "description": "Interactive Othello (Reversi) game with clean UI and smart AI opponent",
    "longDescription": "A fully-featured Othello game built with React and TypeScript. Features include move validation, intelligent AI opponent using minimax algorithm, move history tracking, undo/redo functionality, and beautiful animations. The game provides a challenging experience for players of all skill levels.",
    "technologies": [
      "React",
      "TypeScript",
      "Vite",
      "CSS3",
      "AI/Minimax"
    ],
    "image": "/projects/1766960698286-Othello.png",
    "demoUrl": "/play",
    "githubUrl": "https://github.com/cozyGarage/Othello",
    "category": "game",
    "featured": true
  },
  {
    "id": "portfolio",
    "title": "Portfolio Website",
    "description": "Personal portfolio showcasing projects and technical skills",
    "longDescription": "A modern, responsive portfolio website built from scratch to showcase my work and technical abilities.",
    "technologies": [
      "React",
      "TypeScript",
      "CSS3",
      "Vite"
    ],
    "image": "/projects/portfolio.png",
    "demoUrl": "/",
    "category": "web",
    "featured": true
  },
  {
    "id": "resume-engine",
    "title": "Resume Engine",
    "description": "Smart resume builder and parser with PDF generation capabilities",
    "longDescription": "A powerful resume management tool that helps users create, parse, and optimize their resumes. Features include resume parsing from various formats, customizable templates, PDF generation, and ATS-friendly output. Built with Python backend for intelligent processing and a clean React frontend for user interaction.",
    "technologies": [
      "Python",
      "React",
      "TypeScript",
      "PDF Processing",
      "NLP"
    ],
    "image": "/projects/1766960720411-hmr_analyze.png",
    "githubUrl": "https://github.com/cozyGarage/resume_engine",
    "category": "web",
    "featured": true
  },
  {
    "id": "task-manager",
    "title": "Task Manager",
    "description": "Kanban-style task manager with drag-and-drop and real-time sync",
    "longDescription": "A full-stack task management application featuring a React frontend and a Node.js/Express backend. Implements drag-and-drop columns, user authentication, and WebSocket-based real-time updates.",
    "technologies": [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.IO"
    ],
    "image": "/projects/task-manager.png",
    "demoUrl": "/task-manager",
    "githubUrl": "https://github.com/cozyGarage/task-manager",
    "category": "web",
    "featured": true
  },
  {
    "id": "image-classifier",
    "title": "Image Classifier",
    "description": "Convolutional neural network for image classification with a Flask API",
    "longDescription": "A research/utility project that trains a CNN for multi-class image classification using TensorFlow. Exposes a simple Flask API for inference and includes scripts for data preprocessing and training.",
    "technologies": [
      "Python",
      "TensorFlow",
      "Flask",
      "NumPy",
      "scikit-learn"
    ],
    "image": "/projects/image-classifier.png",
    "githubUrl": "https://github.com/cozyGarage/image-classifier",
    "category": "ml",
    "featured": false
  }
];

// Skills
export const skills: Skill[] = [
  {
    "name": "React",
    "category": "frontend",
    "level": 5
  },
  {
    "name": "TypeScript",
    "category": "frontend",
    "level": 4
  },
  {
    "name": "HTML/CSS",
    "category": "frontend",
    "level": 5
  },
  {
    "name": "JavaScript",
    "category": "frontend",
    "level": 5
  },
  {
    "name": "Node.js",
    "category": "backend",
    "level": 4
  },
  {
    "name": "Python",
    "category": "backend",
    "level": 4
  },
  {
    "name": "TensorFlow",
    "category": "ml",
    "level": 3
  },
  {
    "name": "PyTorch",
    "category": "ml",
    "level": 3
  },
  {
    "name": "Git",
    "category": "tools",
    "level": 5
  },
  {
    "name": "Docker",
    "category": "tools",
    "level": 3
  },
  {
    "name": "Bun",
    "category": "tools",
    "level": 4
  }
];

// Experience
export const experience: Experience[] = [];

/**
 * Blog Posts
 * 
 * Blog content is stored in separate files in the `blog/` directory.
 * This approach:
 * - Keeps this file manageable
 * - Enables code splitting for large blog content
 * - Makes blog posts easier to write and maintain
 * - Allows for better organization of related assets
 * 
 * To add a new blog post:
 * 1. Create a new file in `src/data/blog/your-post-name.ts`
 * 2. Export a post object matching the BlogPost interface
 * 3. Import and add it to `src/data/blog/index.ts`
 */
export const blogPosts: BlogPost[] = allBlogPosts;
