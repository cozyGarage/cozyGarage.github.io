/**
 * Portfolio Admin Frontend Application
 */

const API_URL = `http://localhost:${window.location.port || 3001}`;

// State
let state = {
  personalInfo: {},
  projects: [],
  skills: [],
  experience: [],
};

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  setupEventListeners();
  renderAll();
});

// API Functions
async function api(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  return response.json();
}

async function loadData() {
  try {
    const data = await api('/api/data');
    state = data;
    showToast('Data loaded successfully', 'success');
  } catch (error) {
    console.error('Failed to load data:', error);
    showToast('Failed to load data', 'error');
  }
}

async function syncData() {
  try {
    await api('/api/sync', { method: 'POST' });
    showToast('Synced to portfolio.ts!', 'success');
  } catch (error) {
    showToast('Sync failed', 'error');
  }
}

// Tab Navigation
function setupEventListeners() {
  // Tab buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      switchTab(tab);
    });
  });

  // Personal Info Form
  document.getElementById('personal-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
      await api('/api/personal-info', {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      state.personalInfo = data;
      showToast('Personal info saved!', 'success');
    } catch (error) {
      showToast('Failed to save', 'error');
    }
  });

  // Project Form
  document.getElementById('project-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    await saveProject();
  });

  // Skill Form
  document.getElementById('skill-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    await saveSkill();
  });

  // Skill Level Display
  document.getElementById('skill-level').addEventListener('input', (e) => {
    document.getElementById('skill-level-display').textContent = e.target.value;
  });

  // Experience Form
  document.getElementById('experience-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    await saveExperience();
  });

  // Close modals on backdrop click
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });

  // Escape key to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
    }
  });
}

function switchTab(tab) {
  // Update nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  
  // Update content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `${tab}-tab`);
  });
}

// Render Functions
function renderAll() {
  renderPersonalInfo();
  renderProjects();
  renderSkills();
  renderExperience();
}

function renderPersonalInfo() {
  const info = state.personalInfo;
  document.getElementById('name').value = info.name || '';
  document.getElementById('title').value = info.title || '';
  document.getElementById('bio').value = info.bio || '';
  document.getElementById('email').value = info.email || '';
  document.getElementById('location').value = info.location || '';
  document.getElementById('github').value = info.github || '';
  document.getElementById('linkedin').value = info.linkedin || '';
}

