import React from 'react';
import HeroCarousel from '../HeroCarousel.jsx';
import ProductSection from '../ProductSection.jsx';
import EnhancedCategoriesSection from '../EnhancedCategoriesSection.jsx';
import PromoTileRow from './PromoTileRow.jsx';
import DiscoveryModulesGrid from './DiscoveryModulesGrid.jsx';
import DealStrips from './DealStrips.jsx';
import HorizontalProductCarousel from './HorizontalProductCarousel.jsx';

/**
 * Section Registry Pattern for modular homepage rendering
 * Enables CMS/admin dashboard to dynamically manage homepage sections
 */
const SectionRegistry = {
  // Hero and banner sections
  'hero-carousel': HeroCarousel,
  'promo-tiles': PromoTileRow,
  
  // Product sections
  'product-grid': ProductSection,
  'product-carousel': HorizontalProductCarousel,
  'horizontal-carousel': HorizontalProductCarousel,
  
  // Discovery and content sections
  'discovery-grid': DiscoveryModulesGrid,
  'categories-grid': EnhancedCategoriesSection,
  'deal-strips': DealStrips,
  
  // Custom sections for specific content types
  'featured-products': ProductSection,
  'trending-products': HorizontalProductCarousel,
  'deals-section': DealStrips,
  'categories-showcase': EnhancedCategoriesSection,
};

/**
 * Section Renderer Component
 * Dynamically renders sections based on type and configuration
 */
export const SectionRenderer = ({ section, index, ...props }) => {
  const Component = SectionRegistry[section.type];
  
  if (!Component) {
    console.warn(`Unknown section type: ${section.type}`);
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 m-4">
        <p className="text-yellow-800">
          Unknown section type: <code>{section.type}</code>
        </p>
        <p className="text-sm text-yellow-600 mt-1">
          Available types: {Object.keys(SectionRegistry).join(', ')}
        </p>
      </div>
    );
  }

  // Section wrapper with common analytics and styling
  return (
    <section 
      id={section.id}
      className={`homepage-section ${section.className || ''}`}
      data-section-type={section.type}
      data-section-id={section.id}
      data-section-index={index}
    >
      <Component 
        section={section}
        index={index}
        {...props}
      />
    </section>
  );
};

/**
 * Homepage Layout Renderer
 * Renders complete homepage based on layout configuration
 */
export const HomepageLayoutRenderer = ({ 
  layout, 
  onAddToCart, 
  onAddToWishlist, 
  loading,
  ...props 
}) => {
  if (!layout || !layout.sections) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No homepage layout configured</p>
      </div>
    );
  }

  return (
    <div className="homepage-layout" data-layout-id={layout.id}>
      {layout.sections.map((section, index) => (
        <SectionRenderer
          key={section.id || index}
          section={section}
          index={index}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
          loading={loading}
          {...props}
        />
      ))}
    </div>
  );
};

/**
 * Register a new section type
 */
export const registerSectionType = (type, component) => {
  SectionRegistry[type] = component;
};

/**
 * Get available section types
 */
export const getAvailableSectionTypes = () => {
  return Object.keys(SectionRegistry);
};

/**
 * Validate section configuration
 */
export const validateSectionConfig = (section) => {
  if (!section.type) {
    return { valid: false, error: 'Section type is required' };
  }
  
  if (!SectionRegistry[section.type]) {
    return { 
      valid: false, 
      error: `Unknown section type: ${section.type}. Available: ${Object.keys(SectionRegistry).join(', ')}` 
    };
  }
  
  if (!section.id) {
    return { valid: false, error: 'Section ID is required' };
  }
  
  return { valid: true };
};

export default SectionRegistry;