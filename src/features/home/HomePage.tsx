import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfo, projects, skills } from '../../data';
import './home.css';

// Lazy load below-the-fold components
const ContactForm = React.lazy(() => import('../../shared/components/ContactForm').then(m => ({ default: m.ContactForm })));
const NewsletterForm = React.lazy(() => import('../../shared/components/NewsletterForm').then(m => ({ default: m.NewsletterForm })));
const BookCallSection = React.lazy(() => import('../book/BookPage').then(m => ({ default: m.BookCallSection })));

// Define skill categories as a constant to avoid array recreation
const SKILL_CATEGORIES = ['frontend', 'backend', 'ml', 'tools'] as const;

// Category emoji map for cleaner code
const CATEGORY_ICONS: Record<string, string> = {
  game: '🎮',
  web: '🌐',
  ml: '🤖',
  other: '💡'
};

// Memoized project card component
const ProjectCard = React.memo<{ project: typeof projects[0] }>(({ project }) => (
  <article className="project-card">
    <div className="project-image">
      <div className="project-image-placeholder" aria-hidden="true">
        {CATEGORY_ICONS[project.category] || '💡'}
      </div>
    </div>
    <div className="project-content">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-tech" role="list" aria-label="Technologies used">
        {project.technologies.slice(0, 3).map((tech) => (
          <span key={tech} className="tech-tag" role="listitem">
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
  </article>
));

ProjectCard.displayName = 'ProjectCard';

/**
 * Home Page - Portfolio Landing Page
 * Hero section, featured projects, skills, about, book a call, newsletter, and contact
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
    <main className="landing-page">
      {/* Hero Section - Critical for LCP */}
      <section className="hero" aria-label="Introduction">
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I&apos;m <span className="highlight">{personalInfo.name}</span>
          </h1>
          <p className="hero-subtitle" role="doc-subtitle">{personalInfo.title}</p>
          <p className="hero-bio">{personalInfo.bio}</p>
          <nav className="hero-actions" aria-label="Primary actions">
            <Link to="/projects" className="btn btn-primary">
              View Projects
            </Link>
            <Link to="/book" className="btn btn-cta">
              Book a Call 📅
            </Link>
            <a href="#contact" className="btn btn-outline">
              Get in Touch
            </a>
          </nav>
        </div>
        <aside className="hero-graphic" aria-hidden="true">
          <div className="floating-card">
            <div className="code-snippet">
              <pre>{`const developer = {
  name: "${personalInfo.name}",
  skills: ["React", "ML", "TS"],
  passion: "Building cool stuff"
};`}</pre>
            </div>
          </div>
        </aside>
      </section>

      {/* Featured Projects */}
      <section className="featured-projects" aria-labelledby="featured-title">
        <div className="container">
          <h2 id="featured-title" className="section-title">Featured Projects</h2>
          <div className="projects-grid" role="list">
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
      <section className="skills" aria-labelledby="skills-title">
        <div className="container">
          <h2 id="skills-title" className="section-title">Skills & Technologies</h2>
          <div className="skills-grid">
            {SKILL_CATEGORIES.map((category) => {
              const categorySkills = skills.filter((s) => s.category === category);
              const categoryLabels: Record<string, string> = {
                frontend: '💻 Frontend',
                backend: '⚙️ Backend',
                ml: '🤖 Machine Learning',
                tools: '🛠️ Tools'
              };
              return (
                <div key={category} className="skill-category">
                  <h3 className="category-title">{categoryLabels[category]}</h3>
                  <ul className="skill-list">
                    {categorySkills.map((skill) => (
                      <li key={skill.name} className="skill-item">
                        <span className="skill-name">{skill.name}</span>
                        <div className="skill-bar" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={5}>
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
      <section className="about" aria-labelledby="about-title">
        <div className="container">
          <h2 id="about-title" className="section-title">About Me</h2>
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
              <dl className="about-stats">
                <div className="stat">
                  <dt className="stat-label">Projects</dt>
                  <dd className="stat-number">{stats.projectsCount}+</dd>
                </div>
                <div className="stat">
                  <dt className="stat-label">Skills</dt>
                  <dd className="stat-number">{stats.skillsCount}+</dd>
                </div>
                <div className="stat">
                  <dt className="stat-label">Learning</dt>
                  <dd className="stat-number">∞</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Book a Call - Lazy loaded */}
      <React.Suspense fallback={<div className="section-loading">Loading…</div>}>
        <BookCallSection />
      </React.Suspense>

      {/* Newsletter - Lazy loaded */}
      <section className="newsletter-section" aria-labelledby="newsletter-title">
        <div className="container">
          <h2 id="newsletter-title" className="section-title">Newsletter</h2>
          <React.Suspense fallback={<div className="section-loading">Loading…</div>}>
            <NewsletterForm />
          </React.Suspense>
        </div>
      </section>

      {/* Contact - Lazy loaded */}
      <section id="contact" className="contact" aria-labelledby="contact-title">
        <div className="container">
          <h2 id="contact-title" className="section-title">Get In Touch</h2>
          <React.Suspense fallback={<div className="contact-loading">Loading contact form...</div>}>
            <ContactForm />
          </React.Suspense>

          {/* Alternative contact links */}
          <nav className="contact-links" aria-label="Contact methods">
            <a href={`mailto:${personalInfo.email}`} className="contact-link">
              <span className="icon" aria-hidden="true">📧</span>
              Email
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span className="icon" aria-hidden="true">💻</span>
              GitHub
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span className="icon" aria-hidden="true">💼</span>
              LinkedIn
            </a>
          </nav>
        </div>
      </section>
    </main>
  );
};