function renderProjects() {
  const container = document.getElementById('projects-list');
  
  if (state.projects.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>No projects yet</p>
        <button class="btn btn-primary" onclick="showProjectModal()">➕ Add Your First Project</button>
      </div>
    `;
    return;
  }

  container.innerHTML = state.projects.map(project => `
    <div class="item-card">
      <img 
        class="item-card-image" 
        src="${project.image || '/projects/placeholder.png'}" 
        alt="${project.title}"
        onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22><rect fill=%22%23334155%22 width=%22400%22 height=%22300%22/><text x=%22200%22 y=%22150%22 fill=%22%2394a3b8%22 text-anchor=%22middle%22 font-family=%22sans-serif%22>No Image</text></svg>'"
      >
      <div class="item-card-body">
        <h3 class="item-card-title">
          ${getCategoryIcon(project.category)} ${project.title}
        </h3>
        <p class="item-card-description">${project.description}</p>
        <div class="item-card-tags">
          ${project.featured ? '<span class="tag featured">⭐ Featured</span>' : ''}
          ${project.technologies.slice(0, 3).map(t => `<span class="tag">${t}</span>`).join('')}
          ${project.technologies.length > 3 ? `<span class="tag">+${project.technologies.length - 3}</span>` : ''}
        </div>
        <div class="item-card-actions">
          <button class="btn btn-secondary btn-small" onclick="editProject('${project.id}')">✏️ Edit</button>
          <button class="btn btn-danger btn-small" onclick="deleteProject('${project.id}')">🗑️ Delete</button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderSkills() {
  const container = document.getElementById('skills-list');
  
  if (state.skills.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>No skills yet</p>
        <button class="btn btn-primary" onclick="showSkillModal()">➕ Add Your First Skill</button>
      </div>
    `;
    return;
  }

  // Group by category
  const grouped = state.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  container.innerHTML = Object.entries(grouped).map(([category, skills]) => `
    <div class="skill-category">
      <h4 style="margin-bottom: 1rem; color: var(--text-secondary); text-transform: capitalize;">
        ${getCategoryLabel(category)}
      </h4>
      <div class="items-grid">
        ${skills.map(skill => `
          <div class="item-card skill-card">
            <div class="item-card-body">
              <h3 class="item-card-title">${skill.name}</h3>
              <div class="skill-level">
                ${[1,2,3,4,5].map(i => `
                  <div class="skill-dot ${i <= skill.level ? 'filled' : ''}"></div>
                `).join('')}
              </div>
            </div>
            <div class="item-card-actions" style="border: none; padding: 0;">
              <button class="btn btn-secondary btn-small" onclick="editSkill('${skill.name}')">✏️</button>
              <button class="btn btn-danger btn-small" onclick="deleteSkill('${skill.name}')">🗑️</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function renderExperience() {
  const container = document.getElementById('experience-list');
  
  if (state.experience.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>No experience entries yet</p>
        <button class="btn btn-primary" onclick="showExperienceModal()">➕ Add Experience</button>
      </div>
    `;
    return;
  }

  container.innerHTML = state.experience.map((exp, index) => `
    <div class="experience-card">
      <div class="experience-header">
        <div>
          <h3 class="experience-title">${exp.title}</h3>
          <p class="experience-company">${exp.company}</p>
        </div>
        <div class="experience-meta">
          <p>${exp.location || ''}</p>
          <p>${exp.period}</p>
        </div>
      </div>
      ${exp.description && exp.description.length > 0 ? `
        <ul class="experience-description">
          ${exp.description.map(d => `<li>${d}</li>`).join('')}
        </ul>
      ` : ''}
      ${exp.technologies && exp.technologies.length > 0 ? `
        <div class="item-card-tags">
          ${exp.technologies.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      ` : ''}
      <div class="item-card-actions" style="margin-top: 1rem;">
        <button class="btn btn-secondary btn-small" onclick="editExperience(${index})">✏️ Edit</button>
        <button class="btn btn-danger btn-small" onclick="deleteExperience(${index})">🗑️ Delete</button>
      </div>
    </div>
  `).join('');
}

// Helper Functions
function getCategoryIcon(category) {
  const icons = { game: '🎮', web: '🌐', ml: '🤖', other: '💡' };
  return icons[category] || '📁';
}

function getCategoryLabel(category) {
  const labels = { frontend: '🎨 Frontend', backend: '⚙️ Backend', ml: '🤖 ML/AI', tools: '🛠️ Tools', other: '📦 Other' };
  return labels[category] || category;
}

// Modal Functions
function showModal(id) {
  document.getElementById(id).classList.add('active');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

// Project Functions
function showProjectModal(project = null) {
  const form = document.getElementById('project-form');
  const title = document.getElementById('project-modal-title');
  const preview = document.getElementById('project-image-preview');
  
  form.reset();
  preview.style.display = 'none';
  
  if (project) {
    title.textContent = 'Edit Project';
    document.getElementById('project-id').value = project.id;
    document.getElementById('project-title').value = project.title;
    document.getElementById('project-category').value = project.category;
    document.getElementById('project-description').value = project.description;
    document.getElementById('project-longDescription').value = project.longDescription || '';
    document.getElementById('project-technologies').value = project.technologies.join(', ');
    document.getElementById('project-demoUrl').value = project.demoUrl || '';
    document.getElementById('project-githubUrl').value = project.githubUrl || '';
    document.getElementById('project-image').value = project.image || '';
    document.getElementById('project-featured').checked = project.featured;
    
    if (project.image) {
      preview.src = project.image;
      preview.style.display = 'block';
    }
  } else {
    title.textContent = 'Add Project';
    document.getElementById('project-id').value = '';
  }
  
  showModal('project-modal');
}

function editProject(id) {
  const project = state.projects.find(p => p.id === id);
  if (project) showProjectModal(project);
}

async function saveProject() {
  const id = document.getElementById('project-id').value;
  const project = {
    id: id || `project-${Date.now()}`,
    title: document.getElementById('project-title').value,
    category: document.getElementById('project-category').value,
    description: document.getElementById('project-description').value,
    longDescription: document.getElementById('project-longDescription').value,
    technologies: document.getElementById('project-technologies').value.split(',').map(t => t.trim()).filter(Boolean),
    demoUrl: document.getElementById('project-demoUrl').value || undefined,
    githubUrl: document.getElementById('project-githubUrl').value || undefined,
    image: document.getElementById('project-image').value || '/projects/placeholder.png',
    featured: document.getElementById('project-featured').checked,
  };

  try {
    if (id) {
      await api(`/api/projects/${id}`, { method: 'PUT', body: JSON.stringify(project) });
      const index = state.projects.findIndex(p => p.id === id);
      state.projects[index] = project;
    } else {
      await api('/api/projects', { method: 'POST', body: JSON.stringify(project) });
      state.projects.push(project);
    }
    
    closeModal('project-modal');
    renderProjects();
    showToast('Project saved!', 'success');
  } catch (error) {
    showToast('Failed to save project', 'error');
  }
}

async function deleteProject(id) {
  if (!confirm('Are you sure you want to delete this project?')) return;
  
  try {
    await api(`/api/projects/${id}`, { method: 'DELETE' });
    state.projects = state.projects.filter(p => p.id !== id);
    renderProjects();
    showToast('Project deleted', 'success');
  } catch (error) {
    showToast('Failed to delete project', 'error');
  }
}

// Skill Functions
function showSkillModal(skill = null) {
  const form = document.getElementById('skill-form');
  const title = document.getElementById('skill-modal-title');
  
  form.reset();
  document.getElementById('skill-level').value = 3;
  document.getElementById('skill-level-display').textContent = '3';
  
  if (skill) {
    title.textContent = 'Edit Skill';
    document.getElementById('skill-original-name').value = skill.name;
    document.getElementById('skill-name').value = skill.name;
    document.getElementById('skill-category').value = skill.category;
    document.getElementById('skill-level').value = skill.level;
    document.getElementById('skill-level-display').textContent = skill.level;
  } else {
    title.textContent = 'Add Skill';
    document.getElementById('skill-original-name').value = '';
  }
  
  showModal('skill-modal');
}

function editSkill(name) {
  const skill = state.skills.find(s => s.name === name);
  if (skill) showSkillModal(skill);
}

async function saveSkill() {
  const originalName = document.getElementById('skill-original-name').value;
  const skill = {
    name: document.getElementById('skill-name').value,
    category: document.getElementById('skill-category').value,
    level: parseInt(document.getElementById('skill-level').value, 10),
  };

  try {
    if (originalName) {
      await api(`/api/skills/${encodeURIComponent(originalName)}`, { method: 'PUT', body: JSON.stringify(skill) });
      const index = state.skills.findIndex(s => s.name === originalName);
      state.skills[index] = skill;
    } else {
      await api('/api/skills', { method: 'POST', body: JSON.stringify(skill) });
      state.skills.push(skill);
    }
    
    closeModal('skill-modal');
    renderSkills();
    showToast('Skill saved!', 'success');
  } catch (error) {
    showToast('Failed to save skill', 'error');
  }
}

async function deleteSkill(name) {
  if (!confirm('Are you sure you want to delete this skill?')) return;
  
  try {
    await api(`/api/skills/${encodeURIComponent(name)}`, { method: 'DELETE' });
    state.skills = state.skills.filter(s => s.name !== name);
    renderSkills();
    showToast('Skill deleted', 'success');
  } catch (error) {
    showToast('Failed to delete skill', 'error');
  }
}

// Experience Functions
function showExperienceModal(experience = null, index = null) {
  const form = document.getElementById('experience-form');
  const title = document.getElementById('experience-modal-title');
  
  form.reset();
  
  if (experience) {
    title.textContent = 'Edit Experience';
    document.getElementById('experience-index').value = index;
    document.getElementById('experience-title').value = experience.title;
    document.getElementById('experience-company').value = experience.company;
    document.getElementById('experience-location').value = experience.location || '';
    document.getElementById('experience-period').value = experience.period;
    document.getElementById('experience-description').value = (experience.description || []).join('\n');
    document.getElementById('experience-technologies').value = (experience.technologies || []).join(', ');
  } else {
    title.textContent = 'Add Experience';
    document.getElementById('experience-index').value = '';
  }
  
  showModal('experience-modal');
}

function editExperience(index) {
  showExperienceModal(state.experience[index], index);
}

async function saveExperience() {
  const index = document.getElementById('experience-index').value;
  const experience = {
    title: document.getElementById('experience-title').value,
    company: document.getElementById('experience-company').value,
    location: document.getElementById('experience-location').value,
    period: document.getElementById('experience-period').value,
    description: document.getElementById('experience-description').value.split('\n').map(d => d.trim()).filter(Boolean),
    technologies: document.getElementById('experience-technologies').value.split(',').map(t => t.trim()).filter(Boolean),
  };

  try {
    if (index !== '') {
      // Update existing - we don't have an ID, so we'll replace by index
      state.experience[parseInt(index, 10)] = experience;
    } else {
      state.experience.push(experience);
    }
    
    // Save all experience data
    await api('/api/personal-info', {
      method: 'PUT',
      body: JSON.stringify(state.personalInfo),
    });
    
    closeModal('experience-modal');
    renderExperience();
    showToast('Experience saved!', 'success');
  } catch (error) {
    showToast('Failed to save experience', 'error');
  }
}

async function deleteExperience(index) {
  if (!confirm('Are you sure you want to delete this experience?')) return;
  
  state.experience.splice(index, 1);
  renderExperience();
  showToast('Experience deleted', 'success');
}

// Image Upload
async function uploadImage(input) {
  const file = input.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    
    if (data.success) {
      document.getElementById('project-image').value = data.path;
      const preview = document.getElementById('project-image-preview');
      preview.src = data.path;
      preview.style.display = 'block';
      showToast('Image uploaded!', 'success');
    } else {
      showToast('Upload failed', 'error');
    }
  } catch (error) {
    showToast('Upload failed', 'error');
  }
}

// Toast Notifications
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Expose functions globally
window.showProjectModal = showProjectModal;
window.editProject = editProject;
window.deleteProject = deleteProject;
window.showSkillModal = showSkillModal;
window.editSkill = editSkill;
window.deleteSkill = deleteSkill;
window.showExperienceModal = showExperienceModal;
window.editExperience = editExperience;
window.deleteExperience = deleteExperience;
window.closeModal = closeModal;
window.syncData = syncData;
window.uploadImage = uploadImage;
