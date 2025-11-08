import React from 'react';
import { projects } from '../../data/portfolio';
import { Link } from 'react-router-dom';
import './projects.css';

/**
 * Projects Page
 * Showcase all projects in a grid layout
 */
export const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const categories = ['all', ...new Set(projects.map((p) => p.category))];
  const filteredProjects =
    selectedCategory === 'all' ? projects : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="projects-page">
      <div className="container">
        <header className="projects-header">
          <h1>My Projects</h1>
          <p>A collection of work I'm proud of</p>
        </header>

        <div className="projects-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <div className="project-image-placeholder">
                  {project.category === 'game' && '🎮'}
                  {project.category === 'web' && '🌐'}
                  {project.category === 'ml' && '🤖'}
                  {project.category === 'other' && '💡'}
                </div>
                <div className="project-overlay">
                  <p>{project.longDescription}</p>
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  {project.demoUrl && (
                    <Link to={project.demoUrl} className="project-link">
                      View Demo →
                    </Link>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
