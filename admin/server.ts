/**
 * Admin Server for Portfolio Website
 * 
 * This server provides an admin interface for managing portfolio content.
 * It runs on a separate port (default: 3001) and provides:
 * - CRUD operations for projects, skills, and experience
 * - File upload for project images
 * - Real-time data persistence to JSON/TypeScript files
 * 
 * Security: In production, implement proper authentication!
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

const ADMIN_PORT = process.env.ADMIN_PORT || 3001;
const DATA_DIR = join(dirname(import.meta.dir), 'src', 'data');
const PUBLIC_DIR = join(dirname(import.meta.dir), 'public', 'projects');

// Ensure directories exist
if (!existsSync(PUBLIC_DIR)) {
  mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Types
interface Project {
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

interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'ml' | 'tools' | 'other';
  level: number;
}

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
}

interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
}

interface PortfolioData {
  personalInfo: PersonalInfo;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
}

// Data file path
const DATA_FILE = join(dirname(import.meta.dir), 'admin', 'data.json');

// Initialize or load data
function loadData(): PortfolioData {
  if (existsSync(DATA_FILE)) {
    return JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
  }
  
  // Load from portfolio.ts and create JSON backup
  const portfolioPath = join(DATA_DIR, 'portfolio.ts');
  const content = readFileSync(portfolioPath, 'utf-8');
  
  // Extract data using regex (simplified parser)
  const data: PortfolioData = {
    personalInfo: extractPersonalInfo(content),
    projects: extractProjects(content),
    skills: extractSkills(content),
    experience: extractExperience(content),
  };
  
  saveData(data);
  return data;
}

function extractPersonalInfo(content: string): PersonalInfo {
  const match = content.match(/personalInfo\s*=\s*\{([^}]+)\}/s);
  if (!match) {
    return {
      name: 'Trung Nguyen',
      title: 'Full Stack Developer & ML Enthusiast',
      bio: '',
      email: 'sendtotrungnguyen@outlook.com',
      github: 'https://github.com/cozyGarage',
      linkedin: 'https://linkedin.com/in/nguyenthanhtrung8888',
      location: 'Vienna, Austria',
    };
  }
  
  const block = match[1];
  return {
    name: extractValue(block, 'name') || 'Trung Nguyen',
    title: extractValue(block, 'title') || 'Full Stack Developer',
    bio: extractValue(block, 'bio') || '',
    email: extractValue(block, 'email') || '',
    github: extractValue(block, 'github') || '',
    linkedin: extractValue(block, 'linkedin') || '',
    location: extractValue(block, 'location') || '',
  };
}

function extractValue(block: string, key: string): string {
  const regex = new RegExp(`${key}:\\s*['"]([^'"]+)['"]`);
  const match = block.match(regex);
  return match ? match[1] : '';
}

function extractProjects(content: string): Project[] {
  // This is a simplified extraction - in production, use a proper parser
  const projectsMatch = content.match(/projects:\s*Project\[\]\s*=\s*\[([\s\S]*?)\];\s*\n\s*\/\//);
  if (!projectsMatch) return [];
  
  const projectsBlock = projectsMatch[1];
  const projects: Project[] = [];
  const projectRegex = /\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g;
  let match;
  
  while ((match = projectRegex.exec(projectsBlock)) !== null) {
    const block = match[1];
    const project: Project = {
      id: extractValue(block, 'id') || `project-${Date.now()}`,
      title: extractValue(block, 'title') || '',
      description: extractValue(block, 'description') || '',
      longDescription: extractLongValue(block, 'longDescription') || '',
      technologies: extractArray(block, 'technologies'),
      image: extractValue(block, 'image') || '',
      demoUrl: extractValue(block, 'demoUrl') || undefined,
      githubUrl: extractValue(block, 'githubUrl') || undefined,
      category: (extractValue(block, 'category') as Project['category']) || 'other',
      featured: block.includes('featured: true'),
    };
    if (project.title) projects.push(project);
  }
  
  return projects;
}

function extractLongValue(block: string, key: string): string {
  const regex = new RegExp(`${key}:\\s*['"\`]([^'\`]+)['"\`]`, 's');
  const match = block.match(regex);
  return match ? match[1].replace(/\\n/g, '\n').trim() : '';
}

function extractArray(block: string, key: string): string[] {
  const regex = new RegExp(`${key}:\\s*\\[([^\\]]+)\\]`);
  const match = block.match(regex);
  if (!match) return [];
  return match[1].split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean);
}

function extractSkills(content: string): Skill[] {
  const skillsMatch = content.match(/skills:\s*Skill\[\]\s*=\s*\[([\s\S]*?)\];\s*\n/);
  if (!skillsMatch) return [];
  
  const skills: Skill[] = [];
  const skillRegex = /\{\s*name:\s*['"]([^'"]+)['"]\s*,\s*category:\s*['"]([^'"]+)['"]\s*,\s*level:\s*(\d+)\s*\}/g;
  let match;
  
  while ((match = skillRegex.exec(skillsMatch[1])) !== null) {
    skills.push({
      name: match[1],
      category: match[2] as Skill['category'],
      level: parseInt(match[3], 10),
    });
  }
  
  return skills;
}

function extractExperience(content: string): Experience[] {
  // Simplified - returns empty for now, can be enhanced
  return [];
}

function saveData(data: PortfolioData): void {
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function generatePortfolioTS(data: PortfolioData): string {
  return `/**
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
export const personalInfo = ${JSON.stringify(data.personalInfo, null, 2)};

// Projects
export const projects: Project[] = ${JSON.stringify(data.projects, null, 2)};

// Skills
export const skills: Skill[] = ${JSON.stringify(data.skills, null, 2)};

// Experience
export const experience: Experience[] = ${JSON.stringify(data.experience, null, 2)};

/**
 * Blog Posts
 * 
 * Blog content is stored in separate files in the \`blog/\` directory.
 * This approach:
 * - Keeps this file manageable
 * - Enables code splitting for large blog content
 * - Makes blog posts easier to write and maintain
 * - Allows for better organization of related assets
 * 
 * To add a new blog post:
 * 1. Create a new file in \`src/data/blog/your-post-name.ts\`
 * 2. Export a post object matching the BlogPost interface
 * 3. Import and add it to \`src/data/blog/index.ts\`
 */
