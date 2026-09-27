'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, Plus, MoreVertical, Edit, Trash2, Eye, Calendar, Users, TrendingUp, AlertCircle } from 'lucide-react';
import ProjectForm, { ProjectFormData } from '@/components/project-form';

// Mock data for projects
const mockProjects = [
  {
    id: 1,
    name: 'Groomers Barber Spa',
    client: 'John Smith',
    status: 'In Progress',
    priority: 'High',
    deadline: '2025-10-15',
    progress: 75,
    category: 'Web Development',
    description: 'Modern barber shop website with booking system',
    image: '/project-images/Groomers.png'
  },
  {
    id: 2,
    name: 'Horizon Real Estate',
    client: 'Jane Doe',
    status: 'Planning',
    priority: 'Medium',
    deadline: '2025-11-20',
    progress: 25,
    category: 'Real Estate',
    description: 'Comprehensive real estate platform',
    image: '/project-images/Horizon Estate.png'
  },
  {
    id: 3,
    name: 'ShopEase Kenya',
    client: 'Tech Corp',
    status: 'Completed',
    priority: 'High',
    deadline: '2025-09-30',
    progress: 100,
    category: 'E-Commerce',
    description: 'E-commerce store with M-Pesa integration',
    image: '/project-images/ShopEaseKenya.png'
  },
  {
    id: 4,
    name: 'Zetech Event System',
    client: 'Zetech University',
    status: 'In Progress',
    priority: 'High',
    deadline: '2025-12-01',
    progress: 60,
    category: 'Web Development',
    description: 'Centralized event management system',
    image: '/project-images/Zetech-event system.png'
  },
  {
    id: 5,
    name: 'Bite Flow Kenya',
    client: 'Food Delivery Co',
    status: 'On Hold',
    priority: 'Low',
    deadline: '2026-01-15',
    progress: 40,
    category: 'Web Development',
    description: 'Food delivery platform',
    image: '/project-images/Bite Flow.png'
  },
  {
    id: 6,
    name: 'Haven Homes',
    client: 'Property LLC',
    status: 'In Progress',
    priority: 'Medium',
    deadline: '2025-10-30',
    progress: 55,
    category: 'Real Estate',
    description: 'Real estate property platform',
    image: '/project-images/Haven Homes.png'
  }
];

