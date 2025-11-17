import { describe, expect, test } from 'bun:test';
import { personalInfo, projects, skills, experience, blogPosts } from './portfolio';

describe('Portfolio Data', () => {
  test('personalInfo contains main identity fields', () => {
    expect(typeof personalInfo.name).toBe('string');
    expect(personalInfo.name.length).toBeGreaterThan(0);
    expect(typeof personalInfo.email).toBe('string');
    expect(personalInfo.email).toContain('@');
    expect(typeof personalInfo.github).toBe('string');
    expect(personalInfo.github.startsWith('https://')).toBeTruthy();
  });

  test('projects should be non-empty and contain required fields', () => {
    expect(Array.isArray(projects)).toBeTruthy();
    expect(projects.length).toBeGreaterThan(0);

    projects.forEach((p) => {
      expect(typeof p.id).toBe('string');
      expect(p.id.length).toBeGreaterThan(0);
      expect(typeof p.title).toBe('string');
      expect(Array.isArray(p.technologies)).toBeTruthy();
      expect(p.technologies.length).toBeGreaterThan(0);
      expect(['game', 'web', 'ml', 'other']).toContain(p.category);
    });
  });

  test('at least one featured project exists', () => {
    const featured = projects.filter((p) => p.featured);
    expect(featured.length).toBeGreaterThanOrEqual(1);
  });

  test('skills have valid levels', () => {
    expect(Array.isArray(skills)).toBeTruthy();
    skills.forEach((s) => {
      expect(typeof s.name).toBe('string');
      expect(s.level).toBeGreaterThanOrEqual(1);
      expect(s.level).toBeLessThanOrEqual(5);
      expect(['frontend', 'backend', 'ml', 'tools', 'other']).toContain(s.category);
    });
  });

  test('experience entries have required fields', () => {
    expect(Array.isArray(experience)).toBeTruthy();
    experience.forEach((e) => {
      expect(typeof e.title).toBe('string');
      expect(typeof e.company).toBe('string');
      expect(Array.isArray(e.description)).toBeTruthy();
    });
  });

  test('blog posts are present and have required fields', () => {
    expect(Array.isArray(blogPosts)).toBeTruthy();
    expect(blogPosts.length).toBeGreaterThan(0);
    blogPosts.forEach((b) => {
      expect(typeof b.id).toBe('string');
      expect(typeof b.title).toBe('string');
      expect(typeof b.date).toBe('string');
    });
  });
});
