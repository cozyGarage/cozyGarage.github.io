import React, { useState, useMemo, useCallback } from 'react';
import { projects } from '../../data/portfolio';
import { Link, useParams } from 'react-router-dom';
import './projects.css';
import { OptimizedImage } from '../../shared/components/OptimizedImage';

// Category icons for cleaner rendering
const CATEGORY_ICONS: Record<string, string> = {
  game: '🎮',
  web: '🌐',
  ml: '🤖',
  other: '💡'
};

/**
 * Projects Page
 * Showcase all projects in a grid layout with filtering
 */
export const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTech, setSelectedTech] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => ['all', ...new Set(projects.map((p) => p.category))], []);
  
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

  const handleSearchChange = useCallback((e: React.ChangeEvent<globalThis.HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const clearSearch = useCallback(() => setSearchQuery(''), []);
  
  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTech('all');
  }, []);

  return (
    <main className="projects-page">
      <div className="container">
        <header className="projects-header">
          <h1>My Projects</h1>
          <p>A collection of work I&apos;m proud of</p>
        </header>

        {/* Search and Filters */}
        <section className="projects-controls" aria-label="Project filters">
          <div className="search-box">
            <input
              type="search"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
              aria-label="Search projects"
            />
            {searchQuery && (
              <button
                className="clear-search"
                onClick={clearSearch}
                aria-label="Clear search"
                type="button"
              >
                ✕
              </button>
            )}
          </div>

          <div className="filter-section">
            <fieldset className="filter-group">
              <legend className="filter-label">Category:</legend>
              <div className="projects-filter" role="group">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                    aria-pressed={selectedCategory === category}
                    type="button"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="filter-group">
              <legend className="filter-label">Technology:</legend>
              <div className="tech-filter" role="group">
                {allTechnologies.map((tech) => (
                  <button
                    key={tech}
                    className={`filter-btn ${selectedTech === tech ? 'active' : ''}`}
                    onClick={() => setSelectedTech(tech)}
                    aria-pressed={selectedTech === tech}
                    type="button"
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        </section>

        {/* Results count */}
        {(searchQuery || selectedCategory !== 'all' || selectedTech !== 'all') && (
          <p className="projects-results" role="status" aria-live="polite">
            Found {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </p>
        )}

        <div className="projects-grid" role="list">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <article key={project.id} className="project-card" role="listitem">
                {project.featured && <span className="featured-badge">Featured</span>}
                <Link to={`/projects/${project.id}`} className="project-image-link">
                  <div className="project-image">
                  {/* Use optimized images when available (falls back to original src) */}
                  <div className="project-image-media">
                    {project.image ? (
                      <OptimizedImage
                        src={project.image}
                        alt={project.title}
                        className="project-image-element"
                      />
                    ) : (
                      <div className="project-image-placeholder" aria-hidden="true">
                        {CATEGORY_ICONS[project.category] || '💡'}
                      </div>
                    )}
                  </div>
                  <div className="project-overlay">
                    <p>{project.longDescription}</p>
                    <span className="view-details">View Details →</span>
                  </div>
                </div>
                </Link>
                <div className="project-content">
                  <h2>
                    <Link to={`/projects/${project.id}`}>{project.title}</Link>
                  </h2>
                  <p>{project.description}</p>
                  <div className="project-tech" role="list" aria-label="Technologies">
                    {project.technologies.map((tech) => (
                      <button
                        key={tech}
                        className="tech-tag"
                        onClick={() => setSelectedTech(tech)}
                        type="button"
                        aria-label={`Filter by ${tech}`}
                      >
                        {tech}
                      </button>
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
              </article>
            ))
          ) : (
            <div className="no-results" role="status">
              <p>No projects found matching your criteria.</p>
              <button
                className="reset-filters"
                onClick={resetFilters}
                type="button"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
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