export default function AdminProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProject, setSelectedProject] = useState<typeof mockProjects[0] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);

  const handleProjectSubmit = (data: ProjectFormData) => {
    console.log('New project submitted:', data);
    // Here you would typically send the data to your backend
    // For now, we'll just close the form
    setShowProjectForm(false);
  };

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Planning': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'On Hold': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const stats = {
    total: mockProjects.length,
    inProgress: mockProjects.filter(p => p.status === 'In Progress').length,
    completed: mockProjects.filter(p => p.status === 'Completed').length
  };

  return (
    <>
      <div className="dashboard-main">
        {/* Page Header */}
        <div className="dashboard-heading">
          <div>
            <p>Projects Management</p>
            <h1>Projects Overview</h1>
            <span>Manage and track all your development projects in one place.</span>
          </div>
          <button className="btn-primary" onClick={() => setShowProjectForm(true)}>
            <Plus size={18} />
            New Project
          </button>
        </div>

        {/* Stats Cards */}
        <div className="dash-grid dash-stats">
          <div className="dash-stat-card">
            <div className="dash-icon blue">
              <Users size={24} />
            </div>
            <div className="stat-content">
              <p className="dash-muted">Total Projects</p>
              <strong className="stat-value">{stats.total}</strong>
              <div className="stat-trend">
                <span className="trend-icon text-green-500">↑</span>
                <span className="trend-value text-green-500">12%</span>
                <small className="trend-label">vs last month</small>
              </div>
            </div>
          </div>

          <div className="dash-stat-card">
            <div className="dash-icon green">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <p className="dash-muted">In Progress</p>
              <strong className="stat-value">{stats.inProgress}</strong>
              <div className="stat-trend">
                <span className="trend-icon text-green-500">↑</span>
                <span className="trend-value text-green-500">8%</span>
                <small className="trend-label">vs last month</small>
              </div>
            </div>
          </div>

          <div className="dash-stat-card">
            <div className="dash-icon orange">
              <AlertCircle size={24} />
            </div>
            <div className="stat-content">
              <p className="dash-muted">Pending Review</p>
              <strong className="stat-value">2</strong>
              <div className="stat-trend">
                <span className="trend-icon text-red-500">↓</span>
                <span className="trend-value text-red-500">3%</span>
                <small className="trend-label">vs last month</small>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="dash-card">
          <div className="projects-header">
            <div className="search-filters">
              <div className="search-bar">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="filter-group">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Status</option>
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Planning">Planning</option>
                  <option value="On Hold">On Hold</option>
                </select>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div className="view-actions">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <GridIcon />
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <ListIcon />
              </button>
            </div>
          </div>

          {/* Projects Grid */}
          {viewMode === 'grid' ? (
            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <div key={project.id} className="project-card-admin">
                  <div className="project-card-header">
                    <div className="project-image-wrapper">
                      <Image
                        src={project.image}
                        alt={project.name}
                        width={400}
                        height={200}
                        className="project-card-image"
                      />
                      <div className="project-overlay">
                        <button
                          className="view-project-btn"
                          onClick={() => {
                            setSelectedProject(project);
                            setShowModal(true);
                          }}
                        >
                          <Eye size={16} />
                          View Details
                        </button>
                      </div>
                    </div>
                    <div className="project-badges">
                      <span className={`status-badge ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                      <span className={`priority-badge ${getPriorityColor(project.priority)}`}>
                        {project.priority}
                      </span>
                    </div>
                  </div>

                  <div className="project-card-body">
                    <h3 className="project-card-title">{project.name}</h3>
                    <p className="project-card-client">{project.client}</p>
                    <p className="project-card-description">{project.description}</p>

                    <div className="project-card-meta">
                      <div className="meta-item">
                        <Calendar size={14} />
                        <span>{new Date(project.deadline).toISOString().split('T')[0]}</span>
                      </div>
                    </div>

                    <div className="project-card-footer">
                      <div className="project-actions">
                        <button className="action-btn">
                          <Edit size={16} />
                        </button>
                        <button className="action-btn danger">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="projects-list">
              <div className="list-header">
                <span>Project</span>
                <span>Client</span>
                <span>Status</span>
                <span>Priority</span>
                <span>Deadline</span>
                <span>Actions</span>
              </div>
              {filteredProjects.map((project) => (
                <div key={project.id} className="list-row">
                  <div className="list-cell project-cell">
                    <Image
                      src={project.image}
                      alt={project.name}
                      width={40}
                      height={40}
                      className="list-project-image"
                    />
                    <div>
                      <strong>{project.name}</strong>
                      <small>{project.category}</small>
                    </div>
                  </div>
                  <span className="list-cell">{project.client}</span>
                  <span className="list-cell">
                    <span className={`status-badge ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </span>
                  <span className="list-cell">
                    <span className={`priority-badge ${getPriorityColor(project.priority)}`}>
                      {project.priority}
                    </span>
                  </span>
                  <span className="list-cell">
                    {new Date(project.deadline).toISOString().split('T')[0]}
                  </span>
                  <span className="list-cell">
                    <div className="list-actions">
                      <button className="action-btn">
                        <Eye size={16} />
                      </button>
                      <button className="action-btn">
                        <Edit size={16} />
                      </button>
                      <button className="action-btn danger">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </span>
                </div>
              ))}
            </div>
          )}

          {filteredProjects.length === 0 && (
            <div className="empty-state">
              <AlertCircle size={48} className="empty-icon" />
              <h3>No projects found</h3>
              <p>Try adjusting your search or filter criteria</p>
              <button
                className="btn-primary"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setPriorityFilter('all');
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Project Detail Modal */}
      {showModal && selectedProject && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Project Details</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <MoreVertical size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-project-image">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  width={600}
                  height={300}
                />
              </div>
              <div className="modal-project-info">
                <h3>{selectedProject.name}</h3>
                <p>{selectedProject.description}</p>

                <div className="modal-grid">
                  <div className="modal-item">
                    <strong>Client</strong>
                    <span>{selectedProject.client}</span>
                  </div>
                  <div className="modal-item">
                    <strong>Category</strong>
                    <span>{selectedProject.category}</span>
                  </div>
                  <div className="modal-item">
                    <strong>Status</strong>
                    <span className={`status-badge ${getStatusColor(selectedProject.status)}`}>
                      {selectedProject.status}
                    </span>
                  </div>
                  <div className="modal-item">
                    <strong>Priority</strong>
                    <span className={`priority-badge ${getPriorityColor(selectedProject.priority)}`}>
                      {selectedProject.priority}
                    </span>
                  </div>
                  <div className="modal-item">
                    <strong>Deadline</strong>
                    <span>{new Date(selectedProject.deadline).toISOString().split('T')[0]}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-outline" onClick={() => setShowModal(false)}>
                Close
              </button>
              <button className="btn-primary">
                <Edit size={16} />
                Edit Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Form Component */}
      <ProjectForm
        isOpen={showProjectForm}
        onClose={() => setShowProjectForm(false)}
        onSubmit={handleProjectSubmit}
      />
    </>
  );
}

// Simple icon components for view toggles
function GridIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="5" height="5" />
      <rect x="12" y="3" width="5" height="5" />
      <rect x="3" y="12" width="5" height="5" />
      <rect x="12" y="12" width="5" height="5" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="4" x2="17" y2="4" />
      <line x1="3" y1="10" x2="17" y2="10" />
      <line x1="3" y1="16" x2="17" y2="16" />
    </svg>
  );
}
