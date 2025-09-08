import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Edit2, Trash2, Save, X, Eye, Move, 
  Settings, Image, Type, Layout, Palette, Link as LinkIcon
} from 'lucide-react';
import { getAvailableSectionTypes, validateSectionConfig } from '../homepage/SectionRegistry.jsx';

/**
 * HomepageLayoutManager Component
 * Admin interface for managing homepage sections and layout
 */
const HomepageLayoutManager = () => {
  const [layout, setLayout] = useState({ id: 'homepage', sections: [] });
  const [editingSection, setEditingSection] = useState(null);
  const [newSection, setNewSection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [previewMode, setPreviewMode] = useState(false);

  // Available section types from registry
  const availableSectionTypes = getAvailableSectionTypes();

  useEffect(() => {
    loadHomepageLayout();
  }, []);

  const loadHomepageLayout = async () => {
    try {
      setLoading(true);
      // In a real app, this would fetch from API
      // For now, load from localStorage or use default
      const savedLayout = localStorage.getItem('homepageLayout');
      if (savedLayout) {
        setLayout(JSON.parse(savedLayout));
      } else {
        // Default layout
        setLayout({
          id: 'homepage',
          name: 'Main Homepage',
          sections: [
            {
              id: 'promo-tiles',
              type: 'promo-tiles',
              title: 'Featured Collections',
              enabled: true,
              order: 1
            },
            {
              id: 'discovery-modules',
              type: 'discovery-grid',
              title: 'Discover more',
              enabled: true,
              order: 2
            },
            {
              id: 'deal-strips',
              type: 'deal-strips',
              title: 'Special Deals',
              enabled: true,
              order: 3
            }
          ]
        });
      }
    } catch (error) {
      console.error('Error loading homepage layout:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveHomepageLayout = async () => {
    try {
      setLoading(true);
      // Validate all sections
      const validationErrors = {};
      layout.sections.forEach((section, index) => {
        const validation = validateSectionConfig(section);
        if (!validation.valid) {
          validationErrors[`section-${index}`] = validation.error;
        }
      });

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      // In a real app, this would save to API
      localStorage.setItem('homepageLayout', JSON.stringify(layout));
      
      // Show success message
      alert('Homepage layout saved successfully!');
      setErrors({});
    } catch (error) {
      console.error('Error saving homepage layout:', error);
      alert('Error saving homepage layout');
    } finally {
      setLoading(false);
    }
  };

  const addSection = () => {
    setNewSection({
      id: `section-${Date.now()}`,
      type: 'promo-tiles',
      title: 'New Section',
      enabled: true,
      order: layout.sections.length + 1
    });
  };

  const saveNewSection = () => {
    if (newSection) {
      const validation = validateSectionConfig(newSection);
      if (!validation.valid) {
        setErrors({ newSection: validation.error });
        return;
      }

      setLayout(prev => ({
        ...prev,
        sections: [...prev.sections, newSection]
      }));
      setNewSection(null);
      setErrors({});
    }
  };

  const updateSection = (index, updates) => {
    setLayout(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) => 
        i === index ? { ...section, ...updates } : section
      )
    }));
  };

  const deleteSection = (index) => {
    if (confirm('Are you sure you want to delete this section?')) {
      setLayout(prev => ({
        ...prev,
        sections: prev.sections.filter((_, i) => i !== index)
      }));
    }
  };

  const moveSection = (index, direction) => {
    const newSections = [...layout.sections];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < newSections.length) {
      [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
      
      // Update order values
      newSections.forEach((section, i) => {
        section.order = i + 1;
      });
      
      setLayout(prev => ({ ...prev, sections: newSections }));
    }
  };

  const SectionEditor = ({ section, index, isNew = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 p-6 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          {isNew ? 'New Section' : 'Edit Section'}
        </h3>
        <button
          onClick={() => isNew ? setNewSection(null) : setEditingSection(null)}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section ID
          </label>
          <input
            type="text"
            value={section.id}
            onChange={(e) => isNew 
              ? setNewSection({ ...section, id: e.target.value })
              : updateSection(index, { id: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="unique-section-id"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section Type
          </label>
          <select
            value={section.type}
            onChange={(e) => isNew 
              ? setNewSection({ ...section, type: e.target.value })
              : updateSection(index, { type: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {availableSectionTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={section.title}
            onChange={(e) => isNew 
              ? setNewSection({ ...section, title: e.target.value })
              : updateSection(index, { title: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Section Title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Order
          </label>
          <input
            type="number"
            value={section.order}
            onChange={(e) => isNew 
              ? setNewSection({ ...section, order: parseInt(e.target.value) })
              : updateSection(index, { order: parseInt(e.target.value) })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            min="1"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id={`enabled-${section.id}`}
          checked={section.enabled}
          onChange={(e) => isNew 
            ? setNewSection({ ...section, enabled: e.target.checked })
            : updateSection(index, { enabled: e.target.checked })
          }
          className="mr-2"
        />
        <label htmlFor={`enabled-${section.id}`} className="text-sm text-gray-700">
          Enable this section
        </label>
      </div>

      {errors[`section-${index}`] && (
        <div className="text-red-600 text-sm">
          {errors[`section-${index}`]}
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          onClick={() => isNew ? setNewSection(null) : setEditingSection(null)}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          onClick={() => isNew ? saveNewSection() : setEditingSection(null)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          {isNew ? 'Add Section' : 'Save Changes'}
        </button>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Homepage Layout Manager</h2>
          <p className="text-gray-600">Manage homepage sections and their configuration</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Eye className="h-4 w-4" />
            <span>{previewMode ? 'Edit Mode' : 'Preview Mode'}</span>
          </button>
          <button
            onClick={saveHomepageLayout}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            <span>Save Layout</span>
          </button>
        </div>
      </div>

      {/* New Section Editor */}
      {newSection && (
        <SectionEditor section={newSection} isNew={true} />
      )}

      {/* Sections List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Homepage Sections</h3>
          <button
            onClick={addSection}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus className="h-4 w-4" />
            <span>Add Section</span>
          </button>
        </div>

        {layout.sections.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Layout className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No sections configured</p>
            <button
              onClick={addSection}
              className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Add Your First Section
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {layout.sections
              .sort((a, b) => a.order - b.order)
              .map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-lg border border-gray-200 p-4"
                >
                  {editingSection === index ? (
                    <SectionEditor section={section} index={index} />
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col items-center space-y-1">
                          <button
                            onClick={() => moveSection(index, 'up')}
                            disabled={index === 0}
                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                          >
                            <Move className="h-4 w-4 rotate-180" />
                          </button>
                          <button
                            onClick={() => moveSection(index, 'down')}
                            disabled={index === layout.sections.length - 1}
                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                          >
                            <Move className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900">{section.title}</h4>
                          <div className="flex items-center space-x-3 text-sm text-gray-500">
                            <span>Type: {section.type}</span>
                            <span>Order: {section.order}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              section.enabled 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {section.enabled ? 'Enabled' : 'Disabled'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setEditingSection(index)}
                          className="p-2 text-gray-400 hover:text-blue-600"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteSection(index)}
                          className="p-2 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
          </div>
        )}
      </div>

      {/* Layout Stats */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Layout Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{layout.sections.length}</div>
            <div className="text-sm text-gray-600">Total Sections</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {layout.sections.filter(s => s.enabled).length}
            </div>
            <div className="text-sm text-gray-600">Enabled</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">
              {layout.sections.filter(s => !s.enabled).length}
            </div>
            <div className="text-sm text-gray-600">Disabled</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {new Set(layout.sections.map(s => s.type)).size}
            </div>
            <div className="text-sm text-gray-600">Section Types</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageLayoutManager;