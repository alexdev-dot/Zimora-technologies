'use client';

import { useState } from 'react';
import { Plus, MoreVertical } from 'lucide-react';

export interface ProjectFormData {
  name: string;
  client: string;
  category: string;
  status: string;
  priority: string;
  deadline: string;
  description: string;
}

interface ProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectFormData) => void;
}

export default function ProjectForm({ isOpen, onClose, onSubmit }: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    client: '',
    category: 'Web Development',
    status: 'Planning',
    priority: 'Medium',
    deadline: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form after submission
    setFormData({
      name: '',
      client: '',
      category: 'Web Development',
      status: 'Planning',
      priority: 'Medium',
      deadline: '',
      description: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Project</h2>
          <button className="close-btn" onClick={onClose}>
            <MoreVertical size={20} />
          </button>
        </div>
        <form className="project-form" onSubmit={handleSubmit}>
          <div className="form-body">
            <div className="form-section">
              <h3>Basic Information</h3>
              
              <div className="form-group">
                <label htmlFor="projectName">
                  Project Name *
                  <span className="required">Required</span>
                </label>
                <input
                  type="text"
                  id="projectName"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter project name"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="clientName">
                    Client Name *
                    <span className="required">Required</span>
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    value={formData.client}
                    onChange={(e) => setFormData({...formData, client: e.target.value})}
                    placeholder="Enter client name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">
                    Category *
                    <span className="required">Required</span>
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">
                  Project Description *
                  <span className="required">Required</span>
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe the project goals, scope, and requirements..."
                  rows={4}
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Project Details</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="status">
                    Status *
                    <span className="required">Required</span>
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    required
                  >
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="priority">
                    Priority *
                    <span className="required">Required</span>
                  </label>
                  <select
                    id="priority"
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    required
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="deadline">
                  Deadline *
                  <span className="required">Required</span>
                </label>
                <input
                  type="date"
                  id="deadline"
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-footer">
            <button type="button" className="btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Plus size={16} />
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}