export const blogPosts: BlogPost[] = allBlogPosts;
`;
}

function syncToPortfolioTS(data: PortfolioData): void {
  const portfolioPath = join(DATA_DIR, 'portfolio.ts');
  writeFileSync(portfolioPath, generatePortfolioTS(data));
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Request handler
async function handleRequest(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;
  const method = req.method;

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Load current data
  const data = loadData();

  try {
    // API Routes
    if (path === '/api/data' && method === 'GET') {
      return jsonResponse(data);
    }

    // Personal Info
    if (path === '/api/personal-info') {
      if (method === 'GET') {
        return jsonResponse(data.personalInfo);
      }
      if (method === 'PUT') {
        const body = await req.json() as PersonalInfo;
        data.personalInfo = body;
        saveData(data);
        syncToPortfolioTS(data);
        return jsonResponse({ success: true, data: data.personalInfo });
      }
    }

    // Projects CRUD
    if (path === '/api/projects') {
      if (method === 'GET') {
        return jsonResponse(data.projects);
      }
      if (method === 'POST') {
        const body = await req.json() as Project;
        body.id = body.id || `project-${Date.now()}`;
        data.projects.push(body);
        saveData(data);
        syncToPortfolioTS(data);
        return jsonResponse({ success: true, data: body });
      }
    }

    if (path.startsWith('/api/projects/')) {
      const id = path.split('/')[3];
      const index = data.projects.findIndex(p => p.id === id);

      if (method === 'GET') {
        if (index === -1) return jsonResponse({ error: 'Project not found' }, 404);
        return jsonResponse(data.projects[index]);
      }

      if (method === 'PUT') {
        if (index === -1) return jsonResponse({ error: 'Project not found' }, 404);
        const body = await req.json() as Project;
        data.projects[index] = { ...data.projects[index], ...body };
        saveData(data);
        syncToPortfolioTS(data);
        return jsonResponse({ success: true, data: data.projects[index] });
      }

      if (method === 'DELETE') {
        if (index === -1) return jsonResponse({ error: 'Project not found' }, 404);
        data.projects.splice(index, 1);
        saveData(data);
        syncToPortfolioTS(data);
        return jsonResponse({ success: true });
      }
    }

    // Skills CRUD
    if (path === '/api/skills') {
      if (method === 'GET') {
        return jsonResponse(data.skills);
      }
      if (method === 'POST') {
        const body = await req.json() as Skill;
        data.skills.push(body);
        saveData(data);
        syncToPortfolioTS(data);
        return jsonResponse({ success: true, data: body });
      }
    }

    if (path.startsWith('/api/skills/')) {
      const name = decodeURIComponent(path.split('/')[3]);
      const index = data.skills.findIndex(s => s.name === name);

      if (method === 'PUT') {
        if (index === -1) return jsonResponse({ error: 'Skill not found' }, 404);
        const body = await req.json() as Skill;
        data.skills[index] = body;
        saveData(data);
        syncToPortfolioTS(data);
        return jsonResponse({ success: true, data: data.skills[index] });
      }

      if (method === 'DELETE') {
        if (index === -1) return jsonResponse({ error: 'Skill not found' }, 404);
        data.skills.splice(index, 1);
        saveData(data);
        syncToPortfolioTS(data);
        return jsonResponse({ success: true });
      }
    }

    // Experience CRUD
    if (path === '/api/experience') {
      if (method === 'GET') {
        return jsonResponse(data.experience);
      }
      if (method === 'POST') {
        const body = await req.json() as Experience;
        data.experience.push(body);
        saveData(data);
        syncToPortfolioTS(data);
        return jsonResponse({ success: true, data: body });
      }
    }

    // Image upload
    if (path === '/api/upload' && method === 'POST') {
      const formData = await req.formData();
      const file = formData.get('image') as File;
      if (!file) {
        return jsonResponse({ error: 'No file provided' }, 400);
      }

      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filepath = join(PUBLIC_DIR, filename);
      const buffer = await file.arrayBuffer();
      writeFileSync(filepath, Buffer.from(buffer));

      return jsonResponse({ 
        success: true, 
        path: `/projects/${filename}`,
        filename 
      });
    }

    // Sync data to portfolio.ts
    if (path === '/api/sync' && method === 'POST') {
      syncToPortfolioTS(data);
      return jsonResponse({ success: true, message: 'Synced to portfolio.ts' });
    }

    // Serve admin frontend
    if (path === '/' || path === '/admin' || path === '/index.html') {
      const html = readFileSync(join(import.meta.dir, 'index.html'), 'utf-8');
      return new Response(html, {
        headers: { ...corsHeaders, 'Content-Type': 'text/html' },
      });
    }

    // Serve static files
    if (path.endsWith('.css')) {
      try {
        const css = readFileSync(join(import.meta.dir, path.slice(1)), 'utf-8');
        return new Response(css, {
          headers: { ...corsHeaders, 'Content-Type': 'text/css' },
        });
      } catch {
        return new Response('Not found', { status: 404 });
      }
    }

    if (path.endsWith('.js')) {
      try {
        const js = readFileSync(join(import.meta.dir, path.slice(1)), 'utf-8');
        return new Response(js, {
          headers: { ...corsHeaders, 'Content-Type': 'application/javascript' },
        });
      } catch {
        return new Response('Not found', { status: 404 });
      }
    }

    // Serve project images from public/projects/
    if (path.startsWith('/projects/')) {
      try {
        const imagePath = join(dirname(import.meta.dir), 'public', path);
        const file = Bun.file(imagePath);
        if (await file.exists()) {
          const ext = path.split('.').pop()?.toLowerCase();
          const contentTypes: Record<string, string> = {
            'png': 'image/png',
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'gif': 'image/gif',
            'webp': 'image/webp',
            'svg': 'image/svg+xml',
          };
          return new Response(file, {
            headers: { 
              ...corsHeaders, 
              'Content-Type': contentTypes[ext || ''] || 'application/octet-stream',
              'Cache-Control': 'public, max-age=31536000',
            },
          });
        }
      } catch {
        // Fall through to 404
      }
    }

    return jsonResponse({ error: 'Not found' }, 404);
  } catch (error) {
    console.error('Error handling request:', error);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
}

// Start server
console.log(`
╔════════════════════════════════════════════════════════════╗
║           Portfolio Admin Server                           ║
╠════════════════════════════════════════════════════════════╣
║  🚀 Server running at: http://localhost:${ADMIN_PORT}              ║
║  📁 Data directory: ${DATA_DIR.slice(-35).padStart(35)}  ║
║                                                            ║
║  API Endpoints:                                            ║
║  • GET/PUT     /api/personal-info                          ║
║  • GET/POST    /api/projects                               ║
║  • GET/PUT/DEL /api/projects/:id                           ║
║  • GET/POST    /api/skills                                 ║
║  • PUT/DELETE  /api/skills/:name                           ║
║  • GET/POST    /api/experience                             ║
║  • POST        /api/upload (multipart/form-data)           ║
║  • POST        /api/sync                                   ║
║                                                            ║
║  ⚠️  For development only - add auth for production!       ║
╚════════════════════════════════════════════════════════════╝
`);

export default {
  port: ADMIN_PORT,
  fetch: handleRequest,
};
