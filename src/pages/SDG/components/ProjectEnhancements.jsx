import React, { useState, useEffect } from 'react';
import {
  searchProjects,
  getProjectsWithMedia,
  getProjectsWithMetrics,
  getAllCategories,
  getAllSDGGoals,
  getAllRegions,
} from './projects';

/**
 * Enhanced Project Search Component
 * Demonstrates usage of the new search and filtering capabilities
 */
export const EnhancedProjectSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSDGs, setSelectedSDGs] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [hasMedia, setHasMedia] = useState(null);
  const [hasMetrics, setHasMetrics] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState([]);

  // Get filter options
  const categories = getAllCategories();
  const sdgGoals = getAllSDGGoals();
  const regions = getAllRegions();

  // Update filtered projects when filters change
  useEffect(() => {
    const filters = {
      categories: selectedCategories,
      sdgGoals: selectedSDGs,
      regions: selectedRegions,
      hasMedia,
      hasMetrics,
    };

    const results = searchProjects(searchQuery, filters);
    setFilteredProjects(results);
  }, [
    searchQuery,
    selectedCategories,
    selectedSDGs,
    selectedRegions,
    hasMedia,
    hasMetrics,
  ]);

  return (
    <div className='enhanced-project-search bg-white rounded-lg shadow-lg p-6'>
      <h3 className='text-2xl font-bold text-gray-800 mb-6'>
        Enhanced Project Search
      </h3>

      {/* Search Input */}
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search projects...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        />
      </div>

      {/* Filters */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
        {/* Categories Filter */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Categories
          </label>
          <select
            multiple
            value={selectedCategories}
            onChange={(e) =>
              setSelectedCategories(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm'
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* SDG Goals Filter */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            SDG Goals
          </label>
          <select
            multiple
            value={selectedSDGs}
            onChange={(e) =>
              setSelectedSDGs(
                Array.from(e.target.selectedOptions, (option) =>
                  parseInt(option.value)
                )
              )
            }
            className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm'
          >
            {sdgGoals.map((goal) => (
              <option key={goal} value={goal}>
                SDG {goal}
              </option>
            ))}
          </select>
        </div>

        {/* Regions Filter */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Regions
          </label>
          <select
            multiple
            value={selectedRegions}
            onChange={(e) =>
              setSelectedRegions(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm'
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Media and Metrics Filters */}
      <div className='flex gap-4 mb-6'>
        <label className='flex items-center'>
          <input
            type='checkbox'
            checked={hasMedia === true}
            onChange={(e) => setHasMedia(e.target.checked ? true : null)}
            className='mr-2'
          />
          Has Media Content
        </label>
        <label className='flex items-center'>
          <input
            type='checkbox'
            checked={hasMetrics === true}
            onChange={(e) => setHasMetrics(e.target.checked ? true : null)}
            className='mr-2'
          />
          Has Impact Metrics
        </label>
      </div>

      {/* Results */}
      <div className='border-t pt-4'>
        <h4 className='font-semibold text-gray-800 mb-3'>
          Search Results ({filteredProjects.length} projects found)
        </h4>
        <div className='space-y-3'>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className='border border-gray-200 rounded-lg p-4'
            >
              <h5 className='font-medium text-gray-900'>{project.title}</h5>
              <p className='text-sm text-gray-600 mt-1'>{project.subtitle}</p>
              <div className='flex gap-2 mt-2'>
                {project.searchMeta?.categories?.map((cat) => (
                  <span
                    key={cat}
                    className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded'
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Project Media Gallery Component
 * Displays rich media content for a project
 */
export const ProjectMediaGallery = ({ project }) => {
  const { media } = project;

  if (!media) return null;

  return (
    <div className='project-media-gallery bg-gray-50 rounded-lg p-6'>
      <h3 className='text-xl font-bold text-gray-800 mb-4'>Project Media</h3>

      {/* Videos */}
      {media.videos?.length > 0 && (
        <div className='mb-6'>
          <h4 className='font-semibold text-gray-700 mb-3'>Videos</h4>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {media.videos.map((video, index) => (
              <div key={index} className='bg-white rounded-lg p-4 shadow'>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className='w-full h-32 object-cover rounded mb-2'
                />
                <h5 className='font-medium text-gray-900'>{video.title}</h5>
                <p className='text-sm text-gray-600'>
                  Duration: {video.duration}
                </p>
                <span className='inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-2'>
                  {video.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audio */}
      {media.audio?.length > 0 && (
        <div className='mb-6'>
          <h4 className='font-semibold text-gray-700 mb-3'>Audio Content</h4>
          <div className='space-y-3'>
            {media.audio.map((audio, index) => (
              <div key={index} className='bg-white rounded-lg p-4 shadow'>
                <h5 className='font-medium text-gray-900'>{audio.title}</h5>
                <p className='text-sm text-gray-600'>
                  Duration: {audio.duration}
                </p>
                <span className='inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mt-2'>
                  {audio.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Content */}
      {media.interactive?.length > 0 && (
        <div className='mb-6'>
          <h4 className='font-semibold text-gray-700 mb-3'>
            Interactive Content
          </h4>
          <div className='space-y-3'>
            {media.interactive.map((item, index) => (
              <div key={index} className='bg-white rounded-lg p-4 shadow'>
                <h5 className='font-medium text-gray-900'>{item.title}</h5>
                <p className='text-sm text-gray-600'>{item.description}</p>
                <span className='inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded mt-2'>
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Documents */}
      {media.documents?.length > 0 && (
        <div>
          <h4 className='font-semibold text-gray-700 mb-3'>Documents</h4>
          <div className='space-y-3'>
            {media.documents.map((doc, index) => (
              <div key={index} className='bg-white rounded-lg p-4 shadow'>
                <h5 className='font-medium text-gray-900'>{doc.title}</h5>
                <p className='text-sm text-gray-600'>Size: {doc.size}</p>
                <span className='inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mt-2'>
                  {doc.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Project Impact Metrics Component
 * Displays quantitative and qualitative impact data
 */
export const ProjectImpactMetrics = ({ project }) => {
  const { metrics } = project;

  if (!metrics) return null;

  return (
    <div className='project-impact-metrics bg-white rounded-lg shadow-lg p-6'>
      <h3 className='text-xl font-bold text-gray-800 mb-4'>Impact Metrics</h3>

      {/* Quantitative Metrics */}
      {metrics.quantitative?.length > 0 && (
        <div className='mb-6'>
          <h4 className='font-semibold text-gray-700 mb-3'>
            Quantitative Impact
          </h4>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {metrics.quantitative.map((metric, index) => (
              <div key={index} className='bg-blue-50 rounded-lg p-4'>
                <div className='text-2xl font-bold text-blue-600'>
                  {metric.value.toLocaleString()} {metric.unit}
                </div>
                <div className='text-gray-800 font-medium'>{metric.label}</div>
                <div className='text-xs text-gray-600 mt-1'>
                  {metric.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SDG Alignment */}
      {metrics.sdgAlignment?.length > 0 && (
        <div className='mb-6'>
          <h4 className='font-semibold text-gray-700 mb-3'>SDG Alignment</h4>
          <div className='space-y-3'>
            {metrics.sdgAlignment.map((alignment, index) => (
              <div
                key={index}
                className='border border-gray-200 rounded-lg p-4'
              >
                <div className='flex items-center justify-between mb-2'>
                  <span className='font-medium'>SDG {alignment.goal}</span>
                  <span className='text-green-600 font-semibold'>
                    {alignment.percentage}%
                  </span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2 mb-2'>
                  <div
                    className='bg-green-500 h-2 rounded-full'
                    style={{ width: `${alignment.percentage}%` }}
                  ></div>
                </div>
                <p className='text-sm text-gray-600'>{alignment.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Qualitative Metrics */}
      {metrics.qualitative?.length > 0 && (
        <div>
          <h4 className='font-semibold text-gray-700 mb-3'>
            Qualitative Impact
          </h4>
          <div className='space-y-3'>
            {metrics.qualitative.map((metric, index) => (
              <div
                key={index}
                className='border border-gray-200 rounded-lg p-4'
              >
                <h5 className='font-medium text-gray-900 capitalize'>
                  {metric.category.replace('-', ' ')}
                </h5>
                <p className='text-gray-700 mt-1'>{metric.description}</p>
                <p className='text-xs text-gray-500 mt-2'>
                  Evidence: {metric.evidence}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Social Sharing Component
 * Implements social sharing functionality
 */
export const ProjectSocialSharing = ({ project }) => {
  const { sharing } = project;

  if (!sharing) return null;

  const shareOnTwitter = () => {
    const text = `${sharing.ogTitle} - ${sharing.ogDescription}`;
    const url = `${window.location.origin}${project.link}`;
    const hashtags = sharing.keywords?.join(',') || '';

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareOnFacebook = () => {
    const url = `${window.location.origin}${project.link}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = `${window.location.origin}${project.link}`;
    const title = sharing.ogTitle;
    const summary = sharing.ogDescription;

    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(summary)}`;
    window.open(linkedInUrl, '_blank');
  };

  return (
    <div className='project-social-sharing bg-gray-50 rounded-lg p-4'>
      <h4 className='font-semibold text-gray-700 mb-3'>Share This Project</h4>
      <div className='flex gap-3'>
        <button
          onClick={shareOnTwitter}
          className='bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors'
        >
          Share on Twitter
        </button>
        <button
          onClick={shareOnFacebook}
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors'
        >
          Share on Facebook
        </button>
        <button
          onClick={shareOnLinkedIn}
          className='bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors'
        >
          Share on LinkedIn
        </button>
      </div>
      {sharing.keywords && (
        <div className='mt-3'>
          <span className='text-xs text-gray-600'>Keywords: </span>
          <div className='flex flex-wrap gap-1 mt-1'>
            {sharing.keywords.map((keyword, index) => (
              <span
                key={index}
                className='bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded'
              >
                #{keyword}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Partnership Display Component
 * Shows project partnerships and collaborations
 */
export const ProjectPartnerships = ({ project }) => {
  const { partnerships } = project;

  if (!partnerships?.length) return null;

  const getPartnerTypeColor = (type) => {
    switch (type) {
      case 'government':
        return 'bg-green-100 text-green-800';
      case 'academic':
        return 'bg-blue-100 text-blue-800';
      case 'private-sector':
        return 'bg-purple-100 text-purple-800';
      case 'community':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className='project-partnerships bg-white rounded-lg shadow-lg p-6'>
      <h3 className='text-xl font-bold text-gray-800 mb-4'>
        Project Partnerships
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {partnerships.map((partner, index) => (
          <div key={index} className='border border-gray-200 rounded-lg p-4'>
            <div className='flex items-start justify-between mb-2'>
              <h4 className='font-medium text-gray-900'>{partner.name}</h4>
              <span
                className={`text-xs px-2 py-1 rounded ${getPartnerTypeColor(partner.type)}`}
              >
                {partner.type}
              </span>
            </div>
            <p className='text-sm text-gray-600 mb-2'>{partner.description}</p>
            <div className='text-xs text-gray-500'>
              <div>Role: {partner.role}</div>
              <div>Since: {partner.startDate}</div>
              <div>
                Status: <span className='capitalize'>{partner.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default {
  EnhancedProjectSearch,
  ProjectMediaGallery,
  ProjectImpactMetrics,
  ProjectSocialSharing,
  ProjectPartnerships,
};
