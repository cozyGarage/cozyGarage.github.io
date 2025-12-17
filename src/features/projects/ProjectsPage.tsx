import React, { useState, useMemo } from 'react';
import { projects } from '../../data/portfolio';
import { Link, useParams } from 'react-router-dom';
import './projects.css';

/**
 * Projects Page
 * Showcase all projects in a grid layout with filtering
 */
export const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTech, setSelectedTech] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', ...new Set(projects.map((p) => p.category))];
  
  const allTechnologies = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(project => project.technologies.forEach(tech => techs.add(tech)));
    return ['all', ...Array.from(techs).sort()];
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesTech = selectedTech === 'all' || project.technologies.includes(selectedTech);
      const matchesSearch = searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesTech && matchesSearch;
    });
  }, [selectedCategory, selectedTech, searchQuery]);

  return (
    <div className="projects-page">
      <div className="container">
        <header className="projects-header">
          <h1>My Projects</h1>
          <p>A collection of work I'm proud of</p>
        </header>

        {/* Search and Filters */}
        <div className="projects-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search projects..."
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

          <div className="filter-section">
            <div className="filter-group">
              <label className="filter-label">Category:</label>
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
            </div>

            <div className="filter-group">
              <label className="filter-label">Technology:</label>
              <div className="tech-filter">
                {allTechnologies.map((tech) => (
                  <button
                    key={tech}
                    className={`filter-btn ${selectedTech === tech ? 'active' : ''}`}
                    onClick={() => setSelectedTech(tech)}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        {(searchQuery || selectedCategory !== 'all' || selectedTech !== 'all') && (
          <div className="projects-results">
            Found {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </div>
        )}

        <div className="projects-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div key={project.id} className="project-card">
                {project.featured && <span className="featured-badge">Featured</span>}
                <Link to={`/projects/${project.id}`} className="project-image-link">
                  <div className="project-image">
                    <div className="project-image-placeholder">
                      {project.category === 'game' && '🎮'}
                      {project.category === 'web' && '🌐'}
                      {project.category === 'ml' && '🤖'}
                      {project.category === 'other' && '💡'}
                    </div>
                    <div className="project-overlay">
                      <p>{project.longDescription}</p>
                      <span className="view-details">View Details →</span>
                    </div>
                  </div>
                </Link>
                <div className="project-content">
                  <h3>
                    <Link to={`/projects/${project.id}`}>{project.title}</Link>
                  </h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="tech-tag"
                        onClick={() => setSelectedTech(tech)}
                        role="button"
                        tabIndex={0}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.demoUrl && (
                      <Link to={project.demoUrl} className="project-link demo">
                        View Demo →
                      </Link>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link github"
                      >
                        GitHub →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No projects found matching your criteria.</p>
              <button
                className="reset-filters"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedTech('all');
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
 * Individual Project Detail Page
 */
export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="project-detail-page">
        <div className="container">
          <h1>Project not found</h1>
          <Link to="/projects">← Back to projects</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail-page">
      <div className="container">
        <Link to="/projects" className="back-link">
          ← Back to projects
        </Link>

        <article className="project-detail">
          <header className="project-detail-header">
            <div className="project-detail-title-row">
              <h1>{project.title}</h1>
              {project.featured && <span className="featured-badge large">Featured</span>}
            </div>
            <p className="project-detail-description">{project.description}</p>
            
            <div className="project-detail-meta">
              <span className="project-category">
                {project.category === 'game' && '🎮'}
                {project.category === 'web' && '🌐'}
                {project.category === 'ml' && '🤖'}
                {project.category === 'other' && '💡'}
                {' '}
                {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
              </span>
            </div>
          </header>

          <div className="project-detail-image">
            <div className="project-image-placeholder large">
              {project.category === 'game' && '🎮'}
              {project.category === 'web' && '🌐'}
              {project.category === 'ml' && '🤖'}
              {project.category === 'other' && '💡'}
            </div>
          </div>

          <div className="project-detail-content">
            <section className="project-section">
              <h2>About This Project</h2>
              <p>{project.longDescription}</p>
            </section>

            <section className="project-section">
              <h2>Technologies Used</h2>
              <div className="project-tech-grid">
                {project.technologies.map((tech) => (
                  <div key={tech} className="tech-item">
                    <span className="tech-icon">⚡</span>
                    <span className="tech-name">{tech}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="project-section">
              <h2>Links</h2>
              <div className="project-detail-links">
                {project.demoUrl && (
                  <Link to={project.demoUrl} className="detail-link demo">
                    <span className="link-icon">🚀</span>
                    <span>View Live Demo</span>
                  </Link>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail-link github"
                  >
                    <span className="link-icon">💻</span>
                    <span>View Source Code</span>
                  </a>
                )}
              </div>
            </section>
          </div>

          <div className="project-navigation">
            <Link to="/projects" className="all-projects-link">
              View all projects →
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};
