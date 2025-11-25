import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfo, projects, skills } from '../../data';
import { ContactForm } from '../../shared/components/ContactForm';
import './home.css';

// Define skill categories as a constant to avoid array recreation
const SKILL_CATEGORIES = ['frontend', 'backend', 'ml', 'tools'] as const;

// Memoized project card component
const ProjectCard = React.memo<{ project: typeof projects[0] }>(({ project }) => (
  <div className="project-card">
    <div className="project-image">
      <div className="project-image-placeholder">
        {project.category === 'game' && '🎮'}
        {project.category === 'web' && '🌐'}
        {project.category === 'ml' && '🤖'}
      </div>
    </div>
    <div className="project-content">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-tech">
        {project.technologies.slice(0, 3).map((tech) => (
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
));

ProjectCard.displayName = 'ProjectCard';

/**
 * Home Page - Portfolio Landing Page
 * Hero section, featured projects, skills, about, and contact
 */
export const HomePage: React.FC = () => {
  // Memoize featured projects to avoid filtering on every render
  const featuredProjects = React.useMemo(() => 
    projects.filter((p) => p.featured),
    []
  );

  // Memoize stats to avoid recalculating on every render
  const stats = React.useMemo(() => ({
    projectsCount: projects.length,
    skillsCount: skills.length,
  }), []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title animate-fade-in">
            Hi, I&apos;m <span className="highlight">{personalInfo.name}</span>
          </h1>
          <h2 className="hero-subtitle animate-fade-in-delay">{personalInfo.title}</h2>
          <p className="hero-bio animate-fade-in-delay-2">{personalInfo.bio}</p>
          <div className="hero-actions animate-fade-in-delay-3">
            <Link to="/projects" className="btn btn-primary">
              View Projects
            </Link>
            <Link to="/play" className="btn btn-secondary">
              Play Othello ⚫⚪
            </Link>
            <a href="#contact" className="btn btn-outline">
              Get in Touch
            </a>
          </div>
        </div>
        <div className="hero-graphic">
          <div className="floating-card">
            <div className="code-snippet">
              <pre>{`const developer = {
  name: "${personalInfo.name}",
  skills: ["React", "ML", "TS"],
  passion: "Building cool stuff"
};`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="featured-projects">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="section-action">
            <Link to="/projects" className="btn btn-primary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="skills">
        <div className="container">
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="skills-grid">
            {SKILL_CATEGORIES.map((category) => {
              const categorySkills = skills.filter((s) => s.category === category);
              return (
                <div key={category} className="skill-category">
                  <h3 className="category-title">
                    {category === 'frontend' && '💻 Frontend'}
                    {category === 'backend' && '⚙️ Backend'}
                    {category === 'ml' && '🤖 Machine Learning'}
                    {category === 'tools' && '🛠️ Tools'}
                  </h3>
                  <ul className="skill-list">
                    {categorySkills.map((skill) => (
                      <li key={skill.name} className="skill-item">
                        <span className="skill-name">{skill.name}</span>
                        <div className="skill-bar">
                          <div
                            className="skill-level"
                            style={{ width: `${(skill.level / 5) * 100}%` }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="about">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I&apos;m a passionate developer who loves building interactive web applications and
                exploring the world of machine learning. My journey in tech started with curiosity
                and has grown into a career dedicated to creating meaningful solutions.
              </p>
              <p>
                When I&apos;m not coding, you can find me learning new technologies, contributing to
                open-source projects, or playing strategic games like Othello (which I built
                myself!).
              </p>
              <div className="about-stats">
                <div className="stat">
                  <div className="stat-number">{stats.projectsCount}+</div>
                  <div className="stat-label">Projects</div>
                </div>
                <div className="stat">
                  <div className="stat-number">{stats.skillsCount}+</div>
                  <div className="stat-label">Skills</div>
                </div>
                <div className="stat">
                  <div className="stat-number">∞</div>
                  <div className="stat-label">Learning</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <ContactForm />

          {/* Alternative contact links */}
          <div className="contact-links">
            <a href={`mailto:${personalInfo.email}`} className="contact-link">
              <span className="icon">📧</span>
              Email
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span className="icon">💻</span>
              GitHub
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span className="icon">💼</span>
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
